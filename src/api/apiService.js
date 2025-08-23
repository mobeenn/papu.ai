// src/services/apiService.js
import axios from "axios";

const BASE_URL = "your_base_url";

export const signupUser = async (payload) => {
   try {
      const response = await axios.post(
         `${BASE_URL}/your_api_endpoint`,
         payload
      );
      return response.data;
   } catch (error) {
      if (error.response) {
         throw error;
      }
      throw new Error("Network error during signup");
   }
};
export const sendVerificationEmail = async (emailData) => {
   try {
      const response = await axios.post(
         `${BASE_URL}/your_api_endpoint`,
         emailData
      );
      return response.data;
   } catch (error) {
      if (error.response) {
         throw error.response.data;
      }
      throw error;
   }
};
export const verifyOtp = async (payload) => {
   try {
      const response = await axios.post(
         `${BASE_URL}/your_api_endpoint`,
         payload
      );

      if (response.data.error) {
         throw new Error(response.data.error);
      }

      return response.data;
   } catch (error) {
      if (error.response?.data?.error) {
         throw new Error(error.response.data.error);
      }
      throw error;
   }
};
export const loginUser = async (payload) => {
   try {
      const response = await axios.post(
         `${BASE_URL}/your_api_endpoint`,
         payload,
         {
            headers: {
               "Content-Type": "application/json",
            },
         }
      );

      return response.data;
   } catch (error) {
      // Axios error handling
      if (error.response) {
         throw new Error(
            error.response.data.message ||
               error.response.data.error ||
               "Login failed"
         );
      } else if (error.request) {
         throw new Error("No response from server");
      } else {
         throw new Error("Request setup error");
      }
   }
};
export const getUser = async (email) => {
   try {
      const response = await axios.post(`${BASE_URL}/your_api_endpoint`, {
         email,
      });
      return response.data;
   } catch (error) {
      if (error.response?.data) {
         throw error.response.data;
      }
      throw new Error("Failed to fetch user credits");
   }
};
// update user
export const updateUser = async (payload) => {
   try {
      const res = await axios.post(`${BASE_URL}/your_api_endpoint`, payload);
      console.log("🚀 ~ updateUser ~ res:", res);
      return res.data;
   } catch (error) {
      console.error("API Error (updateUser):", error);
      throw error;
   }
};
export const deleteAccount = async (email) => {
   try {
      const response = await axios.post(`${BASE_URL}/your_api_endpoint`, {
         email,
      });
      return response.data;
   } catch (error) {
      throw error.response?.data || error.message;
   }
};
// Stripe Integration
export const createCheckoutSession = async (payload) => {
   try {
      const response = await axios.post(
         `${BASE_URL}/your_api_endpoint`,
         payload
      );
      return response.data;
   } catch (error) {
      console.error("API Error (createCheckoutSession):", error);
      throw error;
   }
};

export const createPortalSession = async ({ email, session_id }) => {
   const response = await axios.post(`${BASE_URL}/your_api_endpoint`, {
      email,
      session_id,
   });
   return response.data;
};
// cancel subscription
export const cancelSubscription = async (data) => {
   const response = await axios.post("your_api_endpoint", data);
   return response.data;
};
// veo video integration
export const generateVeoVideo = async (email, prompt, negativePrompt = "") => {
   try {
      const res = await axios.post(`${BASE_URL}/your_api_endpoint`, {
         email,
         prompt,
         negative_prompt: negativePrompt || "",
      });
      return res.data;
   } catch (error) {
      console.error("API Error (generateVeoVideo):", error);
      throw error;
   }
};

export const getVideoStatus = async (operationName) => {
   try {
      const res = await axios.post(`${BASE_URL}/your_api_endpoint`, {
         operation_name: operationName,
      });
      return res.data;
   } catch (error) {
      console.error("API Error (getVideoStatus):", error);
      throw error;
   }
};

export const saveVideo = async (payload) => {
   try {
      const res = await axios.post(`${BASE_URL}/your_api_endpoint`, payload);
      console.log("🚀 ~ saveVideo ~ res:", res);
      return res.data;
   } catch (error) {
      console.error("API Error (saveVideo):", {
         message: error.message,
         status: error.response?.status,
         data: error.response?.data,
      });
      throw error; // Re-throw for handling in caller
   }
};
