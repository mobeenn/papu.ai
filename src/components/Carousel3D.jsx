import "keen-slider/keen-slider.min.css";
import React, { useEffect, useRef, useState } from "react";

const videoUrls = [
   "https://papu-ai-bucket.s3.us-west-2.amazonaws.com/landingPage/128fb930-bb61-4e10-b8a7-70e59b3d195e.mp4",
   "https://papu-ai-bucket.s3.us-west-2.amazonaws.com/landingPage/4bbec3b3-4d71-4505-b098-a9a345f7835c.mp4",
   "https://papu-ai-bucket.s3.us-west-2.amazonaws.com/landingPage/375a74af-b09a-46c5-9879-1e32172ec559.mp4",
   "https://papu-ai-bucket.s3.us-west-2.amazonaws.com/landingPage/d4e70d75-4cac-4062-a40f-84e3da73f189.mp4",
];

const videoPosters = [
   "/assests/video-poster1.png",
   "/assests/video-poster2.png",
   "/assests/video-poster3.png",
   "/assests/video-poster4.png",
];

const z = 150;
const cellCount = videoUrls.length;
const cellSize = { width: 260, height: 400 };
const borderRadius = 16;
const FADE_DURATION = 900; // ms (increased for longer fade)
const FADE_BEFORE_END = 0.5; // seconds before end to start fade (increased)

function FadeLoopVideo({ src, poster }) {
   const videoRef = useRef();
   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      const video = videoRef.current;
      if (!video) return;
      function onTimeUpdate() {
         if (
            video.duration &&
            video.currentTime > video.duration - 0.05 // very close to end
         ) {
            video.currentTime = 0.01; // jump to start
            video.play();
         }
      }
      video.addEventListener("timeupdate", onTimeUpdate);
      return () => {
         video.removeEventListener("timeupdate", onTimeUpdate);
      };
   }, []);

   useEffect(() => {
      const observer = new window.IntersectionObserver(
         ([entry]) => {
            setIsVisible(entry.isIntersecting);
         },
         { threshold: 0.25 }
      );
      if (videoRef.current) observer.observe(videoRef.current);
      return () => {
         if (videoRef.current) observer.unobserve(videoRef.current);
      };
   }, []);

   useEffect(() => {
      const video = videoRef.current;
      if (!video) return;
      if (isVisible) {
         video.play().catch(() => {});
      } else {
         video.pause();
      }
   }, [isVisible]);

   return (
      <video
         ref={videoRef}
         src={isVisible ? src : undefined}
         poster={poster}
         muted
         loop={false}
         playsInline
         style={{
            width: "100%",
            height: "100%",
            borderRadius: borderRadius,
            objectFit: "cover",
            background: "none",
            padding: 0,
            display: "block",
         }}
      />
   );
}

export const Carousel3D = () => {
   const carouselRef = useRef();
   const angleStep = 360 / cellCount;

   useEffect(() => {
      const cells = carouselRef.current.querySelectorAll(".carousel__cell");
      cells.forEach((cell, idx) => {
         cell.style.transform = `rotateY(${
            angleStep * idx
         }deg) translateZ(${z}px)`;
      });

      let angle = 0;
      let last = performance.now();
      let running = true;
      function animate(now) {
         if (!running) return;
         const dt = now - last;
         last = now;
         angle += 0.02 * dt; // adjust speed here
         carouselRef.current.style.transform = `translateZ(-${z}px) rotateY(${-angle}deg)`;
         requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
      return () => {
         running = false;
      };
   }, [angleStep]);

   return (
      <>
         <div className="wrapper ">
            <div className="scene" style={cellSize}>
               <div
                  className="carousel keen-slider"
                  ref={carouselRef}
                  style={{ width: cellSize.width, height: cellSize.height }}
               >
                  {videoUrls.map((url, idx) => (
                     <div
                        className={`h-[200px] carousel__cell number-slide${
                           idx + 1
                        }`}
                        key={idx}
                        style={{
                           ...cellSize,
                           borderRadius: borderRadius,
                           overflow: "hidden",
                           boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
                           background: "#000",
                        }}
                     >
                        <FadeLoopVideo src={url} poster={videoPosters[idx]} />
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </>
   );
};
