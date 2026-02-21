import React, { useState, useEffect } from "react";

const images = [
  "https://img.freepik.com/premium-photo/portrait-smiling-software-engineer-working-computer-office-it-company_236854-46003.jpg",
  "https://www.alueducation.com/wp-content/uploads/2025/07/software-engr.webp",
  "https://media.istockphoto.com/id/1491192988/photo/working-towards-a-bright-future.jpg?s=612x612&w=0&k=20&c=8l6p4Br4Jg0HiPTGVsc1V4r6melejSNF2lh3vFhnwXs=",
  "https://media.sciencephoto.com/f0/43/32/01/f0433201-800px-wm.jpg",
  "https://www.dice.com/binaries/medium/content/gallery/dice/insights/2022/09/shutterstock_2079730714.jpg",
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative text-center py-32 px-6 h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      ></div>

      {/* Dark Overlay with opacity + blur */}
      <div className="absolute inset-0 bg-black/50 "></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Employee Management System
        </h1>

        <p className="text-gray-300 max-w-3xl mx-auto text-lg sm:text-xl md:text-2xl mb-10">
          Manage employees, assign tasks, track progress, and boost productivity —
          all in one powerful, easy-to-use dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:scale-105">
            Get Started
          </button>

          <button className="px-8 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;