import React from "react";
import { toast } from "react-toastify";
import LiveDate from "../../livedate/LiveDate";

const Header = ({ changeUser , user}) => {

  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser") || "{}"
  );

  const logoutHandler = () => {
     // 1️⃣ Pehle toast
    toast.success("Logout Successfully 👋", {
      autoClose: 2000,
    });
    // 2️⃣ Thoda delay
    setTimeout(() => {
      localStorage.removeItem("loggedInUser");
      changeUser(null);   // ab safe hai
    }, 2000);
    // localStorage.removeItem("loggedInUser");
    // changeUser(null);
  };

  if (!user?.role) return null;

  return (
     <header className="w-full flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-8 py-4 bg-[#0f0f0f] border-b border-gray-800 gap-4 md:gap-0">
      
      {/* LEFT */}
      <div className="text-center md:text-left">
        <h1 className="text-lg sm:text-xl font-semibold text-white">
          Task Manager
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Welcome,{" "}
          <span className="text-emerald-400 font-medium">
            {user.name || `${user.firstName || ""} ${user.lastName || "kumardvnvlnvdfln"}` || "User"}
          </span>
        </p>
      </div>

      {/* CENTER - Live Date */}
      <div className="px-4 py-2 bg-gray-900 text-white rounded-xl border border-gray-700 shadow-sm font-medium">
        <LiveDate />
      </div>

      {/* RIGHT */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center md:text-right">
        <span className="px-3 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          {user.role === "admin" ? "Admin" : "Employee"}
        </span>

        <button
          onClick={logoutHandler}
          className="px-4 sm:px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700
                     text-sm font-semibold text-white transition active:scale-95"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
