import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");

      set({ users: res.data });
    } catch (error) {
      console.log("error in getUsers ", error);
      toast.error(error.response.data.messages);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      console.log(res.data);
      set({ messages: res.data });
    } catch (error) {
      console.log("error in getMessages ", error);
      toast.error(error.response.data.messages);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    // this is to get from within the state
    const { selectedUser, messages } = get();

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      console.log(res);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  listenToMessages: () => {
    const { selectedUser } = get();

    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      // bug fix
// this Prevents updating the UI with messages from users who are not currently selected
      if (newMessage.senderId !== selectedUser._id) return;

      set({ messages: [...get().messages, newMessage] });
    });
  },

  unlistenFromMessages: () => {
    const socket = useAuthStore.getState().socket;

    socket.off("newMessage");
  },
}));
