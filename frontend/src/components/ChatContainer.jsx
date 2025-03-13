import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const { getMessages, messages, isMessagesLoading, selectedUser } =
    useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [getMessages, selectedUser._id]);

  if (isMessagesLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <ChatHeader />
      <p>message ...</p>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
