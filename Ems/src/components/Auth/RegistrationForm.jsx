import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Authcontext } from '../../context/AuthProvider'

const RegistrationForm = ({ onClose }) => {
  const {userData, setUserData} = useContext(Authcontext); // 🔹 useContext sahi
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    const newEmployee = {
      firstName,
      lastName,
      email,
      password,
      role: 'employee',
      tasks: [],
      taskCounts: { newTask:0, active:0, complete:0, failed:0 }
    }

    try {
      // 🔹 Server pe add
      await axios.post("https://ems-backend-jy3w.onrender.com/api/employees", newEmployee);

      // Backend se jo employee create hua hai uska data use karo
setUserData(prev => [...prev, res.data]);
localStorage.setItem('employees', JSON.stringify([...userData, res.data]));

      toast.success("Employee added successfully!");
      setFirstName(""); setLastName(""); setEmail(""); setPassword("");
      onClose();

    } catch (err) {
      console.log(err);
      toast.error("Error adding employee");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-gray-900 p-6 sm:p-8 rounded-2xl w-full max-w-md text-white">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Add New Employee</h2>
        <form onSubmit={submitHandler} className="flex flex-col gap-3 sm:gap-4">
          <input type="text" placeholder="First Name" value={firstName} onChange={e=>setFirstName(e.target.value)} required className="px-3 sm:px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 w-full"/>
          <input type="text" placeholder="Last Name" value={lastName} onChange={e=>setLastName(e.target.value)} required className="px-3 sm:px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 w-full"/>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required className="px-4 py-2 rounded-xl bg-gray-800 border border-gray-700"/>
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required className="px-3 sm:px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 w-full"/>

          <div className="flex justify-between mt-4">
            <button type="submit" className="bg-emerald-600 px-4 sm:px-6 py-2 rounded-xl hover:bg-emerald-700 w-full sm:w-auto">Add Employee</button>
            <button type="button" onClick={onClose} className="bg-red-600 px-4 sm:px-6 py-2 rounded-xl hover:bg-red-700 w-full sm:w-auto">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm;
