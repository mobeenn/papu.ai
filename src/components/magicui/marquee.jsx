import React, { useRef } from "react";

export function Marquee({
   children,
   className = "",
   speed = 20,
   reverse = false,
   pauseOnHover = true,
   vertical = false,
}) {
   const marqueeRef = useRef(null);

   // Inline styles for professional look
   const marqueeStyle = {
      display: vertical ? "flex" : "flex",
      flexDirection: vertical ? "column" : "row",
      alignItems: "center",
      whiteSpace: vertical ? "normal" : "wrap",
      animation: `${
         vertical ? "marquee-vertical" : "marquee"
      } ${speed}s linear infinite${reverse ? " reverse" : ""}`,
      gap: 122,

      cursor: pauseOnHover ? "pointer" : "default",
   };

   // Pause animation on hover
   const handleMouseEnter = () => {
      if (pauseOnHover && marqueeRef.current) {
         marqueeRef.current.style.animationPlayState = "paused";
      }
   };
   const handleMouseLeave = () => {
      if (pauseOnHover && marqueeRef.current) {
         marqueeRef.current.style.animationPlayState = "running";
      }
   };

   // Duplicate children for seamless loop
   const items = React.Children.toArray(children);
   const allItems = [...items, ...items];

   return (
      <div
         className={className + (reverse ? " reverse" : "")}
         style={{
            overflow: "hidden",
            width: vertical ? 900 : "180%",
            height: vertical ? 480 : undefined,
            position: "relative",
            minHeight: vertical ? 180 : 48,
            background: "transparent",
         }}
      >
         {/* Fade overlays for marquee section (parent only, not per item) */}
         {vertical ? (
            <>
               {/* Top fade overlay */}
               <div
                  style={{
                     position: "absolute",
                     top: 0,
                     left: 0,
                     width: "100%",
                     height: "25%",
                     pointerEvents: "none",
                     background:
                        "linear-gradient(to bottom, #090B1B, transparent)",

                     zIndex: 2,
                  }}
               />
               {/* Bottom fade overlay */}
               <div
                  style={{
                     position: "absolute",
                     bottom: 0,
                     left: 0,
                     width: "100%",
                     height: "25%",
                     pointerEvents: "none",
                     background:
                        "linear-gradient(to top, #090B1B, transparent)",
                     zIndex: 2,
                  }}
               />
            </>
         ) : (
            <>
               {/* Left fade */}
               <div
                  className="hidden sm:block"
                  style={{
                     position: "absolute",
                     left: 0,
                     top: 0,
                     bottom: 0,
                     width: 32,
                     pointerEvents: "none",
                     background:
                        "linear-gradient(to right, rgba(0,0,0,0.7) 80%, transparent)",

                     zIndex: 2,
                  }}
               />
               {/* Right fade */}
               <div
                  className="hidden sm:block"
                  style={{
                     position: "absolute",
                     right: 0,
                     top: 0,
                     bottom: 0,
                     width: 32,
                     pointerEvents: "none",
                     background:
                        "linear-gradient(to left, rgba(0,0,0,0.7) 80%, transparent)",
                     zIndex: 2,
                  }}
               />
            </>
         )}
         <div
            ref={marqueeRef}
            style={marqueeStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
         >
            {allItems.map((child, idx) =>
               React.cloneElement(child, { key: idx })
            )}
         </div>
         <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .reverse {
          animation-direction: reverse;
        }
        @media (max-width: 600px) {
          .marquee-item {
            font-size: 16px;
            padding: 6px 12px;
          }
        }
      `}</style>
      </div>
   );
}
