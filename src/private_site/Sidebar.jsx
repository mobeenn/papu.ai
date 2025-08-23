import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiUser, FiLogOut, FiGrid, FiMenu, FiX } from "react-icons/fi";
import logo from "../assets/logo.svg";

export default function Sidebar() {
   const location = useLocation();
   const [isOpen, setIsOpen] = useState(false);

   const toggleSidebar = () => setIsOpen(!isOpen);

   const isActive = (path) => location.pathname === path;

   const baseButtonClasses =
      "flex items-center gap-3 my-2 cursor-pointer py-2 font-[400] text-[16px] px-3 w-full max-w-[180px] rounded-[8px]";
   const inactiveClasses = "bg-[#1c1d21] text-[#FFFFFF8F] hover:bg-[#292a30]";
   const activeClasses = "bg-[#292a30] text-white";

   // logout function
   const handleLogout = () => {
      // clear data from localStorage
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userEmail");

      toast.success("Logged out successfully", {
         position: "top-right",
         autoClose: 5000,
      });

      navigate("/login", { replace: true });
   };

   return (
      <>
         <div className="lg:hidden fixed top-3 left-1 z-50">
            <button
               onClick={toggleSidebar}
               className="bg-[#0c1c2c] p-2 rounded-lg shadow-lg hover:bg-[#1a2a3c] transition"
            >
               <FiMenu size={20} className="text-white" />
            </button>
         </div>
         {/* Sidebar */}
         <div
            className={`bg-[#1c1d21] text-white fixed top-0 left-0 h-full w-64 p-6 z-50 transform transition-transform duration-300 ease-in-out
               ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
               } lg:translate-x-0 lg:static lg:flex flex-col justify-between`}
         >
            {/* Cross icon inside sidebar - only visible on small screens */}
            <div className="flex justify-end items-center lg:hidden ">
               <button onClick={toggleSidebar}>
                  <FiX size={24} />
               </button>
            </div>

            {/* Top: Menu Items */}
            <div className="lg:block">
               <img src={logo} alt="Logo" className=" lg:block mb-8" />
               <ul className="space-y-4">
                  <li>
                     <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                        <button
                           className={`${baseButtonClasses} ${
                              isActive("/dashboard")
                                 ? activeClasses
                                 : inactiveClasses
                           }`}
                        >
                           <FiGrid size={20} /> Playground
                        </button>
                     </Link>
                  </li>
               </ul>
            </div>

            {/* Bottom: Profile + Logout */}
            <div className="flex flex-col ">
               <Link
                  to="/dashboard/subscription"
                  onClick={() => setIsOpen(false)}
               >
                  <button
                     className={`${baseButtonClasses} ${
                        isActive("/dashboard/subscription")
                           ? activeClasses
                           : inactiveClasses
                     }`}
                  >
                     <FiUser size={20} /> Subscription
                  </button>
               </Link>
               <Link to="/dashboard/profile" onClick={() => setIsOpen(false)}>
                  <button
                     className={`${baseButtonClasses} ${
                        isActive("/dashboard/profile")
                           ? activeClasses
                           : inactiveClasses
                     }`}
                  >
                     <FiUser size={20} /> Profile
                  </button>
               </Link>
               <Link
                  to="/login"
                  className="flex items-center gap-3 py-2 font-[400] text-[#FFFFFF8F] text-[16px] px-3 w-full max-w-[180px] rounded-[8px] hover:text-red-500"
                  onClick={handleLogout}
               >
                  <FiLogOut /> Logout
               </Link>
            </div>
         </div>
      </>
   );
}
