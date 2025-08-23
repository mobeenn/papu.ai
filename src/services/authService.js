import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase/config";
import axios from "axios";
const api = axios.create({
   baseURL: "YOUR_BASE_URL",
   headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json",
   },
   withCredentials: false,
});

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const googleSignIn = async () => {
   try {
      const result = await signInWithPopup(auth, googleProvider);
      const response = await api.post("/YOUR_API_END_POINT", {
         email: result.user.email,
         google_login: true,
      });

      return {
         success: true,
         user: {
            email: result.user.email,
            ...response.data,
         },
      };
   } catch (error) {
      console.error("Google Sign-In Error:", error);
      return {
         success: false,
         error: error.response?.data?.message || error.message,
      };
   }
};
