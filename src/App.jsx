import React from "react";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import { LandingPage } from "./public_site/LandingPage";
import { Signup } from "./auth/Signup";
import { Login } from "./auth/Login";
import { OtpVerification } from "./auth/OtpVerification";
import DashboardLayout from "./private_site/layout/DashboardLayout";
import Projects from "./private_site/Projects";
import Profile from "./private_site/Profile";
import { NotFound404 } from "./NotFound404";
import { ToastContainer } from "react-toastify";
import { RequireAuth } from "./auth/RouteGuards";
import { ForgotPassword } from "./auth/ForgotPassword";
import { Subscription } from "./private_site/Subscription";
import { ResetPassword } from "./auth/ResetPassword";
import PrivacyPolicy from "./public_site/PrivacyPolicy";
import TermsAndServices from "./public_site/TermsAndServices";

function App() {
   return (
      <>
         <ToastContainer />

         <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-and-services" element={<TermsAndServices />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/otp-verification" element={<OtpVerification />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />

            <Route
               path="/dashboard"
               element={
                  <RequireAuth>
                     <DashboardLayout />
                  </RequireAuth>
               }
            >
               <Route index element={<Projects />} />

               <Route path="profile" element={<Profile />} />
               <Route path="subscription" element={<Subscription />} />
            </Route>

            <Route path="*" element={<NotFound404 />} />
         </Routes>
      </>
   );
}

export default App;
