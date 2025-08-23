import React, { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
   NextButton,
   PrevButton,
   usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { useDotButton } from "./EmblaCarouselDotButton";
import sliderImg1 from "../assets/sliderImg1.svg";
import sliderImg2 from "../assets/sliderImg2.svg";
import sliderImg3 from "../assets/sliderImg3.svg";
import sliderImg4 from "../assets/sliderImg4.svg";
import sliderImg5 from "../assets/sliderImg5.svg";
import "./embla.css";

const TWEEN_FACTOR_BASE = 0.2;

const IMAGE_PATHS = [
   sliderImg1,
   sliderImg2,
   sliderImg3,
   sliderImg4,
   sliderImg5,
];

const EmblaCarousel = (props) => {
   // Enable loop in options
   const { slides = [0, 1, 2, 3, 4], options = { loop: true } } = props;
   const [emblaRef, emblaApi] = useEmblaCarousel(options);
   const tweenFactor = useRef(0);
   const tweenNodes = useRef([]);

   const { selectedIndex, scrollSnaps, onDotButtonClick } =
      useDotButton(emblaApi);

   const {
      prevBtnDisabled,
      nextBtnDisabled,
      onPrevButtonClick,
      onNextButtonClick,
   } = usePrevNextButtons(emblaApi);

   const setTweenNodes = useCallback((emblaApi) => {
      tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
         return slideNode.querySelector(".embla__parallax__layer");
      });
   }, []);

   const setTweenFactor = useCallback((emblaApi) => {
      tweenFactor.current =
         TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
   }, []);

   const tweenParallax = useCallback((emblaApi, eventName) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
         let diffToTarget = scrollSnap - scrollProgress;
         const slidesInSnap = engine.slideRegistry[snapIndex];

         slidesInSnap.forEach((slideIndex) => {
            if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

            if (engine.options.loop) {
               engine.slideLooper.loopPoints.forEach((loopItem) => {
                  const target = loopItem.target();

                  if (slideIndex === loopItem.index && target !== 0) {
                     const sign = Math.sign(target);

                     if (sign === -1) {
                        diffToTarget = scrollSnap - (1 + scrollProgress);
                     }
                     if (sign === 1) {
                        diffToTarget = scrollSnap + (1 - scrollProgress);
                     }
                  }
               });
            }

            const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
            const tweenNode = tweenNodes.current[slideIndex];
            tweenNode.style.transform = `translateX(${translate}%)`;
         });
      });
   }, []);

   useEffect(() => {
      if (!emblaApi) return;

      setTweenNodes(emblaApi);
      setTweenFactor(emblaApi);
      tweenParallax(emblaApi);

      emblaApi
         .on("reInit", setTweenNodes)
         .on("reInit", setTweenFactor)
         .on("reInit", tweenParallax)
         .on("scroll", tweenParallax)
         .on("slideFocus", tweenParallax);
   }, [emblaApi, tweenParallax]);

   return (
      <div className="embla">
         <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
               {slides.map((index) => (
                  <div className="embla__slide" key={index}>
                     <div className="embla__parallax">
                        <div className="embla__parallax__layer">
                           <img
                              className="embla__slide__img embla__parallax__img"
                              src={IMAGE_PATHS[index]}
                              alt={`Usecase ${index + 1}`}
                              style={{
                                 width: "100%",
                                 height: "100%",
                                 objectFit: "contain",
                                 borderTopLeftRadius: 16,
                                 borderTopRightRadius: 16,
                              }}
                           />
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="embla__controls">
            <div className="embla__buttons">
               {/* Always enabled buttons in loop mode */}
               <PrevButton
                  onClick={onPrevButtonClick}
                  disabled={false} // Force enabled in loop mode
               />
               <NextButton
                  onClick={onNextButtonClick}
                  disabled={false} // Force enabled in loop mode
               />
            </div>

            <div className="embla__dots">
               {scrollSnaps.map((_, index) => (
                  <button
                     key={index}
                     onClick={() => onDotButtonClick(index)}
                     style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        margin: 6,
                        border:
                           index === selectedIndex
                              ? "2px solid #FF7A01"
                              : "2px solid #ccc",
                        background:
                           index === selectedIndex ? "#FF7A01" : "transparent",
                        cursor: "pointer",
                        transition: "background 0.2s, border 0.2s",
                        outline: "none",
                        display: "inline-block",
                        padding: 0,
                     }}
                     aria-label={`Go to slide ${index + 1}`}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

export default EmblaCarousel;
