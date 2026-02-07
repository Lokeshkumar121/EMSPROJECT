import React from "react";
import LiveDate from "../../livedate/LiveDate";

const features = [
  {
    title: "Admin Dashboard",
    desc: "Create, assign and monitor tasks easily"
  },
  {
    title: "Employee Tracking",
    desc: "Track employee task status in real time"
  },
  {
    title: "Secure Login",
    desc: "Role based authentication system"
  }
];

const Features = () => {
  return (
    <section className="py-20 px-8 bg-[#0b0b0b]">
      <h2 className="text-3xl font-bold text-center text-white mb-14">
        Features
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-[#111] p-8 rounded-2xl border border-gray-800 hover:border-emerald-500 transition"
          >
            <h3 className="text-xl font-semibold text-emerald-400 mb-3">
              {item.title}
            </h3>
            <p className="text-gray-400 text-sm">
              {item.desc}
            </p>
            
          </div>
          
          
        ))}
       
      </div>
    </section>
  );
};

export default Features;
