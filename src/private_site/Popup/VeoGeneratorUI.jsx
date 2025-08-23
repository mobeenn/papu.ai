import { useState, useRef } from "react";
import {
   generateVeoVideo,
   getVideoStatus,
   saveVideo,
   updateUser,
} from "../../api/apiService";

export default function VeoGeneratorUI() {
   const [prompt, setPrompt] = useState("");
   const [negativePrompt, setNegativePrompt] = useState("");
   const [status, setStatus] = useState("");
   const [promptError, setPromptError] = useState("");
   const pollingRef = useRef(null);

   const handleGenerate = async () => {
      if (!prompt.trim()) {
         setPromptError("Prompt is required");
         return;
      }
      setPromptError("");
      setStatus("Generating video...");

      try {
         const userEmail =
            localStorage.getItem("userEmail") || "user@example.com";

         const data = await generateVeoVideo(userEmail, prompt, negativePrompt);

         if (data.operation_name) {
            startPolling(data.operation_name, userEmail);
         } else {
            setStatus("No operation name returned!");
         }
      } catch (error) {
         setStatus("Something went wrong!");
      }
   };

   // ✅ Save video + Deduct credits
   const handleSaveVideo = async (videoUrl, email) => {
      if (!videoUrl) return;

      const finalEmail =
         email || localStorage.getItem("userEmail") || "user@example.com";

      console.log("✅ Ready to save video...");
      console.log("Payload: ", {
         video_url: videoUrl,
         email: finalEmail,
         feature: "veo3-videos",
         topic: prompt || "Untitled",
      });

      try {
         // Save video first
         const res = await saveVideo({
            video_url: videoUrl,
            email: finalEmail,
            feature: "veo3-videos",
            topic: prompt || "Untitled",
         });
         console.log("🎉 Video saved:", res);

         // ✅ Deduct 120 credits after saving
         await updateUser({
            email: finalEmail,
            credits: 120, // API should handle subtraction
         });
         console.log("💳 120 credits deducted");

         setStatus("completed");
      } catch (error) {
         console.error("❌ Error saving video or updating user:", error);
      }
   };

   const startPolling = (operationName, email) => {
      // clear any existing
      if (pollingRef.current) clearInterval(pollingRef.current);

      pollingRef.current = setInterval(async () => {
         try {
            const statusData = await getVideoStatus(operationName);
            console.log("Status Response:", statusData);

            if (statusData?.url) {
               clearInterval(pollingRef.current);
               pollingRef.current = null;

               // 🔹 Save and update credits
               await handleSaveVideo(statusData.url, email);
            }
         } catch (error) {
            console.error("Polling Error:", error);
         }
      }, 15000);
   };

   return (
      <div className="space-y-4 bg-[#1c1d21] text-white rounded-lg">
         <h2 className="text-lg font-semibold">Generate VEO Video</h2>

         <div>
            <textarea
               placeholder="Enter prompt..."
               className="w-full px-2 py-3 border border-gray-600 rounded bg-[#292a30] text-white"
               value={prompt}
               onChange={(e) => {
                  setPrompt(e.target.value);
                  if (e.target.value.trim()) {
                     setPromptError("");
                  }
               }}
            />
            {promptError && (
               <p className="text-red-500 text-sm mt-1">{promptError}</p>
            )}
         </div>

         <textarea
            placeholder="Negative prompt (optional)"
            className="w-full px-2 py-3 border border-gray-600 rounded bg-[#292a30] text-white"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
         />

         <button
            className="w-full bg-[#1CA990] text-white p-2 mt-3 rounded hover:bg-[#1ca98f85] cursor-pointer"
            onClick={handleGenerate}
         >
            Generate Video
         </button>

         {status && <p className="mt-2">{status}</p>}
      </div>
   );
}
