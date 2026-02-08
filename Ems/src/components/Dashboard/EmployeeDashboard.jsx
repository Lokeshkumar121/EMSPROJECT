import React, { useContext } from 'react'
import Header from '../other/Header'
import TaskNumberslist from '../other/TaskNumberslist'
import Tasklist from '../task/Tasklist'
import { Authcontext } from '../../context/AuthProvider'
import socket from "../../socket";


import { useEffect } from "react";
// import { io } from "socket.io-client";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeDashboard = ({ changeUser , user }) => {
  const {userData} = useContext(Authcontext)

  // read only
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
  console.log(user)

    // 🔹 Socket connection
  useEffect(() => {
    if (!loggedInUser) return;

    // const socket = io("http://localhost:8080"); // backend URL
    socket.emit("joinRoom", loggedInUser._id);  // join personal room

    // Listen for new task assignment
    socket.on("newTask", (data) => {
      // palay sound 
      const audio = new Audio("/notification.mp3"); // aap public folder me rakho
      audio.play();
       // 🔹 Show popup
      toast.info(`New Task Assigned: ${data.title}`, {
        position: "top-right",
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
      });
      console.log("Notification:", data);
    });

    return () => {
      socket.off("newTask");
    };
  }, [loggedInUser]);

  // loading state
  if (!userData || userData.length === 0) {
    return <p className="text-white">Loading employees...</p>
  }

  if (!loggedInUser) {
    return <p className="text-white">No user logged in</p>
  }    

  // find employee
  const employee = userData.find(
    e => e.email?.toLowerCase() === loggedInUser.email?.toLowerCase()
  )
  console.log("LoggedIn:", loggedInUser.email);
console.log("All employees:", userData.map(e => e.email));


  if (!employee) {
    return <p className="text-white">Employee not found</p>
  }

  return (
    <div className='min-h-screen w-full p-4 sm:p-10 bg-[#1c1c1c] text-white flex flex-col gap-6'>
      <Header changeUser={changeUser} user={loggedInUser}  />
      <TaskNumberslist data={employee} />
      <Tasklist data={employee} />
      <ToastContainer /> {/* 🔹 Toast container */}
    </div>
  )
}

export default EmployeeDashboard
