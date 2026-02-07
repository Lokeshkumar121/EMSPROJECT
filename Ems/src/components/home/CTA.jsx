import React from "react";

const CTA = ({ onLoginClick }) => {
  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl font-bold text-white mb-4">
        Ready to manage your team?
      </h2>

      <p className="text-gray-400 mb-8">
        Login now and take full control of your workflow.
      </p>

      <button 
      onClick={onLoginClick}
      className="px-8 py-3 bg-emerald-600 rounded-xl font-semibold hover:bg-emerald-700">
        Manage 
      </button>
    </section>
  );
};

export default CTA;
