import React, { useEffect, useState } from 'react';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import Alltask from '../other/Alltask';
import RegistrationForm from "../Auth/RegistrationForm";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from "../../socket";
import { API_BASE } from "../../config/api";
import AdminSalaryAnalytics from "../../components/AdminSalaryAnalytics";

const Admindashboard = ({ changeUser, user }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [employees, setEmployees] = useState([]);

  // ------------------ Fetch Employees ------------------
  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API_BASE}/employees`);
      const data = await res.json();
      setEmployees(data); // set state
    } catch (err) {
      console.error("Employees fetch failed", err);
    }
  };

  useEffect(() => {
    fetchEmployees(); // load employees on mount
  }, []);

  // ------------------ Employee Deleted Handler ------------------
  const handleEmployeeDeleted = async () => {
    await fetchEmployees(); // refresh employees after deletion
  };

  // ------------------ Socket for real-time task updates ------------------
  useEffect(() => {
    if (!socket) return;

    const handleEmployeeAdded = (newEmp) => {
      setEmployees(prev => [...prev, newEmp]);
    };

    const handleEmployeeDeleted = (id) => {
      setEmployees(prev => prev.filter(emp => emp._id !== id));
    };

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
    };

    socket.on("employeeAdded", handleEmployeeAdded);
    socket.on("employeeDeleted", handleEmployeeDeleted);
    socket.on("taskUpdated", handleTaskUpdated);

    return () => {
      socket.off("employeeAdded", handleEmployeeAdded);
      socket.off("employeeDeleted", handleEmployeeDeleted);
      socket.off("taskUpdated", handleTaskUpdated);
    };
  }, []);

  return (
    <div className='min-h-screen w-full p-4 sm:p-7 bg-[#1c1c1c] text-white flex flex-col gap-6'>
      {/* Header */}
      <Header changeUser={changeUser} user={user} />

      {/* Analytics */}
      <AdminSalaryAnalytics analytics={employees} /> {/* uses employees state reactively */}

      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-emerald-600 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-white hover:bg-emerald-700 transition-colors w-full sm:w-auto"
        >
          Add Employee
        </button>
      </div>

      {/* Registration Form Modal */}
      {showAddForm && (
        <RegistrationForm
          onClose={() => setShowAddForm(false)}
          onEmployeeAdded={fetchEmployees} // refresh employees after adding
        />
      )}

      {/* Task Management */}
      <CreateTask />

      <Alltask
        employees={employees}
        setEmployees={setEmployees} // allow Alltask to update employees
        onEmployeeDeleted={handleEmployeeDeleted}
      />

      <ToastContainer />
    </div>
  );
};

export default Admindashboard;
