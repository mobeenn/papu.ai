import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export const Header = () => {
   const [isOpen, setIsOpen] = useState(false);
   const navLinks = [
      {
         label: "How It Works",
         href: "#",
         onClick: (e) => {
            e.preventDefault();
            document.getElementById("papu-ai-works")?.scrollIntoView({
               behavior: "smooth",
               block: "start",
            });
            setIsOpen(false);
         },
      },
      {
         label: "Use Cases",
         href: "#",
         onClick: (e) => {
            e.preventDefault();
            document.getElementById("use-cases")?.scrollIntoView({
               behavior: "smooth",
               block: "start",
            });
            setIsOpen(false);
         },
      },
      {
         label: "Features",
         href: "#",
         onClick: (e) => {
            e.preventDefault();
            document.getElementById("features")?.scrollIntoView({
               behavior: "smooth",
               block: "start",
            });
            setIsOpen(false);
         },
      },
      {
         label: "Testimonials",
         href: "#",
         onClick: (e) => {
            e.preventDefault();
            document.getElementById("testimonials")?.scrollIntoView({
               behavior: "smooth",
               block: "start",
            });
            setIsOpen(false);
         },
      },
      { label: "Term of Service", href: "terms-and-services" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      {
         label: "Pricing",
         href: "#",
         onClick: (e) => {
            e.preventDefault();
            document.getElementById("pricing")?.scrollIntoView({
               behavior: "smooth",
               block: "start",
            });
            setIsOpen(false);
         },
      },
      {
         label: "FAQs",
         href: "#",
         onClick: (e) => {
            e.preventDefault();
            document.getElementById("faqs")?.scrollIntoView({
               behavior: "smooth",
               block: "start",
            });
            setIsOpen(false);
         },
      },
   ];
   return (
      <>
         {/* Navbar */}
         <header className="bg-[#090C1B03] text-[#FFFFFF80] px-4 py-4 shadow-md relative top-0 left-0 right-0">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
               {/* Logo */}
               <div className="flex items-center cursor-pointer">
                  <img src={logo} alt="popu.ai" />
               </div>

               {/* Desktop Menu */}
               <nav className="hidden lg:flex items-center space-x-6">
                  {navLinks.map((link) => (
                     <a
                        key={link.label}
                        href={link.href}
                        onClick={link.onClick}
                        className="text-nowrap font-poppins text-[16px] font-medium leading-6 tracking-normal text-right hover:text-[#ff7a01]  transition duration-300 ease-in-out"
                     >
                        {link.label}
                     </a>
                  ))}
               </nav>
               <Link to="/login">
                  <button className="hidden lg:flex items ml-4 bg-[#1ca990] hover:bg-teal-600 text-white px-4 py-1  rounded-[8px] cursor-pointer">
                     Login
                  </button>
               </Link>

               {/* Mobile Menu Button */}
               <div className="lg:hidden">
                  <button onClick={() => setIsOpen(true)}>
                     <FiMenu className="w-6 h-6 text-white" />
                  </button>
               </div>
            </div>

            {/* Mobile Sidebar */}
            <div
               className={`fixed top-0 left-0 h-full w-64 bg-[#1E1E35] shadow-lg transform ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
               } transition-transform duration-300 ease-in-out z-50`}
            >
               <div className="flex justify-between items-center p-4 border-b border-gray-700">
                  <div className="mx-auto cursor-pointer">
                     <img src={logo} alt="popu.ai" />
                  </div>
                  <button onClick={() => setIsOpen(false)}>
                     <FiX className="w-6 h-6 text-white" />
                  </button>
               </div>
               <nav className="flex flex-col p-8 gap-2.5 space-y-4">
                  {navLinks.map((link) => (
                     <a
                        key={link.label}
                        href={link.href}
                        onClick={link.onClick}
                        className="font-poppins text-center font-medium leading-6 tracking-normal hover:text-[#ff7a01] hover:underline transition duration-300 ease-in-out"
                     >
                        {link.label}
                     </a>
                  ))}
                  <Link to="/login">
                     <button className="bg-[#1ca990] hover:bg-teal-600 text-white w-[80px] ml-14 py-1 rounded-[8px] cursor-pointer">
                        Login
                     </button>
                  </Link>
               </nav>
            </div>

            {/* Overlay */}
            {isOpen && (
               <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                  onClick={() => setIsOpen(false)}
               ></div>
            )}
         </header>
      </>
   );
};
