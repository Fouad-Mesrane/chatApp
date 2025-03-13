import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const [theme, setTheme] = useState("dark");

  const handleTheme = (e) => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <header className="bg-base-100 border-b border-base-200 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex justify-between items-center h-full">
          <Link
            to={"/"}
            className="flex items-center gap-2 hover:opacity-80 transition-all"
          >
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <MessageSquare className="w-5 text-white" />
            </div>
            <h1 className="text-lg font-bold">Chatly</h1>
          </Link>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              
              className="toggle"
              onChange={handleTheme}
              checked={theme === "dark" ? true : false}
            />

            {authUser && (
              <>
                <Link to={"/profile"} className="btn btn-sm gap-2">
                  <User className="size-5" />
                  <span className="hidden sm:inline"> Profile</span>
                </Link>
                <button className="btn btn-sm gap-2" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
