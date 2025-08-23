import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../api/apiService";
import { googleSignIn } from "../services/authService";

export const Login = () => {
   const navigate = useNavigate();
   const [showPassword, setShowPassword] = useState(false);
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });
   const [errors, setErrors] = useState({
      email: "",
      password: "",
   });
   const [isLoading, setIsLoading] = useState(false);
   const [loading, setLoading] = useState(false);

   const handleSignupClick = () => {
      navigate("/signup");
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));

      // Clear error when user starts typing
      if (errors[name]) {
         setErrors((prev) => ({
            ...prev,
            [name]: "",
         }));
      }
   };

   const validateForm = () => {
      let valid = true;
      const newErrors = {
         email: "",
         password: "",
      };

      if (!formData.email) {
         newErrors.email = "Email is required";
         valid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
         newErrors.email = "Email is invalid";
         valid = false;
      }

      if (!formData.password) {
         newErrors.password = "Password is required";
         valid = false;
      }

      setErrors(newErrors);
      return valid;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      setIsLoading(true);
      try {
         const payload = {
            email: formData.email,
            password: formData.password,
         };

         console.log("Submitting payload:", payload);

         const response = await loginUser(payload);
         console.log("API Response:", response);

         // Check if we got a valid response (even if it's an error response)
         if (!response) {
            throw new Error("No response received from server");
         }

         // Successful login case
         if (response.message && response.user_email) {
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("userEmail", response.user_email);

            toast.success(response.message, {
               position: "top-right",
               autoClose: 5000,
            });

            navigate("/dashboard", { replace: true });
            return;
         }

         // Handle case where credentials are wrong but API returns 200
         if (response.error) {
            throw new Error(response.error);
         }

         // If we get here, the response format is unexpected
         throw new Error("Unexpected response format from server");
      } catch (error) {
         console.error("Login error:", error);

         // Clear any partial authentication
         localStorage.removeItem("isAuthenticated");
         localStorage.removeItem("userEmail");

         // Show appropriate error message
         toast.error(error.message || "Login failed. Please try again.", {
            position: "top-right",
            autoClose: 5000,
         });
      } finally {
         setIsLoading(false);
      }
   };
   const handleGoogleSignIn = async () => {
      setLoading(true);
      const { success, user, error } = await googleSignIn();
      setLoading(false);

      if (success) {
         localStorage.setItem("isAuthenticated", "true");
         localStorage.setItem("userEmail", user.email);
         toast.success("Login successful!");
         navigate("/dashboard", { replace: true });
         onSuccess?.(user);
      } else {
         toast.error(error || "Login failed");
         onerror?.(error);
      }
   };

   return (
      <>
         <div className="bg-[#0D2E35] flex flex-col lg:flex-row min-h-screen">
            {/* Left Side Image Section - Hidden on md and smaller */}
            <div className="hidden lg:flex w-full lg:w-1/2 justify-center items-center p-5">
               <img
                  src="your_api_url"
                  alt="signin"
                  className="w-full max-w-[620px] object-contain"
               />
            </div>

            {/* Right Side Form Section */}
            <div className="bg-[#131417] flex flex-col items-center w-full lg:w-1/2 p-6 min-h-screen">
               <img
                  className="w-40 md:w-52 object-contain mt-[40px]"
                  src={logo}
                  alt="popu.ai"
               />
               <p className="font-medium text-[14px] leading-[14px] tracking-normal text-center font-[Poppins] text-[#FFFFFF]">
                  Create AI-Powered Talking Avatars Instantly!
               </p>

               {/* Form starts here */}
               <form onSubmit={handleSubmit} className="w-full max-w-[363px]">
                  {/* email */}
                  <div className="mt-[40px]">
                     <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="font-[400] text-[16px] leading-[24px] align-middle text-[#FFFFFF52] py-2 px-3 rounded-[6px] w-full bg-[#292A30] border border-transparent focus:outline-none focus:border-[#00C29F]"
                     />
                     {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                           {errors.email}
                        </p>
                     )}
                  </div>

                  {/* password field */}
                  <div className="relative my-[24px]">
                     <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="font-[400] text-[16px] leading-[24px] align-middle text-[#FFFFFF52] py-2 px-3 rounded-[6px] w-full bg-[#292A30] border border-transparent focus:outline-none focus:border-[#00C29F]"
                     />
                     <div
                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-[#FFFFFF99]"
                        onClick={() => setShowPassword(!showPassword)}
                     >
                        {showPassword ? (
                           <FiEyeOff size={20} />
                        ) : (
                           <FiEye size={20} />
                        )}
                     </div>
                     {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                           {errors.password}
                        </p>
                     )}
                  </div>
                  <Link to="/forgot-password">
                     <p className="text-[15px] font-[500] text-white text-right -mt-5 mb-4 hover:text-[#ff7d06]">
                        Forgot Password
                     </p>
                  </Link>

                  {/* continue button */}
                  <button
                     type="submit"
                     disabled={isLoading}
                     className={`cursor-pointer w-full bg-[#1CA990] rounded-[6px] py-3 text-[#FFFFFF] mb-[32px] transition-all duration-300 hover:bg-[#1AB08A] hover:shadow-lg hover:shadow-[#1CA990]/50 ${
                        isLoading ? "opacity-70" : ""
                     }`}
                  >
                     {isLoading ? "Logging in..." : "Continue"}
                  </button>
               </form>

               <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="cursor-pointer w-full max-w-[363px] bg-[#292A30] rounded-[6px] py-3 text-[#FFFFFF52] border border-transparent transition-all duration-300 hover:text-[#00C29F] hover:border-[#00C29F]"
               >
                  {loading ? (
                     <span>Signing in...</span>
                  ) : (
                     <>
                        <span>Continue with Google</span>
                     </>
                  )}
               </button>

               <p className="font-medium text-[14px] leading-[14px] tracking-normal text-center font-[Poppins] text-[#FFFFFF] mt-9">
                  Don't have an account?
               </p>
               <button
                  onClick={handleSignupClick}
                  className="relative overflow-hidden group cursor-pointer mt-6 font-medium text-[18px] leading-[28px] tracking-normal font-[Poppins] w-full max-w-[123px] border border-[#4c4c4f] text-[#FFFFFF52] rounded-[8px] py-[4px] transition-all duration-300 hover:text-[#FF7F0B] hover:border-[#FF7F0B]"
               >
                  Sign Up
                  <span className="absolute inset-0 h-full w-full scale-y-0 origin-top bg-[#FF7F0B1A] transition-transform duration-300 group-hover:scale-y-100 z-[-1] rounded-[8px]"></span>
               </button>
            </div>
         </div>
      </>
   );
};
