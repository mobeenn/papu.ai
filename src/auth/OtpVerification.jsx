import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { sendVerificationEmail, verifyOtp } from "../api/apiService";
import { message } from "antd";

export const OtpVerification = () => {
   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
   const [isLoading, setIsLoading] = useState(false);

   const inputsRef = useRef([]);
   const navigate = useNavigate();
   const location = useLocation();
   const [resendTimer, setResendTimer] = useState(30);
   const [isResending, setIsResending] = useState(false);
   // Get email from location state or use default
   const email = location.state?.email || "example@email.com";
   useEffect(() => {
      if (resendTimer > 0) {
         const timer = setTimeout(() => {
            setResendTimer(resendTimer - 1);
         }, 1000);
         return () => clearTimeout(timer);
      }
   }, [resendTimer]);

   // Handle OTP input changes
   const handleChange = (e, index) => {
      const value = e.target.value.replace(/\D/g, "");
      const updatedOtp = [...otp];

      if (value.length === 6) {
         // Handle paste of full OTP
         const otpArray = value.slice(0, 6).split("");
         setOtp(otpArray);
         otpArray.forEach((v, i) => {
            if (inputsRef.current[i]) inputsRef.current[i].value = v;
         });
         inputsRef.current[5].focus();
         return;
      }

      if (value.length === 1) {
         updatedOtp[index] = value;
         setOtp(updatedOtp);
         if (index < 5) inputsRef.current[index + 1]?.focus();
      }
   };

   // Handle backspace key
   const handleKeyDown = (e, index) => {
      if (e.key === "Backspace") {
         if (otp[index]) {
            const updatedOtp = [...otp];
            updatedOtp[index] = "";
            setOtp(updatedOtp);
         } else if (index > 0) {
            inputsRef.current[index - 1]?.focus();
            const updatedOtp = [...otp];
            updatedOtp[index - 1] = "";
            setOtp(updatedOtp);
         }
      }
   };

   // Handle paste
   const handlePaste = (e) => {
      e.preventDefault();
      const paste = e.clipboardData
         .getData("text")
         .replace(/\D/g, "")
         .slice(0, 6);
      if (paste.length === 6) {
         const updatedOtp = paste.split("");
         setOtp(updatedOtp);
         updatedOtp.forEach((v, i) => {
            if (inputsRef.current[i]) inputsRef.current[i].value = v;
         });
         inputsRef.current[5].focus();
      }
   };

   // Handle OTP verification
   const handleVerify = async () => {
      const otpCode = otp.join("");

      if (otpCode.length !== 6) {
         toast.error("Please enter a 6-digit verification code", {
            position: "top-right",
            autoClose: 5000,
         });
         return;
      }

      setIsLoading(true);
      try {
         const payload = {
            email: email,
            code: otpCode,
         };

         const response = await verifyOtp(payload);

         // Check if the response contains an error
         if (response.error) {
            throw new Error(response.error);
         }

         // Only show success if there's no error in response
         toast.success(response.message, {
            position: "top-right",
            autoClose: 5000,
         });

         // Redirect to login page after successful verification
         navigate("/login");
      } catch (error) {
         console.error("Verification error:", error);

         // Show the error message from API or default message
         const errorMessage = error.message;

         toast.error(errorMessage, {
            position: "top-right",
            autoClose: 5000,
         });

         // Clear OTP fields on error
         setOtp(["", "", "", "", "", ""]);
         inputsRef.current[0]?.focus();
      } finally {
         setIsLoading(false);
      }
   };

   // Handle resend code
   const handleResendCode = async () => {
      if (resendTimer > 0 || isResending) return;

      setIsResending(true);
      try {
         const response = await sendVerificationEmail({ email });
         console.log("Resend response:", response);

         toast.success(response.message, {
            position: "top-right",
            autoClose: 5000,
         });

         // Reset timer and state
         setResendTimer(30);
         setOtp(["", "", "", "", "", ""]);
         inputsRef.current[0]?.focus();
      } catch (error) {
         console.error("Resend error:", error);
         toast.error(error.message, {
            position: "top-right",
            autoClose: 5000,
         });
      } finally {
         setIsResending(false);
      }
   };

   return (
      <div className="bg-[#0D2E35] flex flex-col lg:flex-row min-h-screen">
         {/* Left Image */}
         <div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center p-5">
            <img
               src="https://papu-ai-bucket.s3.us-west-2.amazonaws.com/landingPage/signinimage.png"
               alt="otp"
               className="w-full max-w-[620px] object-contain"
            />
         </div>

         {/* OTP Form Section */}
         <div className="bg-[#131417] flex flex-col items-center w-full lg:w-1/2 p-6 min-h-screen">
            <img
               className="w-40 md:w-52 object-contain mt-[40px]"
               src={logo}
               alt="popu.ai"
            />
            <p className="font-medium text-[14px] leading-[14px] tracking-normal font-[Poppins] text-[#FFFFFF] mt-6">
               Enter Code
            </p>
            <p className="text-[#FFFFFF] text-sm mt-2">
               Check your email and enter the code sent to {email}
            </p>

            {/* OTP Inputs */}
            <div
               className="flex space-x-2 mt-[40px] mb-6"
               onPaste={handlePaste}
            >
               {otp.map((digit, index) => (
                  <input
                     key={index}
                     id={`otp-${index}`}
                     type="text"
                     inputMode="numeric"
                     maxLength={1}
                     className="w-10 h-12 text-center bg-[#292A30] text-white rounded-[6px] text-xl outline-none focus:border-[#00C29F] border border-transparent transition-all duration-200"
                     ref={(el) => (inputsRef.current[index] = el)}
                     value={digit}
                     onChange={(e) => handleChange(e, index)}
                     onKeyDown={(e) => handleKeyDown(e, index)}
                  />
               ))}
            </div>

            {resendTimer > 0 ? (
               <p className="text-[#FFFFFF52] font-[500] text-[14px]">
                  Resend code in {resendTimer}s
               </p>
            ) : (
               <button
                  onClick={handleResendCode}
                  disabled={isResending}
                  className={`text-[#1CA990] font-[500] text-[14px] cursor-pointer hover:text-[#1AB08A] ${
                     isResending ? "opacity-50" : ""
                  }`}
               >
                  {isResending ? "Sending..." : "Resend code"}
               </button>
            )}

            <button
               onClick={handleVerify}
               disabled={isLoading}
               className={`cursor-pointer w-full max-w-[363px] bg-[#1CA990] my-12 rounded-[6px] py-3 text-[#FFFFFF] mb-[32px] transition-all duration-300 hover:bg-[#1AB08A] hover:shadow-lg hover:shadow-[#1CA990]/50 ${
                  isLoading ? "opacity-70" : ""
               }`}
            >
               {isLoading ? "Verifying..." : "Verify"}
            </button>
         </div>
      </div>
   );
};
