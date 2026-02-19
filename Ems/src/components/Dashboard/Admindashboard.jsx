import React, { useEffect, useState } from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import Alltask from '../other/Alltask'
import RegistrationForm from "../Auth/RegistrationForm";
// import { io } from "socket.io-client";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from "../../socket";
import { API_BASE } from "../../config/api";
import AdminSalaryAnalytics from "../../components/AdminSalaryAnalytics";


const Admindashboard = ({ changeUser, user }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [employees, setEmployees] = useState([]);
  // ------------------ Fetch Employees once ------------------
  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${API_BASE}/employees`);
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error("Employees fetch failed", err);
    }
  };


  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`${API_BASE}/analytics/salary`);
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error("Analytics fetch failed", err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleEmployeeDeleted = async () => {
    await fetchAnalytics();
  };



useEffect(() => {
  if (!socket) return;

  socket.on("taskUpdated", (updatedEmployee) => {
    console.log("🔥 ADMIN RECEIVED:", updatedEmployee);

    // ✅ Update employees state directly
    setEmployees(prev => prev.map(emp =>
      emp._id === updatedEmployee.employeeId
        ? { ...emp, ...updatedEmployee, tasks: updatedEmployee.tasks }
        : emp
    ));

    // ✅ Use updatedTask from backend emit
    const lastTask = updatedEmployee.updatedTask;

    if (!lastTask) return;

    let sound = "/notification.mp3";
    if (lastTask.complete) sound = "/succes.mp3";
    if (lastTask.failed) sound = "/err.mp3";
    new Audio(sound).play();

    if (lastTask.failed) {
      toast.error(`❌ ${updatedEmployee.firstName} FAILED task "${lastTask.title}"`, { position: "top-right", autoClose: 6000 });
    } else if (lastTask.complete) {
      toast.success(`${updatedEmployee.firstName} COMPLETED task "${lastTask.title}"`, { position: "top-right", autoClose: 5000 });
    } else {
      toast.info(`${updatedEmployee.firstName} updated task "${lastTask.title}"`, { position: "top-right", autoClose: 4000 });
    }
  });

  return () => {
    socket.off("taskUpdated");
  };
}, []);



  return (
    <div className='min-h-screen w-full p-4 sm:p-7 bg-[#1c1c1c] text-white flex flex-col gap-6'>
      <Header changeUser={changeUser} user={user} />
      <AdminSalaryAnalytics analytics={employees} />
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Add Employee Button */}
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-emerald-600 px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-white hover:bg-emerald-700 transition-colors w-full sm:w-auto"
        >
          Add Employee
        </button>



      </div>

      {/* Registration Form Modal */}
      {showAddForm && (
        <RegistrationForm onClose={() => setShowAddForm(false)} onEmployeeAdded={fetchAnalytics} />
      )}

      {/* Task Management */}
      <CreateTask />
      <Alltask onEmployeeDeleted={handleEmployeeDeleted} />

    </div>
  )
}

export default Admindashboard;
