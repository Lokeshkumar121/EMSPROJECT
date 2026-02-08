import React, { useContext } from 'react'
import { Authcontext } from '../../context/AuthProvider'
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Alltask = () => {
  const { userData , deleteEmployee} = useContext(Authcontext);

  // 🔹 Filter only employees
  //  const employeesOnly = userData.filter(emp => emp.role === "employee");
  const employeesOnly = userData.filter(emp => emp.email !== "admin@gmail.com");

  console.log("All users:", userData);

  if (!employeesOnly || employeesOnly.length === 0) {
    return <div className="text-gray-400 text-center mt-6">No employees found</div>;
  }

  return (
    <div className="mt-6 bg-[#111] border border-gray-800 rounded-2xl overflow-x-auto">

      {/* 🔹 Sticky Header */}
      <div className="min-w-[600px] sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-[#111] border-b border-gray-800 text-sm font-semibold text-left">
        <span className="w-1/5 text-gray-300">Employee</span>
        <span className="w-1/5 text-blue-400 text-center">New</span>
        <span className="w-1/5 text-yellow-400 text-center">Active</span>
        <span className="w-1/5 text-emerald-400 text-center">Completed</span>
        <span className="w-1/5 text-red-400 text-center">Failed</span>
        <span className="w-1/5 text-red-600 text-center">Deleted</span>
      </div>


      {/* 🔹 Scrollable Content */}
      <div className="overflow-y-auto h-56 min-w-[600px] p-2">
        {employeesOnly.map((elem, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-2 rounded-lg mb-2 bg-[#181818] border border-gray-800 hover:bg-[#1f1f1f] transition"
          >
            <span className="w-full sm:w-1/5 text-white font-medium tracking-wide mb-1 sm:mb-0">
              {elem.firstName} {elem.lastName}
            </span>

            <span className="w-full sm:w-1/5 text-blue-400 font-semibold text-center mb-1 sm:mb-0">
              {elem.taskCounts.newTask}
            </span>

            <span className="w-full sm:w-1/5 text-yellow-400 font-semibold text-center mb-1 sm:mb-0">
              {elem.taskCounts.active}
            </span>

            <span className="w-full sm:w-1/5 text-emerald-400 font-semibold text-center mb-1 sm:mb-0">
              {elem.taskCounts.complete}
            </span>

            <span className="w-full sm:w-1/5 text-red-400 font-semibold text-center mb-1 sm:mb-0">
              {elem.taskCounts.failed}
            </span>
          <span className="w-full sm:w-1/5 flex justify-center">
   <button
                onClick={() => deleteEmployee(elem._id)}
                className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg shadow-lg transition-all duration-200 ease-in-out flex items-center justify-center gap-1 w-full sm:w-auto"
                title="Delete"
              >
                ❌
              </button>
</span>


          </div>
        ))}
      </div>
    </div>
  )
}

export default Alltask;
