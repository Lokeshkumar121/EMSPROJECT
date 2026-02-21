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
import { useRef } from 'react';

const Admindashboard = ({ changeUser, user }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const acceptSound = useRef(null);
  const completeSound = useRef(null);
  const failedSound = useRef(null);

    // ------------------ Load Sounds Once ------------------
  useEffect(() => {
    acceptSound.current = new Audio("/notification.mp3");
    completeSound.current = new Audio("/succes.mp3");
    failedSound.current = new Audio("/err.mp3");

    acceptSound.current.volume = 1;
    completeSound.current.volume = 1;
    failedSound.current.volume = 1;
  }, []);

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
    fetchEmployees();
  }, []);

  useEffect(() => {

    socket.emit("joinAdminRoom");

    socket.on("taskUpdatedForAdmin", (data) => {
      setEmployees(prev =>
        prev.map(emp =>
          emp._id === data.employeeId
            ? {
              ...emp,
                tasks: [...data.tasks],                  // new array
            taskCounts: { ...data.taskCounts },     // new object
            todaySalary: data.todaySalary,
            salaryStats: { ...data.salaryStats }    // new object
            }
            : emp
        )
      );
    });
    // 🔔 Employee Accept / Complete / Failed Toast
    socket.on("employeeActionNotification", (data) => {
      const message = `${data.employeeName} ${data.status} task: ${data.taskTitle}`;

      if (data.status === "accepted") {
        acceptSound.current.currentTime = 0;
        acceptSound.current.play().catch(() => {});
        toast.info(message, {
          style: { background: "", color: "" } // Blue
        });
      }

      else if (data.status === "completed") {
         completeSound.current.currentTime = 0;
    completeSound.current.play().catch(() => {});
        toast.success(message, {
          style: { background: "", color: "" } // Green
        });
      }

      else if (data.status === "failed") {
        failedSound.current.currentTime = 0;
    failedSound.current.play().catch(() => {});
        toast.error(message, {
          style: { background: "", color: "" } // Red
        });
      }
    });

    return () => {
      socket.off("taskUpdatedForAdmin");
      socket.off("employeeActionNotification");
    };

  }, []);



  // ------------------ Socket for real-time task updates ------------------
  useEffect(() => {
    if (!socket) return;

    const handleEmployeeAdded = (newEmp) => {
      setEmployees(prev => [...prev, newEmp]);
      toast.success("Employee added successfully! 🎉");
    };

    const handleEmployeeDeletedSocket = (id) => {
      setEmployees(prev => prev.filter(emp => emp._id.toString()  !== id.toString() ));
      toast.success("Employee deleted successfully!");
    };

    socket.on("employeeAdded", handleEmployeeAdded);
    socket.on("employeeDeleted", handleEmployeeDeletedSocket);

    return () => {
      socket.off("employeeAdded", handleEmployeeAdded);
      socket.off("employeeDeleted", handleEmployeeDeletedSocket);
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
        onEmployeeDeleted={() => { }}
      />


    </div>
  );
};

export default Admindashboard;
