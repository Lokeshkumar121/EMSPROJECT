import React from "react";
import LiveDate from "../../livedate/LiveDate";


const Header = ({ onLoginClick }) => {
  return (
    <header className="w-full flex justify-between items-center px-8 py-5 bg-[#0f0f0f] border-b border-gray-800">
      <h1 className="text-2xl font-bold text-emerald-400">
        EMS
      </h1>

      <nav className="flex gap-6 text-gray-300">
        <div className="px-6 py-3 bg-transparent hover:bg-gray-900 text-white rounded-xl border border-gray-700 shadow-sm font-medium">
                 <LiveDate />
               </div>
        
      </nav>
      <button
        onClick={onLoginClick}
        className="px-5 py-2 bg-emerald-600 rounded-lg hover:bg-emerald-700 text-sm font-semibold"
      >
        Login
      </button>
    </header>
  );
};

export default Header;
