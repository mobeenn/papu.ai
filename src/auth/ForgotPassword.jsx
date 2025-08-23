import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { toast } from "react-toastify";
import axios from "axios";
export const ForgotPassword = () => {
   const [email, setEmail] = useState("");

   const handleForgotPassword = async (e) => {
      e.preventDefault();

      if (!email) {
         toast.error("Please enter your email.");
         return;
      }

      try {
         const res = await axios.post("your_api_url", {
            email,
         });
         console.log("🚀 ~ handleForgotPassword ~ res:", res);

         if (res?.data?.message) {
            toast.success(res.data.message); // ✅ "Email sent successfully!"
            setEmail("");
         } else {
            toast.error("Something went wrong. Try again.");
         }
      } catch (error) {
         console.error("Forgot password error:", error);
         toast.error("Failed to send email. Try again later.");
      }
   };
   return (
      <>
         <div className="  flex flex-col items-center justify-between lg:flex-row">
            <div className="bg-[#0d2c33] hidden lg:flex w-full h-screen justify-center items-center p-5">
               <img
                  src="your_api_urls"
                  alt="signin"
                  className="w-full max-w-[620px] object-contain"
               />
            </div>
            <div className="flex flex-col justify-center bg-[#1a1a1a] h-screen w-full max-w-[1000px]">
               <img
                  className="w-40 md:w-52 object-contain mx-auto "
                  src={logo}
                  alt="popu.ai"
               />
               <div className="flex flex-col gap-6 items-center my-[20px] mx-3">
                  <input
                     type="email"
                     name="email"
                     placeholder="Enter Your email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="font-[400] text-[16px] leading-[24px] align-middle text-[#FFFFFF52] py-2 px-3 rounded-[6px] w-full max-w-[400px] bg-[#292A30] border border-transparent focus:outline-none focus:border-[#00C29F]"
                  />
                  <button
                     onClick={handleForgotPassword}
                     type="submit"
                     className="bg-[#00C29F] text-white py-2 px-6 rounded-[6px] hover:bg-[#00b391] transition-all w-full max-w-[400px] cursor-pointer"
                  >
                     Send Reset Link
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};
