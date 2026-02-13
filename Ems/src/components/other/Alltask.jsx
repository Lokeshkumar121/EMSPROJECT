import React, { useContext, useEffect } from "react";
import { Authcontext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";

const Alltask = ({ onEmployeeDeleted }) => {
  const { userData, deleteEmployee, fetchEmployees } =
    useContext(Authcontext);

  const navigate = useNavigate();

  // ✅ Single clean socket listener
  useEffect(() => {
    const handleUpdate = () => {
      fetchEmployees();
    };

    socket.on("taskStatusUpdate", handleUpdate);

    return () => {
      socket.off("taskStatusUpdate", handleUpdate);
    };
  }, [fetchEmployees]);

  // ✅ Safe filtering
  const employeesOnly =
    userData?.filter((emp) => emp.role === "employee") || [];

  if (employeesOnly.length === 0) {
    return (
      <div className="text-gray-400 text-center mt-6">
        No employees found
      </div>
    );
  }

  return (
    <div className="mt-6 bg-[#111] border border-gray-800 rounded-2xl overflow-x-auto">

      {/* ===== Header ===== */}
      <div className="min-w-[700px] sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-[#111] border-b border-gray-800 text-sm font-semibold">
        <span className="w-1/6 text-gray-300">Employee</span>
        <span className="w-1/6 text-blue-400 text-center">New</span>
        <span className="w-1/6 text-yellow-400 text-center">Active</span>
        <span className="w-1/6 text-emerald-400 text-center">Completed</span>
        <span className="w-1/6 text-red-400 text-center">Failed</span>
        <span className="w-1/6 text-center">Actions</span>
      </div>

      {/* ===== Employee List ===== */}
      <div className="overflow-y-auto h-[60vh] min-w-[700px] p-2">
        {employeesOnly.map((elem) => (
          <div
            key={elem._id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-2 rounded-lg mb-2 bg-[#181818] border border-gray-800 hover:bg-[#1f1f1f] transition"
          >
            {/* Employee Name */}
            <button
              onClick={() => navigate(`/employee/${elem._id}`)}
              className="w-full sm:w-1/6 text-left text-white hover:text-emerald-400 font-medium"
            >
              {elem.firstName} {elem.lastName}
            </button>

            {/* Task Counts */}
            <span className="w-full sm:w-1/6 text-blue-400 text-center font-semibold">
              {elem.taskCounts?.newTask || 0}
            </span>

            <span className="w-full sm:w-1/6 text-yellow-400 text-center font-semibold">
              {elem.taskCounts?.active || 0}
            </span>

            <span className="w-full sm:w-1/6 text-emerald-400 text-center font-semibold">
              {elem.taskCounts?.complete || 0}
            </span>

            <span className="w-full sm:w-1/6 text-red-400 text-center font-semibold">
              {elem.taskCounts?.failed || 0}
            </span>

            {/* Action Buttons */}
            <div className="w-full sm:w-1/6 flex justify-center gap-2 mt-2 sm:mt-0">

              {/* Monthly Salary Button */}
              <button
                onClick={() =>
                  navigate(`/employee/${elem._id}/monthly`)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
              >
                💰 Salary
              </button>

              {/* Delete Button */}
              <button
                onClick={async () => {
                  await deleteEmployee(elem._id);
                  fetchEmployees();
                  if (onEmployeeDeleted) {
                    onEmployeeDeleted();
                  }
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm"
              >
                ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alltask;
