import React, { useContext, useEffect, useState } from 'react'
import Header from '../other/Header'
import TaskNumberslist from '../other/TaskNumberslist'
import Tasklist from '../task/Tasklist'
import { Authcontext } from '../../context/AuthProvider'
import socket from "../../socket";
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

  const { userData } = useContext(Authcontext);
  const [employee, setEmployee] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))

  // 🔹 SOCKET CONNECTION
  // 🔹 SOCKET CONNECTION
  useEffect(() => {
    if (!loggedInUser) return;


    const joinRoom = () => {
      console.log("Joining Employee Room:", loggedInUser._id); // 🔹 debug
      socket.emit("joinEmployeeRoom", loggedInUser._id);
    };



    if (socket.connected) joinRoom();
    else socket.on("connect", joinRoom);

    // 🔹 Notify Task Function
    const notifyTask = (data, isNew = false) => {
      if (data.employeeId.toString() !== loggedInUser._id.toString()) return;

      let latestTask;
      if (isNew) {
        latestTask = data.tasks[data.tasks.length - 1];
      } else {
        latestTask = data.tasks.find(t => t._id.toString() === data.updatedTaskId.toString());
      }

      if (!latestTask) return;

      // 🔔 Sound
      const audio = new Audio("/notification.mp3");
      audio.play().catch(() => { });

      // 🔔 Toast
      let msg = isNew
        ? `New Task Assigned: ${latestTask.title}`
        : `Task "${latestTask.title}" status updated`;
      toast.info(msg, { position: "top-right", autoClose: 5000 });

      // 🔹 Immutable state update (Critical)
      setEmployee(prev => ({
        ...prev,
        tasks: [...data.tasks],
        taskCounts: { ...data.taskCounts },
        todaySalary: data.todaySalary,
        salaryStats: { ...data.salaryStats }
      }));
    }

    socket.on("taskAssigned", (data) => { 
      console.log("TaskAssigned Event Received:", data); 
      notifyTask(data, true) });
    socket.on("taskUpdated", (data) => notifyTask(data));

    return () => {
      socket.off("connect", joinRoom);
      socket.off("taskAssigned");
      socket.off("taskUpdated");
    };
  }, [loggedInUser?._id]);


  // 🔹 FIND EMPLOYEE (IMPORTANT FIX: moved above return)
  useEffect(() => {
    if (!userData || !loggedInUser) return;

    const emp = userData.find(
      e => e.email?.toLowerCase() === loggedInUser.email?.toLowerCase()
    );

    if (emp) {
      // ✅ always create new references
      setEmployee({
        ...emp,
        tasks: [...emp.tasks],
        taskCounts: { ...emp.taskCounts },
        salaryStats: { ...emp.salaryStats }
      });
    }
  }, [userData]);


  // 🔹 CONDITIONS (Now correct order)

  if (!loggedInUser) {
    return (
      <StatusCard
        title="No User Logged In"
        subtitle="Please log in to continue."
        icon="❌"
      />
    );
  }

  if (!employee) {
    return (
      <StatusCard
        title="Loading..."
        subtitle="Please wait while we fetch your data."
        icon="⏳"
      />
    );
  }

  // 🔹 FINAL UI
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