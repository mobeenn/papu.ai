import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import {
   createCheckoutSession,
   createPortalSession,
   getUser,
} from "../api/apiService";
import { toast } from "react-toastify";

export const Subscription = () => {
   const [activeTab, setActiveTab] = useState("starter");
   const [activePlan, setActivePlan] = useState("monthly");
   const [showModal, setShowModal] = useState(false);
   const hasHandledSession = useRef(false);

   useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const session_id = queryParams.get("session_id");
      const email = localStorage.getItem("userEmail");

      if (session_id && email && !hasHandledSession.current) {
         hasHandledSession.current = true; // ✅ Prevent double run
         handlePortalSession(session_id, email);
      }
   }, [location]);

   useEffect(() => {
      const fetchUser = async () => {
         try {
            const userEmail = localStorage.getItem("userEmail");
            const res = await getUser(userEmail);
            console.log("🚀 ~ fetchUser ~ res:", res.customer_id);
            localStorage.setItem("customer_id", res.customer_id);
         } catch (err) {
            console.error("Error fetching user data:", err);
         }
      };
      fetchUser();
   }, []);
   const handlePortalSession = async (session_id, email) => {
      try {
         const res = await createPortalSession({ email, session_id });
         console.log("✅ Portal session created:", res);

         toast.success("Subscription activated successfully!");
      } catch (error) {
         console.error("❌ Error creating portal session:", error);
         toast.error("Subscription verification failed!");
      }
   };
   // 🧠 Determine lookup_key based on user selection
   const getLookupKey = () => {
      if (activeTab === "starter") return "papu-starter";
      return `papu-${activeTab}-${activePlan}`;
   };
   // 🟩 Checkout Handler

   const handleCheckout = async () => {
      try {
         const email = localStorage.getItem("userEmail");
         const customer_id = localStorage.getItem("customer_id");
         const lookup_key = getLookupKey();

         const payload = {
            email,
            lookup_key,
            ...(customer_id && customer_id !== "undefined"
               ? { customer_id }
               : {}),
         };

         console.log("➡️ Payload for checkout:", payload);

         const res = await createCheckoutSession(payload);

         if (res?.url) {
            window.location.href = res.url;
         } else {
            toast.error("Checkout URL not received!");
         }
      } catch (error) {
         console.error("Checkout Error:", error);
         toast.error("Checkout failed. Try again.");
      }
   };

   // 🟡 Plan Data
   const planDetails = {
      starter: {
         onetime: { price: "$4.99", credits: "60 credits" }, // ✅ Add Starter plan
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

   return (
      <>
         <div
            className={`  py-10 sm:py-[80px] -m-6 px-3 sm:-m-4 h-[728px] rounded-[32px] ${
               activePlan === "yearly" ? "bg-plan-yearly" : "bg-plan-month"
            }`}
         >
            {/* 🟪 Plan Type Toggle */}
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

            {/* 🟩 Plan Details Card */}
            <div className="mx-auto w-full max-w-[608px] rounded-[16px] pt-4 px-4 mt-4 sm:mt-11 sm:pb-4 bg-[#292A30]">
               <div className="flex bg-[#2D2D36] p-1 rounded-[8px] w-full max-w-[150px] mx-auto gap-2">
                  {activeTab !== "starter" ? (
                     <div className="flex bg-[#2D2D36] p-1 rounded-[8px] w-full max-w-[150px] mx-auto gap-2">
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
                     </div>
                  ) : (
                     <div>
                        <button className="text-center mt-2 text-white font-medium   py-2  rounded-[8px] ">
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
                  <li>{currentPlan.credits} (1 credit = 1 sec of video)</li>
                  <li className="text-[#A5A5A5]">
                     Note: Video up to 1-minute max based on script generated
                  </li>
                  <li>Full customer support</li>
               </ul>
            </div>

            {/* 🟥 Proceed Button */}
            <div className="flex justify-center mt-8 sm:mt-[35px]">
               <button
                  onClick={() => setShowModal(true)}
                  className={`font-[500] text-[16px] text-white md:text-[20px] leading-6 w-full max-w-[608px] py-4 rounded-[8px]
                  ${activePlan === "yearly" ? "bg-[#FF7A01]" : "bg-[#1CA990]"}`}
               >
                  Proceed
               </button>
            </div>
            <p className="text-center text-[#8F8F8F] font-[500] text-[14px] leading-normal my-[24px]">
               Need assistance? Contact support at info@papu.ai
            </p>
         </div>

         {/* 🟧 POPUP MODAL */}
         {showModal && (
            <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-75 flex items-center justify-center">
               <div className="bg-[#1c1d21] w-[90%] max-w-[400px] rounded-[16px] p-6 relative shadow-lg text-white">
                  <button
                     onClick={() => setShowModal(false)}
                     className="absolute top-4 right-4 text-white text-xl"
                  >
                     <CgClose />
                  </button>

                  {/* Modal Content */}
                  <h2 className="text-[20px] font-semibold mb-4 text-center">
                     Confirm Your Plan
                  </h2>
                  <p className="text-[18px] font-medium text-center mb-6">
                     {currentPlan.price}
                  </p>

                  <button
                     onClick={handleCheckout}
                     className="w-full bg-[#1CA990] hover:bg-[#16967f] transition-all text-white py-3 rounded-[8px] font-semibold"
                  >
                     Checkout
                  </button>
               </div>
            </div>
         )}
      </>
   );
};
