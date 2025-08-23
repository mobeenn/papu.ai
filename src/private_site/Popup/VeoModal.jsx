import VeoGeneratorUI from "./VeoGeneratorUI";
import { CgClose } from "react-icons/cg";

export default function VeoModal({ onClose }) {
   return (
      <div className="fixed inset-0 bg-black/50 bg-opacity-75 flex justify-center items-center z-50 mx-2">
         <div className="bg-[#1c1d21] rounded-2xl p-6 max-w-[800px] w-full relative">
            <button
               className="cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-red-500"
               onClick={onClose}
            >
               <CgClose size={24} />
            </button>

            <VeoGeneratorUI />
         </div>
      </div>
   );
}
