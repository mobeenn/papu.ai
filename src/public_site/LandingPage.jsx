import { useState } from "react";
import logo from "../assets/logo.svg";
import avater1 from "../assets/avater1.svg";
import avatar2 from "../assets/avatar2.svg";
import avatar3 from "../assets/avatar3.svg";
import avatar4 from "../assets/avatar4.svg";
import card1 from "../assets/card1.svg";
import card2 from "../assets/card2.svg";
import card3 from "../assets/card3.svg";
import card4 from "../assets/card4.svg";
import { Collapse } from "antd";
import { Carousel3D } from "../components/Carousel3D";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { FooterSection } from "../components/FooterSection";
import { Header } from "../components/Header";
import EmblaCarousel from "../components/EmblaCarousel";
import { Marquee } from "../components/magicui/marquee";
import avatarIMG1 from "../assets/avatarIMG1.svg";
import avatarIMG2 from "../assets/avatarIMG2.svg";
import avatarIMG3 from "../assets/avatarIMG3.svg";
import AiScript from "../assets/ai-script.svg";
import { testimonials } from "../lib/data";
import Slider from "react-slick";
const avatarThumbnails = [
   { src: avatarIMG1 },
   { src: avatarIMG2 },
   { src: avatarIMG3 },
   { src: avatarIMG1 },
   { src: avatarIMG2 },
   { src: avatarIMG3 },
   { src: avatarIMG1 },
   { src: avatarIMG2 },
   { src: avatarIMG3 },
   { src: avatarIMG1 },
   { src: avatarIMG2 },
   { src: avatarIMG3 },
   { src: avatarIMG1 },
   { src: avatarIMG2 },
   { src: avatarIMG3 },
   { src: avatarIMG1 },
   { src: avatarIMG2 },
   { src: avatarIMG3 },
];
const { Panel } = Collapse;

export const LandingPage = () => {
   const [activeTab, setActiveTab] = useState("starter");
   const [activePlan, setActivePlan] = useState("monthly");

   // Plan Data
   const planDetails = {
      starter: {
         onetime: { price: "$4.99", credits: "60 credits" },
      },
      standard: {
         monthly: { price: "$8.99 /Month", credits: "120 credits" },
         yearly: { price: "$99.99 /Year", credits: "1440 credits" },
      },
      pro: {
         monthly: { price: "$29.99 /Month", credits: "450 credits" },
         yearly: { price: "$329.99 /Year", credits: "5400 credits" },
      },
   };

   const currentPlan =
      activeTab === "starter"
         ? planDetails.starter.onetime
         : planDetails[activeTab][activePlan];
   const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 2,
            },
         },
         {
            breakpoint: 640,
            settings: {
               slidesToShow: 1,
            },
         },
      ],
   };

   const navigate = useNavigate();
   const handleNavigate = () => {
      navigate("/signup");
   };
   return (
      <>
         <div id="/" className="w-full min-h-screen overflow-x-hidden">
            {/* Navbar */}
            <Header />
            {/* hero section */}
            <div className="flex flex-col lg:flex-row justify-center items-center  gap-10 px-4 lg:mx-[150px] mt-3 sm:mt-10 sm:mb-20">
               <div className=" text-[#FFFFFF] font-poppins font-bold text-[35px] sm:text-[64px] leading-[24px] sm:leading-[100%] align-middle ">
                  <h1>Bring Your</h1>
                  <h2 className="text-[#22C5A8] my-6">Words to Life</h2>
                  <p className=" font-[500] text-[20px] sm:text-[24px] leading-normal my-5 sm:my-10">
                     Create stunning AI video avatars from just a script and
                     multi-modal AI Technology. No cameras, no actors — just
                     pure creativity.
                  </p>
                  <p className="text-[#22C5A8] font-medium text-[24px] leading-normal mb-12">
                     Your AI-powered video companion for content, marketing, and
                     storytelling.
                  </p>
                  <Link to="/signup">
                     <button className="py-2 max-w-[420px] w-full cursor-pointer bg-[#FF7A01] font-poppins font-medium text-[20px] leading-[28px] rounded-[6px]">
                        Get Started for Free
                     </button>
                  </Link>
               </div>
               <div className="sm:p-12 sm:bg-[url('https://papu-ai-bucket.s3.us-west-2.amazonaws.com/landingPage/background.png')] bg-no-repeat bg-cover bg-center w-full max-w-[700px]">
                  <Carousel3D />
               </div>
            </div>

            {/* Ai work section */}
            <div
               id="papu-ai-works"
               className="w-full sm:max-w-[1328px] max-w-[330px] py-3 sm:py-[30px] bg-[#D9D9D93D] mx-auto text-center rounded-[16px] mt-[50px]"
            >
               <p className="text-[24px] sm:text-[32px] font-[700] text-[#FFFFFF]">
                  How <span className="text-[#FF7A01]"> Papu </span>
                  <span className="text-[#22C5A8]">AI</span> works
               </p>
            </div>
            <p className=" text-[#FFFFFF] font-poppins font-normal text-[18px] sm:text-[24px] leading-normal tracking-normal text-center sm:mb-[40px] mt-4 sm:mt-[32px]">
               From idea to avatar — here’s how you can turn your thoughts into
               stunning videos in minutes.
            </p>
            {/* AI Work Step card */}
            <div className="mx-4 mb-20">
               <StepSectionLeftImage
                  image={avater1}
                  stepLabel="Step 1:"
                  heading="Describe Your Idea:"
                  description="Just type in a short prompt or topic — whether it’s for a product, story, pitch, or social content."
               />
               <StepSectionRighImage
                  image={avatar2}
                  stepLabel="Step 2:"
                  heading="Draft the script for your video:"
                  description="Papu AI instantly turns your idea into a polished, ready-to-speak script. Don’t love it? Hit regenerate until it’s perfect."
               />
               <StepSectionLeftImage
                  image={avatar3}
                  stepLabel="Step 3:"
                  heading="Choose Your AI Avatar:"
                  description="Browse a growing collection of 100+ avatars — male, female, multilingual, expressive. Pick the one that fits your message."
               />
               <StepSectionRighImage
                  image={avatar4}
                  stepLabel="Step 4:"
                  heading="Generate Your Video:"
                  description="Your avatar speaks your words with stunning realism. Preview or download — your video is now ready."
               />
            </div>
            {/* where papu ai shine */}
            <div
               id="use-cases"
               className="w-full sm:max-w-[1328px] max-w-[330px] py-3 sm:py-[30px] bg-[#D9D9D93D] mx-auto text-center rounded-[16px] mt-[50px]"
            >
               <p className="text-[24px] sm:text-[32px] font-[700] text-[#FFFFFF]">
                  Where <span className="text-[#FF7A01]"> Papu </span>
                  <span className="text-[#22C5A8]"> AI</span> shines
               </p>
            </div>
            <p className=" text-[#FFFFFF] font-poppins font-normal text-[18px] sm:text-[24px] leading-normal tracking-normal text-center sm:mb-[40px] mt-4 mx-3 sm:mt-[32px] ">
               Explore how creators, marketers, educators, and teams use AI
               avatars to save time, boost engagement, and scale their message.
            </p>
            <EmblaCarousel />

            {/* Speak for you */}
            <div className="w-full sm:max-w-[1328px] max-w-[330px] py-3 sm:py-[30px] bg-[#D9D9D93D] mx-auto text-center rounded-[16px] mt-[80px]">
               <p className="text-[24px] sm:text-[32px] font-[700] text-[#FFFFFF]">
                  Who will <span className="text-[#FF7A01]"> Speak </span> for
                  <span className="text-[#22C5A8]"> you?</span>
               </p>
            </div>
            <p className=" text-[#FFFFFF] font-poppins font-normal text-[18px] sm:text-[24px] leading-normal tracking-normal text-center sm:mb-[40px] mt-4 mx-3 sm:mt-[32px]">
               From friendly to formal, pick the AI face that fits your story.
            </p>
            {/* Story face section replaced with four wide vertical Marquees side by side */}
            <div
               style={{
                  width: 900,
                  display: "flex",
                  flexDirection: "row",
                  gap: "48px",
                  margin: "-100px auto -16px auto",
                  justifyContent: "center",
                  height: "900px",
                  alignItems: "center",
                  position: "relative",
                  overflow: "hidden",
               }}
            >
               {[0, 1, 2, 3].map((col) => (
                  <Marquee
                     vertical
                     style={{ width: 200, height: 860 }}
                     key={col}
                  >
                     {avatarThumbnails
                        .slice(col * 4, col * 4 + 4)
                        .map((img, idx) => (
                           <span
                              key={img + idx}
                              style={{
                                 padding: 0,
                                 background: "none",
                                 boxShadow: "none",
                                 border: "none",
                                 outline: "none",
                                 display: "block",
                                 marginBottom: idx < 3 ? 24 : 0,
                              }}
                           >
                              <div
                                 style={{
                                    width: 160,
                                    height: 260,
                                    borderRadius: 16,
                                    overflow: "hidden",
                                    background: "#222",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    margin: "0 auto",
                                 }}
                              >
                                 <img
                                    src={img.src}
                                    alt="avatar"
                                    width={160}
                                    height={260}
                                    style={{
                                       width: "100%",
                                       height: "100%",
                                       objectFit: "cover",
                                       display: "block",
                                       background: "none",
                                       border: "none",
                                       outline: "none",
                                    }}
                                 />
                              </div>
                           </span>
                        ))}
                  </Marquee>
               ))}
            </div>
            <p className=" text-[#FFFFFF] mx-6 sm:mx-[200px] font-poppins font-normal text-[18px] sm:text-[24px] -mt-19 leading-normal tracking-normal text-center mb-[40px] ">
               With over 100+ diverse AI avatars, Papu AI lets you deliver your
               message in exactly the tone and style you need. Whether you’re
               creating videos for marketing, education, or internal training,
               choose the face and voice that best represents your brand.
            </p>
            {/* features */}
            <div
               id="features"
               className="w-full sm:max-w-[1328px] max-w-[330px] py-3 px-3 sm:py-[30px] bg-[#D9D9D93D] mx-auto text-center rounded-[16px] sm:mt-[90px] "
            >
               <p className=" text-[22px] sm:text-[32px] font-[700] text-[#FFFFFF]">
                  What Makes<span className="text-[#FF7A01]"> Papu </span>
                  <span className="text-[#22C5A8]">AI</span> Powerful
               </p>
            </div>
            <div>
               <p className="text-[#FFFFFF] font-poppins font-normal text-[18px] sm:text-[24px] leading-normal tracking-normal text-center sm:mb-[80px] mt-4 sm:mt-[32px]">
                  Everything you need to create stunning, human-like AI videos —
                  in minutes, not hours.
               </p>
            </div>
            {/* card */}
            <div className="flex justify-center flex-wrap mt-9 gap-6 sm:gap-[40px] sm:mb-20 ">
               <Card
                  image={card1}
                  heading="🧠 Script Generation"
                  paragrapgh=" Just describe your idea — Papu AI turns it into a polished,
               ready-to-speak video script."
               />
               <Card
                  image={card2}
                  heading="🎭 100+ AI Avatars"
                  paragrapgh="Choose from a growing collection of expressive, camera-ready AI presenters."
               />
               <Card
                  image={card3}
                  heading="🎙️ Real  Voiceovers"
                  paragrapgh="Lifelike voices with clear delivery, emotional tone, and perfect pacing — no robotic monotone."
               />
               <Card
                  image={card4}
                  heading="🎥 Studio-Quality"
                  paragrapgh="Get high-resolution, camera-free videos that look Pro recorded, without the studio."
               />
            </div>
            {/* Testimonials */}
            <div
               id="testimonials"
               className="w-full sm:max-w-[1328px] max-w-[330px] py-3 sm:py-[30px] bg-[#D9D9D93D] mx-auto text-center rounded-[16px] sm:mt-[50px] mt-6"
            >
               <p className="text-[24px] sm:text-[32px] font-[700] text-[#FFFFFF]">
                  What People Are Saying
               </p>
            </div>
            <div className="sm:mb-20">
               <p className="text-[#FFFFFF] font-poppins font-normal text-[18px] sm:text-[24px] leading-normal tracking-normal text-center sm:mb-[80px] mx-3 mt-4 sm:mt-[32px]">
                  See how creators, marketers, and professionals are using Papu
                  AI to save time and create stunning videos with ease.
               </p>
               {/* <MarqueeDemo /> */}
               <Slider {...settings}>
                  {testimonials.map((t, index) => (
                     <div key={index} className="px-3 h-full">
                        <div className="text-[#090C1B] bg-[#D9D9D9] mb-13   flex sm:flex-row flex-col gap-6 sm:text-left items-center text-center leading-[26px] px-3 py-4 rounded-[32px] sm:h-[200px]">
                           <img
                              className="w-[70px] sm:-mt-20"
                              src={t.img}
                              alt={t.name}
                           />
                           <div className="flex flex-col justify-between h-full">
                              <div>
                                 <h1 className="font-[700] text-[24px]">
                                    {t.name}
                                 </h1>
                                 <h2 className="font-[500] italic text-[18px] my-[12px]">
                                    {t.role}
                                 </h2>
                                 <p className="font-[400] text-[20px]">
                                    "{t.quote}"
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </Slider>
            </div>

            {/* Plan section info*/}
            <div className="bg-[#090C1B] sm:mb-20">
               <div
                  id="pricing"
                  className="w-full sm:max-w-[1328px] max-w-[330px] py-3 sm:py-[30px] bg-[#D9D9D93D] mx-auto text-center rounded-[16px] sm:mt-[50px] mt-6"
               >
                  <p className="text-[24px] sm:text-[32px] font-[700] text-[#FFFFFF]">
                     Plans That<span className="text-[#FF7A01]"> Grow </span>
                     With Your
                     <span className="text-[#22C5A8]"> Creativity</span>
                  </p>
               </div>
               <div>
                  <p className=" text-[#FFFFFF] font-poppins font-normal text-[18px] sm:text-[24px] leading-normal tracking-normal text-center mb-[30px] mx-2 mt-4 sm:mt-[32px]">
                     Choose a plan that suits your needs — whether you're
                     experimenting or scaling your content, Papu AI has you
                     covered.
                  </p>
               </div>
               <div
                  className={`py-10  w-full max-w-[800px] sm:mx-auto  rounded-[32px] ${
                     activePlan === "yearly"
                        ? "bg-plan-yearly"
                        : "bg-plan-month"
                  }`}
               >
                  {/* Plan Type Toggle */}
                  <div className="flex bg-[#2D2D36] p-1 rounded-[8px] w-full max-w-[600px] mx-auto gap-2 mb-4">
                     <button
                        onClick={() => setActiveTab("starter")}
                        className={`flex-1 py-2 rounded-[4px] font-semibold text-[14px] md:text-[16px] transition-all
                     ${
                        activeTab === "starter"
                           ? "bg-white text-[#1E1E1E]"
                           : "bg-transparent text-[#A0A0A0]"
                     }`}
                     >
                        Starter Plan
                     </button>
                     <button
                        onClick={() => setActiveTab("standard")}
                        className={`flex-1 py-2 rounded-[4px] font-semibold text-[14px] md:text-[16px] transition-all
                     ${
                        activeTab === "standard"
                           ? "bg-white text-[#1E1E1E]"
                           : "bg-transparent text-[#A0A0A0]"
                     }`}
                     >
                        Standard Plan
                     </button>
                     <button
                        onClick={() => setActiveTab("pro")}
                        className={`flex-1 py-2 rounded-[4px] font-semibold text-[14px] md:text-[16px] transition-all
                     ${
                        activeTab === "pro"
                           ? "bg-white text-[#1E1E1E]"
                           : "bg-transparent text-[#A0A0A0]"
                     }`}
                     >
                        Pro Plan
                     </button>
                  </div>

                  {/* Plan Details Card */}
                  <div className="mx-auto w-full max-w-[608px] rounded-[16px] pt-4 px-4 mt-4 sm:mt-11 sm:pb-4 bg-[#292A30]">
                     <div className="flex bg-[#2D2D36] p-1 rounded-[8px] w-full max-w-[150px] mx-auto gap-2">
                        {activeTab !== "starter" ? (
                           <>
                              <button
                                 onClick={() => setActivePlan("monthly")}
                                 className={`flex-1 py-1 rounded-[4px] font-medium text-[14px] transition-all
                              ${
                                 activePlan === "monthly"
                                    ? "bg-white text-[#1E1E1E]"
                                    : "bg-transparent text-[#A0A0A0]"
                              }`}
                              >
                                 Monthly
                              </button>
                              <button
                                 onClick={() => setActivePlan("yearly")}
                                 className={`flex-1 py-1 rounded-[4px] font-medium text-[14px] transition-all
                              ${
                                 activePlan === "yearly"
                                    ? "bg-white text-[#1E1E1E]"
                                    : "bg-transparent text-[#A0A0A0]"
                              }`}
                              >
                                 Yearly
                              </button>
                           </>
                        ) : (
                           <div>
                              <button className="text-center mt-2 text-white font-medium py-2 rounded-[8px]">
                                 One-time payment
                              </button>
                           </div>
                        )}
                     </div>
                     <button
                        className={`font-medium text-[14px] mt-[12px] leading-[22px] rounded-[8px] px-4 py-2 whitespace-nowrap
                     ${
                        activePlan === "yearly"
                           ? "bg-[#FF7A01] text-white"
                           : "bg-[#1CA990] text-white"
                     }`}
                     >
                        {currentPlan.price}
                        {activeTab === "starter" && " (one-time payment)"}
                     </button>

                     <ul className="font-normal text-[16px] leading-[40px] text-white list-disc px-5 py-[12px]">
                        <li>
                           {currentPlan.credits} (1 credit = 1 sec of video)
                        </li>
                        <li className="text-[#A5A5A5]">
                           Note: Video up to 1-minute max based on script
                           generated
                        </li>
                        <li>Full customer support</li>
                     </ul>
                  </div>

                  {/* Proceed Button */}
                  <div className="flex justify-center mt-8 sm:mt-[35px]">
                     <button
                        onClick={() => alert(`Selected: ${getLookupKey()}`)}
                        className={`font-[500] text-[16px] text-white md:text-[20px] leading-6 w-full max-w-[608px] py-4 rounded-[8px]
                     ${
                        activePlan === "yearly"
                           ? "bg-[#FF7A01]"
                           : "bg-[#1CA990]"
                     }`}
                     >
                        Get Started
                     </button>
                  </div>
                  <p className="text-center text-[#8F8F8F] font-[500] text-[14px] leading-normal my-[24px]">
                     Need assistance? Contact support at info@papu.ai
                  </p>
               </div>
            </div>
            {/* ready to create */}
            <div className=" w-full sm:max-w-[938px] max-w-[330px] py-3 sm:py-[30px] bg-[#D9D9D93D] mx-auto text-center rounded-[16px] sm:mt-[50px] mt-6">
               <p className="text-[24px] sm:text-[32px] font-[700] text-[#FFFFFF]">
                  Ready to Create?
               </p>
            </div>
            <div className="my-10 sm:mb-20 ">
               <img className="mx-auto" src={AiScript} alt="AI-Script" />
            </div>
            {/* get started buton */}
            <Link to="/signup">
               <div className="flex justify-center">
                  <button className="bg-[#FF7A01]  cursor-pointer font-[500] text-[20px] rounded-[8px] text-[#FFFFFF] py-4 w-full sm:max-w-[420px] max-w-[200px]">
                     Get Started for Free
                  </button>
               </div>
            </Link>
            {/* Frequently Asked Questions */}
            <div
               id="faqs"
               className=" w-full sm:max-w-[1328px] max-w-[340px] py-3  sm:py-[30px] bg-[#D9D9D93D] mx-auto text-center rounded-[16px] sm:mt-[50px] mt-6"
            >
               <p className="text-[24px] sm:text-[32px] font-[700] text-[#FFFFFF]">
                  Frequently Asked Questions
               </p>
            </div>
            <div>
               <p className="text-[#FFFFFF] font-poppins font-normal text-[18px] sm:text-[24px] leading-normal tracking-normal text-center mb-10 sm:mb-[80px] mt-[32px] mx-3">
                  Everything you need to know before creating your first AI
                  video with Papu AI.
               </p>
            </div>
            <div className="mb-[100px] mx-auto w-full sm:max-w-[950px] max-w-[320px] ">
               <Collapse
                  accordion
                  bordered={false}
                  expandIcon={({ isActive }) => (
                     <span
                        style={{
                           fontSize: 22,
                           color: "#23243A",
                           transition: "transform 0.2s",
                           transform: isActive
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                        }}
                     >
                        ▼
                     </span>
                  )}
                  style={{ background: "none" }}
               >
                  <Panel
                     header={
                        <span
                           style={{
                              fontWeight: 600,
                              fontSize: 18,
                              color: "#23243A",
                              display: "flex",
                              alignItems: "center",
                           }}
                        >
                           What is Papu AI{" "}
                           <span style={{ color: "#FF7A01", marginLeft: 4 }}>
                              ❓
                           </span>
                        </span>
                     }
                     key="1"
                     style={{
                        background: "#fff",
                        borderRadius: 12,
                        marginBottom: 16,
                        border: "none",
                     }}
                  >
                     <span
                        className="my-12"
                        style={{ color: "#23243A", fontSize: 18 }}
                     >
                        Papu AI is an AI-powered platform that helps you create
                        professional-quality avatar videos from text — without
                        cameras, actors, or editing software.
                     </span>
                  </Panel>
                  <Panel
                     header={
                        <span
                           style={{
                              fontWeight: 600,
                              fontSize: 18,
                              color: "#23243A",
                              display: "flex",
                              alignItems: "center",
                           }}
                        >
                           Do I need to be on camera to use Papu AI{" "}
                           <span style={{ color: "#FF7A01", marginLeft: 4 }}>
                              ❓
                           </span>
                        </span>
                     }
                     key="2"
                     style={{
                        background: "#fff",
                        borderRadius: 12,
                        marginBottom: 16,
                        border: "none",
                     }}
                  >
                     <span
                        className="my-12"
                        style={{ color: "#23243A", fontSize: 18 }}
                     >
                        Not at all. Papu AI avatars do the talking for you —
                        just write your script, and the AI avatar delivers it
                        naturally.
                     </span>
                  </Panel>
                  <Panel
                     header={
                        <span
                           style={{
                              fontWeight: 600,
                              fontSize: 18,
                              color: "#23243A",
                              display: "flex",
                              alignItems: "center",
                           }}
                        >
                           Can I choose different languages or accents{" "}
                           <span style={{ color: "#FF7A01", marginLeft: 4 }}>
                              ❓
                           </span>
                        </span>
                     }
                     key="3"
                     style={{
                        background: "#fff",
                        borderRadius: 12,
                        marginBottom: 16,
                        border: "none",
                     }}
                  >
                     <span
                        className="my-12"
                        style={{ color: "#23243A", fontSize: 18 }}
                     >
                        Yes, Papu AI supports multiple languages and
                        natural-sounding voiceovers across a variety of accents
                        and tones.
                     </span>
                  </Panel>
                  <Panel
                     header={
                        <span
                           style={{
                              fontWeight: 600,
                              fontSize: 18,
                              color: "#23243A",
                              display: "flex",
                              alignItems: "center",
                           }}
                        >
                           How long can each video be{" "}
                           <span style={{ color: "#FF7A01", marginLeft: 4 }}>
                              ❓
                           </span>
                        </span>
                     }
                     key="4"
                     style={{
                        background: "#fff",
                        borderRadius: 12,
                        marginBottom: 16,
                        border: "none",
                     }}
                  >
                     <span
                        className="my-12"
                        style={{ color: "#23243A", fontSize: 18 }}
                     >
                        Each credit equals 1 second of video. On the standard
                        plan, you can create up to a 1-minute video per
                        generation.
                     </span>
                  </Panel>
                  <Panel
                     header={
                        <span
                           style={{
                              fontWeight: 600,
                              fontSize: 18,
                              color: "#23243A",
                              display: "flex",
                              alignItems: "center",
                           }}
                        >
                           Can I use Papu AI for commercial projects{" "}
                           <span style={{ color: "#FF7A01", marginLeft: 4 }}>
                              ❓
                           </span>
                        </span>
                     }
                     key="5"
                     style={{
                        background: "#fff",
                        borderRadius: 12,
                        marginBottom: 16,
                        border: "none",
                     }}
                  >
                     <span
                        className="my-12"
                        style={{ color: "#23243A", fontSize: 18 }}
                     >
                        Yes, all videos you create with Papu AI are yours to use
                        in marketing, training, education, and other commercial
                        use cases.
                     </span>
                  </Panel>
                  <Panel
                     header={
                        <span
                           style={{
                              fontWeight: 600,
                              fontSize: 18,
                              color: "#23243A",
                              display: "flex",
                              alignItems: "center",
                           }}
                        >
                           What happens after I use all my credits{" "}
                           <span style={{ color: "#FF7A01", marginLeft: 4 }}>
                              ❓
                           </span>
                        </span>
                     }
                     key="6"
                     style={{
                        background: "#fff",
                        borderRadius: 12,
                        marginBottom: 0,
                        border: "none",
                     }}
                  >
                     <span
                        className="my-12"
                        style={{ color: "#23243A", fontSize: 18 }}
                     >
                        You can upgrade your plan or purchase additional credits
                        to continue generating videos without limits.
                     </span>
                  </Panel>
               </Collapse>
            </div>
            {/* footer */}
            <FooterSection />
         </div>
      </>
   );
};
const Card = ({ image, heading, paragrapgh }) => {
   return (
      <div className=" w-full max-w-[300px] rounded-[16px] bg-[#5B5E6F]">
         <img src={image} alt="Card Show" />
         <h1 className="text-[#F3FF4D] text-center font-poppins font-semibold text-[20px] leading-[100%] pt-6">
            {heading}
         </h1>
         <p className="text-center font-poppins font-normal text-[20px] leading-[30px] text-[#FFFFFF] px-8 pt-6 pb-12 ">
            {paragrapgh}
         </p>
      </div>
   );
};

const StepSectionLeftImage = ({ image, stepLabel, heading, description }) => {
   return (
      <section className="bg-[#404049] text-white rounded-[16px] mt-[24px] flex flex-col md:flex-row items-center gap-8 w-full md:max-w-[1056px] max-w-[456px] mx-auto">
         {/* Left: Image */}
         <div className="w-full md:w-1/2 flex justify-center">
            <img
               src={image}
               alt="Step illustration"
               className="w-full sm:max-w-[520px] max-w-[800px] h-[350px]  object-cover 
             rounded-tl-[12px] rounded-tr-[12px] lg:rounded-tr-none lg:rounded-bl-[12px]"
            />
         </div>

         {/* Right: Text */}
         <div className="w-full md:w-1/2 px-4 md:px-[72px] py-3 sm:py-7 text-center md:text-left">
            <button className="mb-4 md:mb-[30px] bg-[#D86E10] px-3 py-1.5 font-poppins font-semibold text-[20px] md:text-[24px] rounded-[8px]">
               {stepLabel}
            </button>
            <h2 className="text-[20px] md:text-[24px] leading-[30px] md:leading-[40px] font-poppins font-[600] text-[#00E0B8] mb-2">
               {heading}
            </h2>
            <p className="text-[#FFFFFF] font-poppins  lg:text-[24px] md:text-[18px]  lg:leading-[38px] md:leading-[24px]">
               {description}
            </p>
         </div>
      </section>
   );
};

const StepSectionRighImage = ({ image, stepLabel, heading, description }) => {
   return (
      <section className="bg-[#404049] text-white rounded-[16px] mt-[24px] flex flex-col-reverse md:flex-row items-center gap-8 w-full md:max-w-[1056px] max-w-[456px] mx-auto">
         {/* Left: Text */}
         <div className="w-full md:w-1/2 px-4 md:px-[72px]  text-center md:text-left">
            <button className="mb-4 md:mb-[30px] bg-[#D86E10] px-3 py-1.5 font-poppins font-semibold text-[20px] md:text-[24px] rounded-[8px]">
               {stepLabel}
            </button>
            <h2 className="text-[20px] md:text-[24px] leading-[30px] md:leading-[40px] font-poppins font-[600] text-[#00E0B8] mb-2">
               {heading}
            </h2>
            <p className="text-[#FFFFFF] font-poppins lg:text-[24px] md:text-[18px] lg:leading-[30px] md:leading-[24px]">
               {description}
            </p>
         </div>

         {/* Right: Image */}
         <div className="w-full md:w-1/2 flex justify-center">
            <img
               src={image}
               alt="Step illustration"
               className="w-full sm:max-w-[520px] max-w-[800px] h-[350px] object-cover 
      rounded-tr-[12px] rounded-tl-[12px] lg:rounded-tl-none lg:rounded-br-[12px]"
            />
         </div>
      </section>
   );
};
