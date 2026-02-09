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

  useEffect(() => {
  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`${API_BASE}/analytics/salary`);
      const data = await res.json();
      setAnalytics(data);
    } catch (err) {
      console.error("Analytics fetch failed", err);
    }
  };

  fetchAnalytics();
}, []);


 useEffect(() => {
  // const socket = io("http://localhost:8080");

  socket.on("taskStatusUpdate", (data) => {
    // 🔊 Sound based on status
    let sound = "/notification.mp3";

    if (data.status === "complete") sound = "/succes.mp3";
    if (data.status === "failed") sound = "/err.mp3";

    new Audio(sound).play();

    // 🎨 Toast based on status
    if (data.status === "failed") {
      toast.error(
        `❌ ${data.employeeName} FAILED the task`,
        { position: "top-right", autoClose: 6000 }
      );
    } 
    else if (data.status === "complete") {
      toast.success(
        `${data.employeeName} COMPLETED the task`,
        { position: "top-right", autoClose: 5000 }
      );
    } 
    else {
      toast.info(
        `${data.employeeName} updated task to ${data.status}`,
        { position: "top-right", autoClose: 4000 }
      );
    }
  });

  return () => {
  socket.off("taskStatusUpdate");
};
}, []);


  return (
    <div className='min-h-screen w-full p-4 sm:p-7 bg-[#1c1c1c] text-white flex flex-col gap-6'>
      <Header changeUser={changeUser} user={user} />
       <AdminSalaryAnalytics analytics={analytics} />
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
        <RegistrationForm onClose={() => setShowAddForm(false)} />
      )}

      {/* Task Management */}
      <CreateTask />
      <Alltask />
        
    </div>
  )
}

export default Admindashboard;
