import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../assets/logo.svg";

export const ResetPassword = () => {
   const [showPassword, setShowPassword] = useState(false);
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [email, setEmail] = useState("");
   const [errors, setErrors] = useState({});
   const navigate = useNavigate();
   const location = useLocation();

   // Get email from URL query params
   useEffect(() => {
      const params = new URLSearchParams(location.search);
      const emailParam = params.get("email");
      if (!emailParam) {
         // toast.error("Invalid reset link.");
         navigate("*");
      } else {
         setEmail(emailParam);
      }
   }, [location, navigate]);

   // Form validation
   const validate = () => {
      const newErrors = {};
      if (!password) newErrors.password = "Password is required.";
      if (!confirmPassword)
         newErrors.confirmPassword = "Confirm your password.";
      else if (password !== confirmPassword)
         newErrors.confirmPassword = "Passwords do not match.";
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validate()) return;

      try {
         const response = await axios.post("your_api_urlupdate-user", {
            email,
            password,
         });
         toast.success(
            response.data.message || "Password updated successfully!"
         );
         navigate("/login");
      } catch (error) {
         toast.error(
            error?.response?.data?.message || "Failed to reset password."
         );
      }
   };

   return (
      <>
         <div className="flex flex-col items-center justify-between lg:flex-row">
            <div className="bg-[#0d2c33] hidden lg:flex w-full h-screen justify-center items-center p-5">
               <img
                  src="https://papu-ai-bucket.s3.us-west-2.amazonaws.com/landingPage/signinimage.png"
                  alt="signin"
                  className="w-full max-w-[620px] object-contain"
               />
            </div>

            <div className="flex flex-col justify-center items-center bg-[#1a1a1a] h-screen w-full max-w-[1000px]">
               <div className="w-full max-w-[420px] space-y-5">
                  <img
                     className="w-40 md:w-52 object-contain mx-auto "
                     src={logo}
                     alt="popu.ai"
                  />
                  <h2 className="text-white text-2xl font-semibold mb-2">
                     Reset Password
                  </h2>
                  <div className="flex flex-col gap-6 items-center my-[20px] mx-3">
                     {/* Password Field */}
                     <div className="relative mx-2">
                        <input
                           type={showPassword ? "text" : "password"}
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder="New Password"
                           className="w-full bg-[#292A30] text-white py-2 px-3 rounded focus:outline-none border border-transparent focus:border-[#00C29F]"
                        />
                        <div
                           className="absolute right-3 top-2.5 text-white cursor-pointer"
                           onClick={() => setShowPassword(!showPassword)}
                        >
                           {showPassword ? (
                              <FiEyeOff size={18} />
                           ) : (
                              <FiEye size={18} />
                           )}
                        </div>
                        {errors.password && (
                           <p className="text-red-500 text-sm mt-1">
                              {errors.password}
                           </p>
                        )}
                     </div>

                     {/* Confirm Password Field */}
                     <div className="relative">
                        <input
                           type={showPassword ? "text" : "password"}
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           placeholder="Confirm Password"
                           className="w-full bg-[#292A30] text-white py-2 px-3 rounded focus:outline-none border border-transparent focus:border-[#00C29F]"
                        />
                        <div
                           className="absolute right-3 top-2.5 text-white cursor-pointer"
                           onClick={() => setShowPassword(!showPassword)}
                        >
                           {showPassword ? (
                              <FiEyeOff size={18} />
                           ) : (
                              <FiEye size={18} />
                           )}
                        </div>
                        {errors.confirmPassword && (
                           <p className="text-red-500 text-sm mt-1">
                              {errors.confirmPassword}
                           </p>
                        )}
                     </div>
                  </div>
                  <button
                     onClick={handleSubmit}
                     className="w-full bg-[#00C29F] hover:bg-[#00a58c] text-white py-2 rounded"
                  >
                     Reset Password
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};
