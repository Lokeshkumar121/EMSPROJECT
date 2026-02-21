

const Hero = () => {
  return (
    <section
      className="relative text-center py-32 px-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://cdn.prod.website-files.com/6209ea9aee1f965d7fce7c19/649a89c89a17e113b6f49621_empployee%20mngment%20app%20(1).jpg')",
      }}
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
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