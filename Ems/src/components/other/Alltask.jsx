import React from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../socket";
import { API_BASE } from "../../config/api";
import { toast } from "react-toastify";

const Alltask = ({ employees, setEmployees, onEmployeeDeleted }) => {
  const navigate = useNavigate();

  // ✅ Socket listener to fetch updates
  React.useEffect(() => {
    const handleTaskUpdated = (updatedEmployee) => {
      setEmployees(prev => prev.map(emp =>
        emp._id === updatedEmployee._id
          ? {
            ...emp,
            tasks: updatedEmployee.tasks,
            taskCounts: updatedEmployee.taskCounts,
            todaySalary: updatedEmployee.todaySalary,
            salaryStats: updatedEmployee.salaryStats,
          }
          : emp
      ));
      const updatedTask = updatedEmployee.updatedTask;
      if (updatedTask) {
        const employeeName = `${updatedEmployee.firstName} ${updatedEmployee.lastName}`;
        if (updatedTask.complete) {
          toast.success(`Task "${updatedTask.title}" completed by ${employeeName}! ✅`);
        } else if (updatedTask.failed) {
          toast.error(`Task "${updatedTask.title}" failed by ${employeeName} ❌`);
        }
      }
    };

    socket.on("taskUpdated", handleTaskUpdated);

    return () => socket.off("taskUpdated", handleTaskUpdated);
  }, [setEmployees]);

  const employeesOnly = employees?.filter(emp => emp.role === "employee") || [];

  if (employeesOnly.length === 0) {
    return <div className="text-gray-400 text-center mt-6">No employees found</div>;
  }

  return (
    <div className="mt-6 bg-[#111] border border-gray-800 rounded-2xl overflow-x-auto">
      {/* Header */}
      <div className="min-w-[700px] sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-[#111] border-b border-gray-800 text-sm font-semibold">
        <span className="w-1/6 text-gray-300">Employee</span>
        <span className="w-1/6 text-blue-400 text-center">New</span>
        <span className="w-1/6 text-yellow-400 text-center">Active</span>
        <span className="w-1/6 text-emerald-400 text-center">Completed</span>
        <span className="w-1/6 text-red-400 text-center">Failed</span>
        <span className="w-1/6 text-center">Actions</span>
      </div>

      {/* Employee List */}
      <div className="overflow-y-auto h-[60vh] min-w-[700px] p-2">
        {employeesOnly.map((elem) => (
          <div
            key={elem._id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-2 rounded-lg mb-2 bg-[#181818] border border-gray-800 hover:bg-[#1f1f1f] transition"
          >
            <button className="w-full sm:w-1/6 text-left text-white font-medium">
              {elem.firstName} {elem.lastName}
            </button>

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

            {/* Actions */}
            <div className="w-full sm:w-1/6 flex justify-center gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => navigate(`/employee/${elem._id}/monthly`)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm"
              >
                💰 Salary
              </button>
              <button
                onClick={async () => {
                  await fetch(`${API_BASE}/employees/${elem._id}`, { method: "DELETE" });
                  setEmployees(prev => prev.filter(emp => emp._id !== elem._id));
                  if (onEmployeeDeleted) onEmployeeDeleted();
                  toast.success("Employee deleted successfully! ✅"); // ✅ toast
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
