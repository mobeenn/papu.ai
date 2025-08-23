// components/PopupModal.jsx
import { useEffect, useState } from "react";
import { MdRefresh, MdArrowForward, MdArrowBack } from "react-icons/md";
import progressbBar from "../../assets/progressbBar.svg";
import completeProgressBar from "../../assets/completeProgressBar.svg";

import { CgClose } from "react-icons/cg";
import axios from "axios";
import { toast } from "react-toastify";

export default function PopupModal({ onClose, onGenerationStart }) {
   const [scriptDescription, setScriptDescription] = useState("");
   const [scriptTopic, setScriptTopic] = useState("");
   const [aiGeneratedScript, setAiGeneratedScript] = useState(null);
   const [isGenerating, setIsGenerating] = useState(false);
   const [isRegenerating, setIsRegenerating] = useState(false);
   // Add this function to handle the API call

   const [videos, setVideos] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [selectedIndex, setSelectedIndex] = useState(null);
   const [step, setStep] = useState(1);
   const [currentPage, setCurrentPage] = useState(1);
   const videosPerPage = 12; // Number of thumbnail show in pop up

   const [supportedCreators, setSupportedCreators] = useState([]);

   const [pollingInterval, setPollingInterval] = useState(null);
   const [selectedAvatar, setSelectedAvatar] = useState(null);

   // handleGenerateVideo function
   const handleGenerateVideo = async () => {
      if (!aiGeneratedScript) {
         toast.error("Please generate a script first!");
         return;
      }
      if (supportedCreators.length === 0) {
         toast.error("No supported creators available. Try again later.");
         return;
      }
      if (!selectedAvatar) {
         toast.error("Please select an avatar first!");
         return;
      }

      try {
         setIsLoading(true);
         const response = await axios.post(
            "your_api_urlai-creator",
            {
               creatorName: selectedAvatar, // Use the selected avatar
               script: aiGeneratedScript,
            },
            { headers: { "Content-Type": "application/json" } }
         );
         console.log(
            "🚀 ~ handleGenerateVideo ~ response:",
            response?.data.detail
         );
         toast.error(response?.data.detail);

         if (response.data?.operationId) {
            localStorage.setItem(
               "videoGenerationId",
               response.data.operationId
            );
            toast.success("Video generated started!");

            onClose();
            // Notify parent component to start polling with avatar info
            if (onGenerationStart) {
               onGenerationStart(
                  response.data.operationId,
                  scriptTopic,
                  selectedAvatar
               );
            }
         }
      } catch (error) {
         console.error("API Error:", error);
         toast.error(response?.data.detail || "Failed to generate video!");
      } finally {
         setIsLoading(false);
      }
   };
   // Clean up interval on unmount
   useEffect(() => {
      return () => {
         if (pollingInterval) {
            clearInterval(pollingInterval);
         }
      };
   }, [pollingInterval]);

   const fetchVideos = async (method = "POST") => {
      setIsLoading(true);
      setError(null);
      try {
         const response = await fetch("your_api_urllist-creators", {
            method,
            headers: {
               "Content-Type": "application/json",
            },
         });

         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }

         const data = await response.json();
         const videoUrls = Object.values(data.thumbnails).map(
            (thumbnail) => thumbnail.imageUrl
         );
         setVideos(videoUrls);

         // Extract supported creator names (modify based on API response structure)
         const creators = Object.keys(data.thumbnails || {});
         setSupportedCreators(creators); // Store supported creators
         setCurrentPage(1);
      } catch (error) {
         console.error("Error fetching videos:", error);
         setError(error.message);
         if (method === "GET" && error.message.includes("405")) {
            fetchVideos("POST"); // Retry with POST if GET fails
         }
      } finally {
         setIsLoading(false);
      }
   };

   const handleGenerateScript = async () => {
      if (!scriptDescription.trim()) {
         toast.error("Please describe your script idea");
         return;
      }

      setIsGenerating(true);
      const userEmail = localStorage.getItem("userEmail");

      try {
         const payload = {
            topic: scriptDescription,
            email: userEmail,
         };

         console.log("Sending payload to API:", payload);

         const response = await axios.post("your_api_urlscript", payload, {
            headers: {
               "Content-Type": "application/json",
            },
         });

         console.log("API Response:", response.data);

         // Check if response contains an error (like insufficient credits)
         if (response.data.error) {
            toast.error(response.data.error); // Show the error message
            return; // Don't proceed further
         }

         // Only set these states if response is successful
         setAiGeneratedScript(response.data);
         setScriptTopic(scriptDescription);
         setStep(2);
      } catch (error) {
         console.error("API Error:", error.response?.data || error.message);

         // Handle different error cases
         if (error.response?.data?.error) {
            toast.error(error.response.data.error); // Show API error message
         } else {
            toast.error("Failed to generate script. Please try again.");
         }
      } finally {
         setIsGenerating(false);
      }
   };
   const handleRegenerateScript = async () => {
      if (!scriptTopic.trim()) {
         toast.error("Please enter a script topic");
         return;
      }

      setIsRegenerating(true);
      setAiGeneratedScript("");

      try {
         const userEmail = localStorage.getItem("userEmail"); // Fixed typo
         if (!userEmail) {
            toast.error("User email not found. Please login again.");
            return;
         }

         const payload = {
            topic: scriptTopic,
            email: userEmail,
         };

         console.log("Regenerating with payload:", payload);

         const response = await axios.post("your_api_urlscript", payload, {
            headers: {
               "Content-Type": "application/json",
            },
         });

         console.log("Regeneration response:", response.data);

         // First check for errors in response
         if (response.data.error) {
            toast.error(response.data.error); // Show "insufficient credits" or other errors
            return;
         }

         // Handle different possible response structures
         const scriptContent =
            response.data.script || response.data.content || response.data;

         if (typeof scriptContent !== "string") {
            throw new Error("Invalid script format received from API");
         }

         setAiGeneratedScript(scriptContent);
      } catch (error) {
         console.error("Regeneration error:", error);

         // Handle specific error cases
         if (error.response?.data?.error) {
            toast.error(error.response.data.error);
         } else if (error.message) {
            toast.error(error.message);
         } else {
            toast.error("Failed to regenerate script. Please try again.");
         }
      } finally {
         setIsRegenerating(false);
      }
   };
   // Function to fetch videos from the API

   const handleNextClick = () => {
      if (aiGeneratedScript) {
         fetchVideos();
         setStep(3);
      }
   };
   // Pagination logic
   const indexOfLastVideo = currentPage * videosPerPage;
   const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
   const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);
   const totalPages = Math.ceil(videos.length / videosPerPage);

   const handleNextPage = () => {
      if (currentPage < totalPages) {
         setCurrentPage(currentPage + 1);
      }
   };

   const handlePrevPage = () => {
      if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
      }
   };
   return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
         <div className="bg-[#1c1d21] text-white  w-full  max-w-[800px] max-h-[90vh] overflow-y-auto rounded-[16px] p-6 ">
            {step === 1 && (
               <div className="space-y-4">
                  <div className="flex justify-end">
                     <button
                        onClick={onClose}
                        className="text-gray-400 cursor-pointer hover:text-red-500 transition"
                     >
                        <CgClose size={24} />
                     </button>
                  </div>

                  <h2 className="text-center font-[600] text-[24px] leading-[24px] mb-2">
                     AI Script
                  </h2>
                  <img
                     src={progressbBar}
                     alt="progress bar"
                     className="mx-auto"
                  />

                  <div className="flex border-neutral-500 bg-[#292a30] border overflow-hidden rounded-[8px] mt-15 mb-6">
                     <input
                        type="text"
                        placeholder="Describe your idea for the script..."
                        className="flex-1 px-4 py-2 border-neutral-500 outline-none"
                        value={scriptDescription}
                        onChange={(e) => setScriptDescription(e.target.value)}
                        onKeyPress={(e) =>
                           e.key === "Enter" && handleGenerateScript()
                        }
                     />
                     <button
                        onClick={handleGenerateScript}
                        disabled={isGenerating}
                        className={`bg-[#3f414b] mx-2 sm:mx-5 my-2 px-3 py-2 rounded-[8px] cursor-pointer hover:bg-[#1ca990] ${
                           isGenerating ? "opacity-50" : ""
                        }`}
                     >
                        {isGenerating ? (
                           <div className="flex items-center justify-center w-5 h-5 ">
                              <svg
                                 className="animate-spin text-white"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                              >
                                 <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                 ></circle>
                                 <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"
                                 ></path>
                              </svg>
                           </div>
                        ) : (
                           <MdArrowForward size={20} />
                        )}
                     </button>
                  </div>
               </div>
            )}

            {step === 2 && (
               <div className="space-y-4">
                  <div className="flex justify-end">
                     <button
                        onClick={onClose}
                        className="text-gray-400 cursor-pointer hover:text-red-500 transition"
                     >
                        <CgClose size={24} />
                     </button>
                  </div>

                  <h2 className="text-center font-[600] text-[24px] leading-[24px] mb-2">
                     AI Script
                  </h2>
                  <img
                     src={progressbBar}
                     alt="progress bar"
                     className="mx-auto"
                  />

                  <div className="flex border-neutral-500 bg-[#292a30] border overflow-hidden rounded-[8px] mt-15 mb-6">
                     <input
                        type="text"
                        value={scriptTopic}
                        onChange={(e) => setScriptTopic(e.target.value)}
                        placeholder="Positives of AI in Healthcare"
                        className="flex-1 px-4 py-2 border-neutral-500 outline-none"
                        onKeyPress={(e) =>
                           e.key === "Enter" && handleRegenerateScript()
                        }
                     />
                     <button
                        onClick={handleRegenerateScript}
                        disabled={isRegenerating}
                        className={`bg-[#3f414b] mx-2 sm:mx-5 my-2 px-3 py-2 rounded-[8px] cursor-pointer hover:bg-[#1ca990] ${
                           isRegenerating ? "opacity-50" : ""
                        }`}
                     >
                        {isRegenerating ? (
                           <div className="flex items-center justify-center w-5 h-5 ">
                              <svg
                                 className="animate-spin text-white"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none"
                                 viewBox="0 0 24 24"
                              >
                                 <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                 ></circle>
                                 <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"
                                 ></path>
                              </svg>
                           </div>
                        ) : (
                           <MdRefresh size={20} />
                        )}
                     </button>
                  </div>

                  {/* Display AI-generated content */}
                  <div className="bg-[#292a30] px-7 py-5 rounded-[8px] min-h-[200px]">
                     {isRegenerating ? (
                        <p className="text-[14px] text-[#CED0D7] font-[400] leading-[24px]">
                           Regenerating your script...
                        </p>
                     ) : aiGeneratedScript ? (
                        <p className="text-[14px] text-[#CED0D7] font-[400] leading-[24px] whitespace-pre-line">
                           {aiGeneratedScript}
                        </p>
                     ) : (
                        <p className="text-[14px] text-[#CED0D7] font-[400] leading-[24px]">
                           No script generated yet
                        </p>
                     )}
                  </div>
                  <div className="flex justify-center gap-[138px]">
                     <button
                        onClick={() => setStep(1)}
                        className="px-4 py-2 bg-[#1c1d21] w-full max-w-[310px] rounded-[8px] cursor-pointer border-[2px] border-[#2f3031] hover:bg-[#292a30]"
                     >
                        <MdArrowBack className="inline" />
                     </button>
                     <button
                        onClick={handleNextClick}
                        className={`px-4 py-2 bg-[#1ca990] w-full max-w-[310px] rounded-[8px] cursor-pointer hover:bg-[#168d79] ${
                           !aiGeneratedScript || isLoading
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                        }`}
                        disabled={!aiGeneratedScript || isLoading}
                     >
                        {isLoading ? "Loading..." : "Next"}{" "}
                        <MdArrowForward className="inline" />
                     </button>
                  </div>
               </div>
            )}

            {step === 3 && (
               <div className="space-y-4 text-center">
                  {/* Close Button */}
                  <div className="flex justify-end">
                     <button
                        onClick={onClose}
                        className="text-gray-400 cursor-pointer hover:text-red-500 transition"
                     >
                        <CgClose size={24} />
                     </button>
                  </div>

                  <h2 className="font-[600] text-[24px] leading-[24px] mb-2">
                     AI Avatar
                  </h2>
                  <p className="text-[14px] font-[400] leading-[24px]">
                     Choose an avatar of your choice for your video
                  </p>

                  <img
                     src={completeProgressBar}
                     alt="progress bar"
                     className="mx-auto"
                  />
                  {/* video Grid 1 */}
                  {error && (
                     <div className="text-red-500 mt-4">Error: {error}</div>
                  )}

                  {isLoading && (
                     <div className="text-center mt-4">Loading...</div>
                  )}

                  {videos.length > 0 && (
                     <div>
                        <div className="flex justify-center gap-[64px] mt-14 flex-wrap">
                           {currentVideos.map((src, index) => (
                              <img
                                 key={indexOfFirstVideo + index}
                                 src={src}
                                 onClick={() => {
                                    setSelectedIndex(indexOfFirstVideo + index);
                                    setSelectedAvatar(supportedCreators[index]); // Store the selected avatar name
                                 }}
                                 className={`rounded-[12px] cursor-pointer transition-all duration-200 ${
                                    selectedIndex === indexOfFirstVideo + index
                                       ? "border-[6px] border-[#1C6CA9]"
                                       : "border-[6px] border-transparent"
                                 }`}
                                 width="180"
                                 height="250"
                                 autoPlay
                                 loop
                                 muted
                              />
                           ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center gap-4 mt-8">
                           <button
                              onClick={handlePrevPage}
                              disabled={currentPage === 1}
                              className={`px-4 py-2 rounded bg-gray-200 text-gray-800 ${
                                 currentPage === 1
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-gray-300"
                              }`}
                           >
                              Previous
                           </button>
                           <span className="self-center">
                              Page {currentPage} of {totalPages}
                           </span>
                           <button
                              onClick={handleNextPage}
                              disabled={currentPage === totalPages}
                              className={`px-4 py-2 rounded bg-gray-200 text-gray-800 ${
                                 currentPage === totalPages
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-gray-300"
                              }`}
                           >
                              Next
                           </button>
                        </div>
                     </div>
                  )}
                  {/* Buttons */}
                  <div className="flex justify-center gap-[138px] mt-10">
                     <button
                        onClick={() => setStep(2)}
                        className="px-4 py-2 bg-[#1c1d21] w-full max-w-[310px] rounded-[8px] cursor-pointer border-[2px] border-[#2f3031] hover:bg-[#292a30]"
                     >
                        <MdArrowBack className="inline" />
                     </button>
                     <button
                        onClick={handleGenerateVideo}
                        disabled={
                           isLoading ||
                           supportedCreators.length === 0 ||
                           !selectedAvatar
                        }
                        className={`px-4 py-2 bg-[#1ca990] w-full max-w-[310px] rounded-[8px] cursor-pointer hover:bg-[#168d79] ${
                           isLoading || !selectedAvatar
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                        }`}
                     >
                        {isLoading ? "Generating..." : "Generate Video"}
                        <MdArrowForward className="inline" />
                     </button>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
