import React from "react";
import { cn } from "../lib/utils";
import { Marquee } from "./magicui/marquee";
import customer1 from "../assets/customer1.svg";
import customer2 from "../assets/customer2.svg";
import customer3 from "../assets/customer3.svg";
import customer4 from "../assets/customer4.svg";
import customer5 from "../assets/customer5.svg";
import customer6 from "../assets/customer6.svg";
import customer7 from "../assets/customer7.svg";
import customer8 from "../assets/customer8.svg";
import customer9 from "../assets/customer9.svg";
import customer10 from "../assets/customer10.svg";
import customer11 from "../assets/customer11.svg";
import customer12 from "../assets/customer12.svg";

const reviews = [
   {
      name: "Emily",
      username: "Marketing Lead",
      body: "We cut video turnaround from days to minutes. Papu AI is now a key part of every launch.",
      img: customer1,
   },
   {
      name: "David",
      username: "Ad Agency Director",
      body: "We swapped client mockups for Papu AI demos — results look stunning and professional.",
      img: customer2,
   },
   {
      name: "Sophia",
      username: "Online Educator",
      body: "I use it for explainer videos — no filming, no fuss. Just text and it speaks for me!",
      img: customer3,
   },
   {
      name: "Jane",
      username: "@jane",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: customer4,
   },
   {
      name: "Carlos",
      username: "Corporate Trainer",
      body: "My internal SOPs became short avatar videos. Everyone’s actually watching them now.",
      img: customer5,
   },
   {
      name: "Ayesha",
      username: "Youtube Creator",
      body: "Loved how natural the voiceovers feel — like I actually recorded them in a studio.",
      img: customer6,
   },
   {
      name: "Omer",
      username: "Social Media Strategist",
      body: "I push out reels daily. This tool makes it effortless — no camera, no setup needed.",
      img: customer7,
   },
   {
      name: "Mina",
      username: "Startup Founder",
      body: "AI avatars helped me pitch investors in multiple languages without hiring talent.",
      img: customer8,
   },
   {
      name: "Alex",
      username: "Small Business Owner",
      body: "Papu AI gives me a voice — literally. My brand now speaks without me being on camera.",
      img: customer9,
   },
   {
      name: "Jenna",
      username: "HR Manager",
      body: "We create onboarding videos in-house now. Fast, clear, and always consistent.",
      img: customer10,
   },
   {
      name: "Leo",
      username: "Product Marketer",
      body: "We launched in 3 languages using avatars. Conversion uplifted instantly!",
      img: customer11,
   },
   {
      name: "Lucia",
      username: "Language Coach",
      body: "Papu AI adapts to every script I write, even in Spanish. My students love it.",
      img: customer12,
   },
];

// const firstRow = reviews.slice(0, reviews.length / 4);
// const secondRow = reviews.slice(reviews.length / 4);
const half = Math.ceil(reviews.length / 5);
const firstRow = reviews.slice(0, half);
const secondRow = reviews.slice(half, reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
   return (
      <figure
         className="flex flex-col justify-center bg-[#D9D9D9] rounded-[32px] -mx-9 p-4 sm:p-8 mb-9"
         style={{
            width: "400px",
            height: "200px",
            boxSizing: "border-box",
            color: "#000",
         }}
      >
         {/* Top Section */}
         <div>
            <div className="flex flex-row items-center gap-4 mb-2">
               <img
                  src={img}
                  alt={name}
                  width={40}
                  height={40}
                  className="rounded-full"
               />
               <div className="flex flex-col justify-center">
                  <span className="font-bold text-[16px] mb-[2px]">{name}</span>
                  <span className="font-normal text-[16px] text-[#444] opacity-70">
                     {username}
                  </span>
               </div>
            </div>

            {/* Review Text */}
            <blockquote className="font-[Poppins] font-normal text-[16px] leading-[140%] text-black opacity-90 mt-4 break-words overflow-hidden">
               {body}
            </blockquote>
         </div>
      </figure>
   );
};

export function MarqueeDemo() {
   return (
      <div
         style={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
         }}
      >
         <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review) => (
               <ReviewCard key={review.username} {...review} />
            ))}
         </Marquee>
         <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review) => (
               <ReviewCard key={review.username} {...review} />
            ))}
         </Marquee>
         {/* Left fade overlay */}
         <div
            style={{
               pointerEvents: "none",
               position: "absolute",
               left: 0,
               top: 0,
               bottom: 0,
               width: "120px",
               background:
                  "linear-gradient(to right, rgba(9, 12, 27, 0.7) 80%, transparent)",
               // backdropFilter: "blur(150px)",
               WebkitBackdropFilter: "blur(150px)", // for Safari
               zIndex: 2,
            }}
         />

         {/* Right fade overlay */}

         <div
            style={{
               pointerEvents: "none",
               position: "absolute",
               right: 0,
               top: 0,
               bottom: 0,
               width: "120px",
               background:
                  "linear-gradient(to left, rgba(9, 12, 27, 0.7) 80%, transparent)",
               // backdropFilter: "blur(150px)",
               WebkitBackdropFilter: "blur(150px)", // Safari support

               zIndex: 2,
            }}
         />
      </div>
   );
}
