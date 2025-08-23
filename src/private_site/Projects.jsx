import React, { useEffect, useState } from "react";
import { BiSolidVideos } from "react-icons/bi";
import { MdCancel, MdOutlineSentimentVerySatisfied } from "react-icons/md";
import badge_Projects from "../assets/badge_Projects.svg";
import PopupModal from "./Popup/PopupModal.jsx";
import { FiTrash2, FiX } from "react-icons/fi";
import axios from "axios";
import { NoVideos } from "../components/NoVideos.jsx";
import { toast } from "react-toastify";
import VeoModal from "./Popup/VeoModal.jsx";
import { getUser } from "../api/apiService.js";
export default function Projects() {
   const [credits, setCredits] = useState(0);
   const [showPopup, setShowPopup] = useState(false);
   const [videos, setVideos] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [selectedVideo, setSelectedVideo] = useState(null);
   const [showVideoPopup, setShowVideoPopup] = useState(false);

   const [videoToDelete, setVideoToDelete] = useState(null);
   const [isDeleting, setIsDeleting] = useState(false);

   const [generationStatus, setGenerationStatus] = useState({
      isGenerating: false,
      state: null,
      progress: 0,
      operationId: null,
      videoUrl: null,
      scriptTopic: "", // Add this to track the topic
      selectedAvatar: "", // Add this to track the avatar
   });
   const [selectedTab, setSelectedTab] = useState("ai-avatar");
   const [selectedVideos, setSelectedVideos] = useState([]);
   useEffect(() => {
      setSelectedVideos([]);
   }, [selectedTab]);
   // get credits data
   useEffect(() => {
      const fetchCredits = async () => {
         try {
            const userEmail = localStorage.getItem("userEmail");
            const email = userEmail;
            const data = await getUser(email);
            console.log("🚀 ~ fetchCredits ~ data:", data);
            setCredits(data.credits);
         } catch (error) {
            setCredits("Error");
            console.error("Error fetching credits:", error);
         }
      };

      fetchCredits();
   }, []);
   // Veo Video
   const [showVeoModal, setShowVeoModal] = useState(false);
   useEffect(() => {
      fetchVideos();
      checkExistingGeneration();

      return () => {
         if (window.currentPollingInterval) {
            clearInterval(window.currentPollingInterval);
            window.currentPollingInterval = null;
         }
      };
   }, []);
   //get thumbnail frame for veo video
   useEffect(() => {
      const loadThumbnails = async () => {
         const updatedVideos = await Promise.all(
            videos.map(async (v) => {
               if (v.video_url.includes("veo3-videos")) {
                  const thumb = await getVideoThumbnail(
                     convertGsUrlToHttps(v.video_url)
                  );
                  return { ...v, thumbnail: thumb };
               }
               return v;
            })
         );
         setVideos(updatedVideos);
      };

      if (videos.length > 0) loadThumbnails();
   }, [videos]);
   // custo image get thumbnail first frame for veo video
   const getVideoThumbnail = (url) => {
      return new Promise((resolve) => {
         const video = document.createElement("video");
         video.src = url;
         video.crossOrigin = "anonymous";
         video.muted = true;
         video.currentTime = 1;

         video.onloadeddata = () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL("image/png"));
         };

         video.onerror = () => resolve(null);
      });
   };

   const checkExistingGeneration = () => {
      const operationId = localStorage.getItem("videoGenerationId");
      const isCompleted = localStorage.getItem("videoGenerationCompleted");

      if (operationId && isCompleted !== "true") {
         startPolling(operationId);
      }
   };
   // Update the polling function
   const startPolling = (operationId, topic, avatar) => {
      setGenerationStatus((prev) => ({
         ...prev,
         operationId,
         scriptTopic: topic,
         selectedAvatar: avatar,
      }));
      // Clear any existing interval first
      if (window.currentPollingInterval) {
         clearInterval(window.currentPollingInterval);
         window.currentPollingInterval = null;
      }

      setGenerationStatus({
         isGenerating: true,
         state: "QUEUED",
         progress: 0,
         operationId,
         videoUrl: null,
      });

      // First poll immediately
      pollGenerationStatus(operationId);

      // Then set up interval
      window.currentPollingInterval = setInterval(() => {
         pollGenerationStatus(operationId);
      }, 10000);
   };

   const pollGenerationStatus = async (operationId) => {
      try {
         const response = await axios.post(
            "your_api_urlpoll-creator",
            { operationId },
            { headers: { "Content-Type": "application/json" } }
         );

         console.log("Polling response:", response.data); // Debug log

         // Check for both possible complete states
         const isComplete =
            response.data.state === "COMPLETE" ||
            response.data.state === "COMPLETED";

         if (isComplete && response.data.url) {
            localStorage.setItem("videoGenerationCompleted", "true");
            localStorage.removeItem("videoGenerationId");
            // Clear the interval immediately
            if (window.currentPollingInterval) {
               clearInterval(window.currentPollingInterval);
               window.currentPollingInterval = null;
            }

            setGenerationStatus((prev) => ({
               ...prev,
               state: "COMPLETED",
               progress: 100,
               videoUrl: response.data.url,
            }));

            localStorage.removeItem("videoGenerationId");

            // Save the video
            await saveVideoToBackend({
               video_url: response.data.url,
               email: localStorage.getItem("userEmail"),
               feature: "ai-avatar", // Or get from your state
               avatar: "selected-avatar-name", // Get this from your avatar selection state
               topic: generationStatus.scriptTopic || "Generated Video", // Get from your script generation
            });

            fetchVideos(); // Refresh videos list

            // Hide after delay
            setTimeout(() => {
               setGenerationStatus((prev) => ({
                  ...prev,
                  isGenerating: false,
               }));
            }, 3000);
            return; // Exit early
         }

         // Update status for non-complete states
         setGenerationStatus((prev) => ({
            ...prev,
            state: response.data.state,
            progress: response.data.progress || prev.progress,
            videoUrl: response.data.url || prev.videoUrl,
         }));
      } catch (error) {
         console.error("Polling error:", error);
         if (window.currentPollingInterval) {
            clearInterval(window.currentPollingInterval);
            window.currentPollingInterval = null;
         }
         setGenerationStatus((prev) => ({
            ...prev,
            isGenerating: false,
            state: "FAILED",
         }));
         localStorage.removeItem("videoGenerationId");
      }
   };
   const saveVideoToBackend = async ({ video_url }) => {
      try {
         const userEmail = localStorage.getItem("userEmail");

         // Load video metadata to get duration
         const durationInSeconds = await getVideoDuration(video_url);

         const payload = {
            video_url,
            email: userEmail,
            feature: "ai-avatar",
            avatar: generationStatus.selectedAvatar,
            topic: generationStatus.scriptTopic,
         };

         // Save video metadata to backend
         const response = await axios.post("your_api_urlsave-video", payload, {
            headers: { "Content-Type": "application/json" },
         });

         console.log("Video saved successfully:", response.data);
         toast.success(response.data || "Video saved successfully");

         // Now update the user credits
         await axios.post(
            "your_api_urlupdate-user",
            {
               email: userEmail,
               credits: durationInSeconds,
            },
            {
               headers: { "Content-Type": "application/json" },
            }
         );

         console.log(
            `Deducted ${durationInSeconds} credits for video duration.`
         );
      } catch (error) {
         console.error("Error saving video or updating credits:", error);
         toast.error("Failed to save video or update credits");
      }
   };
   // claculate ai avatar video second
   const getVideoDuration = (url) => {
      return new Promise((resolve, reject) => {
         const video = document.createElement("video");
         video.src = url;
         video.preload = "metadata";

         video.onloadedmetadata = () => {
            resolve(Math.ceil(video.duration)); // round up to nearest second
         };

         video.onerror = () => {
            reject("Failed to load video for duration calculation.");
         };
      });
   };
   useEffect(() => {
      fetchVideos();
   }, []);

   const fetchVideos = async () => {
      try {
         setLoading(true);
         const userEmail = localStorage.getItem("userEmail");

         // ai-avatar
         const aiAvatarRes = await axios.post("your_api_urlget-videos", {
            email: userEmail,
            feature: "ai-avatar",
         });

         // veo3-videos
         const veoVideosRes = await axios.post("your_api_urlget-videos", {
            email: userEmail,
            feature: "veo3-videos",
         });

         // Extract videos from correct nested keys
         const aiAvatarVideos = Array.isArray(
            aiAvatarRes.data?.videos?.["ai-avatar"]
         )
            ? aiAvatarRes.data.videos["ai-avatar"]
            : [];

         const veoVideos = Array.isArray(
            veoVideosRes.data?.videos?.["veo3-videos"]
         )
            ? veoVideosRes.data.videos["veo3-videos"]
            : [];

         const allVideos = [...aiAvatarVideos, ...veoVideos];

         setVideos(allVideos);
      } catch (err) {
         console.error("Error loading videos:", err);
         setError(err.message);
         setVideos([]);
      } finally {
         setLoading(false);
      }
   };

   const handleVideoClick = (video) => {
      setSelectedVideo(video);
      setShowVideoPopup(true);
   };

   const closeVideoPopup = () => {
      setShowVideoPopup(false);
      setSelectedVideo(null);
   };

   const handleDeleteClick = (e, video) => {
      e.stopPropagation();
      setVideoToDelete(video);
   };

   const confirmDelete = async () => {
      if (!videoToDelete) return;

      setIsDeleting(true);
      try {
         // Handle both single video delete and multiple video delete
         const videoUrls = Array.isArray(videoToDelete)
            ? videoToDelete
            : [videoToDelete.video_url];

         const response = await axios.post(
            "your_api_urldelete-video",
            {
               email: localStorage.getItem("userEmail"),
               feature: selectedTab, // Use the currently selected tab
               video_urls: videoUrls,
            },
            { headers: { "Content-Type": "application/json" } }
         );

         await fetchVideos(); // Refresh the videos list
         toast.success(
            response.data?.message || "Video(s) deleted successfully"
         );

         // Clear selections
         setSelectedVideos([]);
      } catch (err) {
         console.error("Delete error:", err);
         toast.error(
            err.response?.data?.message || "Failed to delete video(s)"
         );
      } finally {
         setIsDeleting(false);
         setVideoToDelete(null);
      }
   };

   const cancelDelete = () => {
      setVideoToDelete(null);
   };
   const convertGsUrlToHttps = (url) => {
      if (url.startsWith("gs://")) {
         // Convert gs://papuai-bucket/... to https://storage.googleapis.com/papuai-bucket/...
         return url.replace(
            "gs://papuai-bucket/",
            "https://storage.googleapis.com/papuai-bucket/"
         );
      }
      return url;
   };
   if (loading) {
      return (
         <div className="flex items-center justify-center h-[636px]">
            <p>Loading videos...</p>
         </div>
      );
   }

   if (error) {
      return (
         <div className="flex items-center justify-center h-[636px]">
            <p>Error loading videos: {error}</p>
         </div>
      );
   }
   // filter avatra and veo video
   const filteredVideos = videos.filter((video) =>
      selectedTab === "ai-avatar"
         ? !video.video_url.includes("veo3-videos")
         : video.video_url.includes("veo3-videos")
   );
   return (
      <div className="text-white  ">
         {/* AI Avatar Card */}
         <div className="flex flex-wrap gap-7">
            <Card
               title="AI Avatars"
               description="Generate talking videos"
               icon={MdOutlineSentimentVerySatisfied}
               onClick={() => setShowPopup(true)}
            />

            {showPopup && (
               <PopupModal
                  onClose={() => setShowPopup(false)}
                  onGenerationStart={(opId, topic, avatar) =>
                     startPolling(opId, topic, avatar)
                  }
               />
            )}
            <Card
               title="VEO Videos"
               description="Generate videos from text"
               icon={BiSolidVideos}
               onClick={() => setShowVeoModal(true)}
            />
            {showVeoModal && (
               <VeoModal onClose={() => setShowVeoModal(false)} />
            )}
         </div>

         {/* badge */}
         <div className="my-8 flex justify-between">
            <img src={badge_Projects} alt="Badge" />
            <button className="bg-[#292a30] text-[#1da990] rounded-[6px] font-[500] text-[16px] px-6">
               Credits: {credits !== null ? credits : "..."}
            </button>
         </div>
         {selectedVideos.length > 0 && (
            <button
               onClick={() => setVideoToDelete(selectedVideos)}
               className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors mb-4"
            >
               Delete Selected ({selectedVideos.length})
            </button>
         )}

         {/* Tabs  for avatar and veo video*/}

         <div className="my-4 flex justify-center gap-3">
            <button
               onClick={() => setSelectedTab("ai-avatar")}
               className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedTab === "ai-avatar"
                     ? "bg-[#1da990] text-white"
                     : "bg-[#2b2c30] text-gray-300"
               }`}
            >
               AI Avatar Videos
            </button>
            <button
               onClick={() => setSelectedTab("veo3-videos")}
               className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedTab === "veo3-videos"
                     ? "bg-[#1da990] text-white"
                     : "bg-[#2b2c30] text-gray-300"
               }`}
            >
               VEO Videos
            </button>
         </div>

         <div className="space-y-4 relative">
            {/* Video Popup Modal */}
            {showVideoPopup && selectedVideo && (
               <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-[#2b2c30] rounded-lg max-w-[750px] h-[400px] w-full p-4">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white text-lg font-medium">
                           {selectedVideo.topic}
                        </h3>
                        <button
                           onClick={closeVideoPopup}
                           className="text-gray-400 hover:text-white"
                        >
                           <FiX size={24} />
                        </button>
                     </div>
                     <div className="aspect-w-16 aspect-h-9">
                        <video
                           controls
                           autoPlay
                           className="h-[320px] w-full rounded-md"
                           src={convertGsUrlToHttps(selectedVideo.video_url)}
                        >
                           Your browser does not support the video tag.
                        </video>
                     </div>
                  </div>
               </div>
            )}

            {/* Generation Status - Only shown when generating */}
            {generationStatus.isGenerating && selectedTab === "ai-avatar" && (
               <div className="flex items-center bg-[#2b2c30] p-4 rounded-lg max-w-[1156px] mx-auto gap-4 text-white">
                  <img
                     src="https://randomuser.me/api/portraits/women/44.jpg"
                     alt="Avatar"
                     className="w-12 h-12 rounded-md object-cover"
                  />

                  <div className="flex-1">
                     <p className="mb-1">
                        {generationStatus.state === "QUEUED" &&
                           "Video is in queue..."}
                        {generationStatus.state === "PROCESSING" &&
                           `Generating: ${generationStatus.progress}%`}
                        {generationStatus.state === "COMPLETED" &&
                           "Generation complete!"}
                        {generationStatus.state === "FAILED" &&
                           "Generation failed"}
                     </p>

                     <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                           className="bg-[#1ca990] h-2 rounded-full transition-all duration-300"
                           style={{
                              width: `${generationStatus.progress}%`,
                              opacity:
                                 generationStatus.state === "QUEUED" ? 0.5 : 1,
                           }}
                        ></div>
                     </div>
                  </div>
               </div>
            )}

            {filteredVideos.length === 0 ? (
               <NoVideos />
            ) : (
               <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-hide hover:scrollbar-default pr-2">
                  {filteredVideos.map((video, index) => (
                     <div
                        key={video.id || index}
                        className="flex items-center bg-[#2b2c30] p-4 rounded-lg w-full max-w-[1156px] mx-auto gap-4 text-white cursor-pointer hover:bg-[#3a3b40] transition-colors"
                        onClick={() => handleVideoClick(video)}
                     >
                        {/* ✅ Checkbox before avatar */}
                        <input
                           type="checkbox"
                           onClick={(e) => e.stopPropagation()}
                           checked={selectedVideos.includes(video.video_url)}
                           onChange={() => {
                              setSelectedVideos((prev) =>
                                 prev.includes(video.video_url)
                                    ? prev.filter(
                                         (url) => url !== video.video_url
                                      )
                                    : [...prev, video.video_url]
                              );
                           }}
                           className="w-4 h-4 accent-[#1da990] cursor-pointer"
                        />

                        {/* Avatar */}
                        {/* <img
                           src={
                              video.avatar ||
                              "https://randomuser.me/api/portraits/women/44.jpg"
                           }
                           alt="Avatar"
                           className="w-12 h-12 rounded-md object-cover"
                        /> */}
                        {video.video_url.includes("veo3-videos") ? (
                           <video
                              src={convertGsUrlToHttps(video.video_url)}
                              className="w-12 h-12 rounded-md object-cover"
                              muted
                              playsInline
                           />
                        ) : (
                           <img
                              src={
                                 video.avatar ||
                                 "https://randomuser.me/api/portraits/women/44.jpg"
                              }
                              alt="Avatar"
                              className="w-12 h-12 rounded-md object-cover"
                           />
                        )}

                        {/* Video details */}
                        <div className="flex justify-between items-center w-full">
                           <p className="text-[#E6E6E6] text-sm">
                              {video.topic}
                           </p>

                           <div className="flex flex-wrap items-center gap-3">
                              <button
                                 className={`${
                                    video.video_url.includes("veo3-videos")
                                       ? "bg-[#29b197]"
                                       : "bg-orange-500"
                                 } text-white px-3 py-1 text-sm rounded`}
                                 onClick={(e) => e.stopPropagation()}
                              >
                                 {video.video_url.includes("veo3-videos")
                                    ? "VEO Video"
                                    : "AI Avatar"}
                              </button>
                              {/* <button
                                 className="text-[#29b197] text-sm"
                                 onClick={(e) => e.stopPropagation()}
                              >
                                 Share
                              </button>
                              <button
                                 className="text-gray-400 hover:text-red-400"
                                 onClick={(e) => handleDeleteClick(e, video)}
                              >
                                 <FiTrash2 size={16} />
                              </button> */}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
         {/* Delete Confirmation Popup */}
         {videoToDelete && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
               <div className="bg-[#2b2c30] rounded-lg max-w-md w-full p-6">
                  <h3 className="text-white text-lg font-medium mb-4">
                     Are you sure you want to delete this video?
                  </h3>
                  <p className="text-gray-400 mb-6">
                     We won't be able to recover this video, and your credits
                     will still be deducted.
                  </p>
                  <div className="flex justify-end space-x-4">
                     <button
                        onClick={cancelDelete}
                        className="px-3 py-2 text-white bg-gray-600 rounded-[6px] cursor-pointer"
                        disabled={isDeleting}
                     >
                        No
                     </button>
                     <button
                        onClick={confirmDelete}
                        className="px-4 py-2 text-white bg-[#faad14] rounded-[6px] cursor-pointer"
                        disabled={isDeleting}
                     >
                        {isDeleting ? "Deleting..." : "Yes"}
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

const Card = ({ title, description, icon: Icon, onClick }) => {
   return (
      <>
         <div
            onClick={onClick}
            className=" bg-[#1c1d21] w-full max-w-[335px] rounded-[16px] px-2 sm:px-4 group hover:bg-[#292a30] transition-all duration-300 cursor-pointer"
         >
            <div className="flex items-center gap-[18px]">
               <button className="w-full max-w-12 h-12 mt-[20px] rounded-full bg-[#1ca990] text-white transition-colors duration-300 group-hover:bg-[#ff7a01]">
                  <Icon className="mx-auto" size={28} />
               </button>
               <h1 className="mt-1 font-medium text-[16px] leading-[24px] align-middle font-[Poppins] text-[#FFFFFF]">
                  {title}
               </h1>
            </div>
            <p className="text-[#8D8E90] font-[400] text-[14px] leading-[24px] align-middle font-[Poppins] sm:px-15 text-center  sm:-mt-4 pb-3">
               {description}
            </p>
         </div>
      </>
   );
};
