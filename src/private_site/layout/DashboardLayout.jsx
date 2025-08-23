import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

export default function DashboardLayout() {
   return (
      <div className="flex h-screen bg-[#1c1d21] text-white">
         <Sidebar />

         <main className="flex-1 bg-[#131417] min-h-screen rounded-[32px] p-6 sm:p-4 overflow-y-auto">
            <Outlet />
         </main>
      </div>
   );
}
