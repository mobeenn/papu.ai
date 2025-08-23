import React, { useEffect, useState } from "react";
import badge_Projects from "../assets/badge_Projects.svg";
import { cancelSubscription, deleteAccount, getUser } from "../api/apiService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import deleteIcon from "../assets/delete_sweep.svg";
import axios from "axios";

export default function Profile() {
   const [paymentHistory, setPaymentHistory] = useState([]);
   const [plan, setPlan] = useState("");
   const [email, setEmail] = useState("");
   const [price, setPrice] = useState("");
   const [showModal, setShowModal] = useState(false);
   const [activeTab, setActiveTab] = useState("profile");
   const [cancelSubscriptionStatus, setCancelSubscriptionStatus] =
      useState(false);
   const [isCancelling, setIsCancelling] = useState(false);
   const [userData, setUserData] = useState(null); // Store complete user data
   const navigate = useNavigate();

   // Format Unix timestamp to readable date
   const formatDate = (timestamp) => {
      if (!timestamp) return "—";
      const date = new Date(Number(timestamp) * 1000);
      return date.toLocaleDateString("en-US", {
         year: "numeric",
         month: "long",
         day: "numeric",
      });
   };

   // get user data
   useEffect(() => {
      const fetchUserData = async () => {
         try {
            const userEmail = localStorage.getItem("userEmail");
            const data = await getUser(userEmail);
            console.log("User data:", data);
            setUserData(data);
            setPlan(data.plan);
            setEmail(data.email);
            setPrice(data.price);
            setCancelSubscriptionStatus(data.cancel_subscription || false);
         } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Failed to load user data");
         }
      };

      fetchUserData();
   }, []);

   // fetch Payment History
   useEffect(() => {
      const fetchPaymentHistory = async () => {
         try {
            const email = localStorage.getItem("userEmail");
            const res = await axios.post("your_api_urlpayment-history", {
               email,
            });
            if (Array.isArray(res.data)) {
               setPaymentHistory(res.data);
            }
         } catch (error) {
            console.error("Error fetching payment history:", error);
         }
      };

      fetchPaymentHistory();
   }, []);

   // Handle subscription cancellation
   const handleCancelSubscription = async () => {
      try {
         setIsCancelling(true);
         const email = localStorage.getItem("userEmail");
         const response = await cancelSubscription({ email });

         if (response.message) {
            toast.success(response.message);

            // Refetch user data to get updated cancellation dates
            const updatedUser = await getUser(email);
            setUserData(updatedUser);
            setPlan(updatedUser.plan);
            setCancelSubscriptionStatus(
               updatedUser.cancel_subscription || false
            );
         }
      } catch (error) {
         toast.error(
            error.response?.data?.message || "Failed to cancel subscription"
         );
      } finally {
         setIsCancelling(false);
      }
   };

   const handleCancel = () => {
      setShowModal(false);
   };

   const handleDelete = () => {
      setShowModal(true);
   };

   const handleConfirm = async () => {
      setShowModal(false);
      try {
         const email = localStorage.getItem("userEmail");
         if (!email) {
            toast.error("Email not found in localStorage.");
            return;
         }

         const res = await deleteAccount(email);
         toast.success(res.message || "Account deleted successfully!");
         localStorage.clear();
         navigate("/login");
      } catch (error) {
         console.error("Delete error:", error);
         toast.error(error.message || "Failed to delete account.");
      }
   };

   return (
      <div className="text-white bg-[#131417] py-5 rounded-[32px] flex justify-center items-center flex-col">
         {/* Tab Section */}
         <div className="bg-[#292a30] w-[300px] sm:mr-[100px] sm:w-full sm:max-w-[468px] rounded-[8px] flex justify-between p-1">
            <button
               onClick={() => setActiveTab("profile")}
               className={`w-full max-w-[230px] py-2 rounded-[6px] text-[14px] font-[500] ${
                  activeTab === "profile"
                     ? "bg-[#FFFFFF] text-[#292A30]"
                     : "text-[#8F8F8F] hover:bg-[#1CA990]/10"
               }`}
            >
               Profile
            </button>
            <button
               onClick={() => setActiveTab("payment")}
               className={`w-full max-w-[230px] py-2 rounded-[6px] text-[14px] font-[500] ${
                  activeTab === "payment"
                     ? "bg-[#FFFFFF] text-[#292A30]"
                     : "text-[#8F8F8F] hover:bg-[#1CA990]/10"
               }`}
            >
               Payment History
            </button>
         </div>

         {/* Conditional Content */}
         {activeTab === "profile" ? (
            <>
               <div>
                  <img
                     src={badge_Projects}
                     alt="Badge"
                     className="mt-3 mb-3 mx-4"
                  />
                  <p className="text-[#8F8F8F] font-[400] mx-4 text-[14px] leading-[24px] my-4">
                     Sign in method
                  </p>
                  <input
                     type="email"
                     className="bg-[#292a30] py-4 px-3 w-[300px] mx-5 sm:w-[460px] rounded-[8px] mb-6"
                     placeholder="Email"
                     value={email}
                     readOnly
                  />
                  <p className="text-[#8F8F8F] font-[400] mx-4 text-[14px] leading-[24px] mb-4">
                     Subscription
                  </p>
                  <div className="bg-[#292a30] py-4 px-4 w-[300px] mx-5 sm:w-[460px] rounded-[8px] mb-4">
                     <div className="flex justify-between mb-2">
                        <p>Plan</p>
                        <p className="capitalize">{plan}</p>
                     </div>
                     <div className="flex justify-between mb-2">
                        <p>Price</p>
                        <p>${price || "0"}</p>
                     </div>
                     {userData?.cancel_subscription ||
                        (userData?.cancellation_date && (
                           <div className="flex justify-between">
                              <p>Cancellation Date</p>
                              <p>{formatDate(userData.cancellation_date)}</p>
                           </div>
                        ))}
                     {userData?.cancel_subscription &&
                        userData?.next_billing_date && (
                           <p className=" text-3 text-[#f0f0f0] leading-[24px]">
                              Your subscription is scheduled for cancellation on{" "}
                              <span className="text-[#ff810e]">
                                 {formatDate(userData.next_billing_date)}
                              </span>{" "}
                              . After this date, your remaining usage capacity
                              will end. To continue using our services, please
                              resubscribe.
                           </p>
                        )}
                  </div>

                  <div>
                     {/* Only show cancel button if user has paid plan and not already cancelled */}
                     {plan &&
                        plan.toLowerCase() !== "free" &&
                        !userData?.cancel_subscription && (
                           <button
                              onClick={handleCancelSubscription}
                              disabled={isCancelling}
                              className={`py-4 mx-5 rounded-[8px] cursor-pointer w-[300px] sm:w-full sm:max-w-[450px] font-[500] text-[14px] text-[#FFFFFF] mb-6 bg-[#FF7A01] ${
                                 isCancelling ? "opacity-70" : ""
                              }`}
                           >
                              {isCancelling
                                 ? "Processing..."
                                 : "Cancel Request"}
                           </button>
                        )}
                  </div>
                  <Link to="/dashboard/subscription">
                     <button className="py-4 mx-5 rounded-[8px] cursor-pointer w-[300px] sm:w-full sm:max-w-[450px] font-[500] text-[14px] text-[#FFFFFF] bg-[#1CA990] hover:bg-[#168d79] mb-6">
                        Subscribe
                     </button>
                  </Link>

                  <button
                     onClick={handleDelete}
                     className="py-4 rounded-[8px] cursor-pointer w-[300px] sm:w-full sm:max-w-[450px] font-[400] text-[16px] text-[#DC393B] bg-[#131417] mb-9 mx-5 border-[1px] border-[#292A30] hover:bg-[#292a30]"
                  >
                     Delete Account
                  </button>
               </div>
            </>
         ) : (
            <div className="text-[#b0b0b0] w-full max-w-[700px] text-nowrap text-[16px]">
               {paymentHistory && (
                  <div className=" max-h-[500px] overflow-y-auto scrollbar-hide hover:scrollbar-default  mt-3 ">
                     <table className=" w-full max-w-[900px] border border-[#435fff] text-white text-sm rounded-xl overflow-hidden ">
                        <thead className="rounded-[9px] ">
                           <tr className="bg-[radial-gradient(53.57%_50%_at_50%_50%,_#0D2E35_0%,_#0A171B_100%)]">
                              <th className="py-3 px-4 border-b rounded-tl-xl border-[#292A30]">
                                 Plan
                              </th>
                              <th className="py-3 px-4 border-b border-[#292A30]">
                                 Price
                              </th>
                              <th className="py-3 px-4 border-b border-[#292A30]">
                                 Currency
                              </th>
                              <th className="py-3 px-4 border-b border-[#292A30]">
                                 Date
                              </th>
                              <th className="py-3 px-4 border-b border-[#292A30] rounded-tr-xl">
                                 Status
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           {paymentHistory.map((item, index) => (
                              <tr
                                 key={index}
                                 className="hover:bg-[#1c1c1e] transition-colors duration-200"
                              >
                                 <td className="py-2 px-4 border-b border-[#292A30] capitalize">
                                    {item.plan || "—"}
                                 </td>
                                 <td className="py-2 px-4 text-center border-b border-[#292A30]">
                                    {item.price ? `$${item.price}` : "—"}
                                 </td>
                                 <td className="py-2 px-4 text-center border-b border-[#292A30] uppercase">
                                    {item.currency || "—"}
                                 </td>
                                 <td className="py-2 px-4 text-center border-b border-[#292A30]">
                                    {item.date ? formatDate(item.date) : "—"}
                                 </td>
                                 <td className="py-2 px-4 text-center border-b border-[#292A30] capitalize">
                                    <span
                                       className={`px-3 py-1 rounded-full text-sm font-medium ${
                                          item.status === "succeeded"
                                             ? "bg-green-600 text-white"
                                             : "bg-gray-600 text-white"
                                       }`}
                                    >
                                       {item.status || "—"}
                                    </span>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               )}
            </div>
         )}

         {/* Delete Confirmation Modal */}
         {showModal && (
            <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
               <div className="bg-[#1c1d21] p-6 rounded-[16px] w-[90%] max-w-[420px] text-center">
                  <div className="flex items-center gap-3 mb-2">
                     <img src={deleteIcon} alt="Delete" className="w-5" />
                     <h2 className="text-[20px] font-semibold text-white">
                        Are you sure?
                     </h2>
                  </div>
                  <p className="text-[#FFFFFF] text-[14px] leading-[22px] mb-6">
                     This action will permanently delete your account and all
                     associated data. This cannot be undone.
                  </p>
                  <div className="flex justify-end gap-4">
                     <button
                        onClick={handleCancel}
                        className="px-4 py-2 rounded-[8px] bg-[#3F414B] text-white hover:bg-[#3a3b42] cursor-pointer"
                     >
                        Cancel
                     </button>
                     <button
                        onClick={handleConfirm}
                        className="px-4 py-2 rounded-[8px] bg-[#DC393B] text-white hover:bg-[#b5302f] cursor-pointer"
                     >
                        Confirm
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
