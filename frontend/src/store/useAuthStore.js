import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3001/" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  onlineUsers: [],
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket: null,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");

      set({ authUser: response.data });
      get().connectSocket();
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
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  // login
  login: async (data) => {
    try {
      set({ isLoggingIn: true });

      const res = await axiosInstance.post("/auth/login", data);

      set({ authUser: res.data });
      toast.success(res.data.message);
      get().connectSocket();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // logout
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success(res.data.message);
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.error);
    }
  },

  // update profile
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);

      set({ authUser: res.data });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query : {
        userId : authUser._id
      }
    });
    socket.connect();
    set({socket})

    socket.on("getOnlineUsers", (userIds) => {
      set({onlineUsers : userIds})
    } )
  },
  disconnectSocket: () => {
    if(get().socket?.connected) get().socket.disconnect()
  },
}));
