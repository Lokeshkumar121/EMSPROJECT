import React, { useContext } from 'react'
import Header from '../other/Header'
import TaskNumberslist from '../other/TaskNumberslist'
import Tasklist from '../task/Tasklist'
import { Authcontext } from '../../context/AuthProvider'
import socket from "../../socket";


import { useEffect } from "react";
// import { io } from "socket.io-client";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SalaryCard from '../Dashboard/SalaryCard'



// 🔹 Reusable StatusCard component
const StatusCard = ({ title, subtitle, icon }) => {
  return (
    <div className="flex items-center justify-center h-[70vh]">
      <div className="bg-[#111111] text-white rounded-2xl shadow-lg p-10 w-80 sm:w-96 text-center border border-gray-800 hover:scale-105 transition-transform duration-300">
        {icon && <div className="text-5xl mb-4">{icon}</div>}
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {subtitle && <p className="text-gray-400">{subtitle}</p>}
      </div>
    </div>
  )
}
const EmployeeDashboard = ({ changeUser, user }) => {
  // const {userData} = useContext(Authcontext)

  const { userData, fetchEmployees } = useContext(Authcontext);

  // read only
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
  console.log(user)

  // 🔹 Socket connection
  useEffect(() => {
    if (!loggedInUser) return;

    // const socket = io("http://localhost:8080"); // backend URL
    socket.emit("joinRoom", loggedInUser._id);  // join personal room

    // Listen for new task assignment
    socket.on("taskUpdated", (data) => {
      console.log("🔥 EVENT RECEIVED:", data);
      // palay sound 
       if (data._id !== loggedInUser._id) return;
      const audio = new Audio("/notification.mp3"); // aap public folder me rakho
      audio.play().catch(() => {});
      // 🔹 Show popup
      toast.info(`New Task Assigned: ${data.updatedTask?.title}`, {
        position: "top-right",
        autoClose: 5000,
      });
      fetchEmployees(); // ✅ REFRESH DATA
      console.log("Notification:", data);
    });

    return () => {
      socket.off("taskUpdated");
    };
  }, [loggedInUser?._id]);

  // loading state
  if (!userData || userData.length === 0) {
    return <StatusCard
      title="Loading Employees..."
      subtitle="Please wait while we fetch the data."
      icon="⏳"
    />
  }

  if (!loggedInUser) {
    return <StatusCard
      title="No User Logged In"
      subtitle="Please log in to continue."
      icon="❌"
    />
  }

  // find employee
  const employee = userData.find(
    e => e.email?.toLowerCase() === loggedInUser.email?.toLowerCase()
  )
  console.log("LoggedIn:", loggedInUser.email);
  console.log("All employees:", userData.map(e => e.email));


  if (!employee) {
    return <StatusCard
      title="Employee Not Found"
      subtitle="We couldn't find your profile."
      icon="⚠️"
    />
  }

  return (
    <div className='p-10 bg-[#1c1c1c] text-white h-screen'>
      <Header changeUser={changeUser} user={loggedInUser} />
      <SalaryCard employee={employee} />
      <TaskNumberslist data={employee} />
      <Tasklist data={employee} />

    </div>
  )
}

export default EmployeeDashboard;
