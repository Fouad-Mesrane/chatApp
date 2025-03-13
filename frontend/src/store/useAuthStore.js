import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");

      set({ authUser: response.data });
    } catch (error) {
      console.log("error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  // login
  login: async (data) => {
   try {
    set({isLoggingIn : true})
    const res = await axiosInstance.post("/auth/login", data)
    set({authUser: res.data})
    toast.success(res.data.message)
   } catch (error) {
    toast.error(error.response.data.message)
   } finally {
    set({isLoggingIn : false})
   }
  },

  // logout
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  // update profile
  updateProfile : async (data) => {
    set({isUpdatingProfile : true})
    try {

      const res = await axiosInstance.put("/auth/update-profile", data)
      set({authUser : res.data})
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.message)
      toast.error(error.response.data.message);
    } finally {
      set({isUpdatingProfile : false})
    }
  }
}));
