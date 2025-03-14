import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSekeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const { getUsers, users, setSelectedUser, isUsersLoading, selectedUser } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <Users className="size-5" />
        <span className="font-medium hidden lg:block">Contacts</span>
      </div>

      {/* todo : Online filter toggle */}

      <div className="mt-3 hidden lg:flex items-center gap-2">
        <label className="cursor-pointer flex items-center gap-2"> 
          <input type="checkbox" checked={showOnlineOnly} className="checkbox checkbox-sm" onChange={(e) => setShowOnlineOnly(e.target.checked)}/>
          <span className="text-sm">Show online only</span>
        </label>
        <span className="text-xs text-zinc-500">({onlineUsers.length-1} online)</span>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => {
          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors
                ${
                  selectedUser?._id === user._id
                    ? "bg-base-300 ring-1 ring-base-300"
                    : ""
                }
                `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  className="size-12 rounded-full object-cover"
                  src={user.avatar || "./avatar.png"}
                  alt={user.name}
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
                )}
              </div>

              {/* only visible on lg screen */}
              <div className="hidden lg:block text-left-min-w-0">
                <div className="font-medium truncate">{user.name}</div>
                <div className="text-sm text-zinc-400">
                  {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
