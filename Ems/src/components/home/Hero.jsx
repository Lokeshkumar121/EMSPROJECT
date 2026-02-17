import React from "react";
import LiveDate from "../../livedate/LiveDate";

const Hero = () => {
  return (
    <section
      className="relative text-center py-24 px-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://cdn.prod.website-files.com/6209ea9aee1f965d7fce7c19/649a89c89a17e113b6f49621_empployee%20mngment%20app%20(1).jpg')",
      }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 "></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Employee Management System
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Manage employees, assign tasks, track progress and boost productivity —
          all in one powerful dashboard.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <button className="px-6 py-3 bg-emerald-600 rounded-xl font-semibold hover:bg-emerald-700">
            Get Started
          </button>

          <button className="px-6 py-3 border border-gray-600 rounded-xl text-gray-300 hover:bg-gray-800">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
