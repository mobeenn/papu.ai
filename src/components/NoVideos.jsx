import React from "react";
import videoIcon from "../assets/videoIcon.svg";
export const NoVideos = () => {
   return (
      <>
         <div className="bg-[#292A30] rounded-[32px] h-[450px] flex items-center justify-center">
            <div className="text-[#595C6A] text-center">
               <img src={videoIcon} alt="videoIcon" className="mx-auto mb-4" />
               <h1 className="font-[500] text-[18px] leading-[24px] mb-1">
                  No projects yet!
               </h1>
               <p className="font-[400] text-[16px] leading-[24px]">
                  Get started by selecting a feature from the top menu
               </p>
            </div>
         </div>
      </>
   );
};
