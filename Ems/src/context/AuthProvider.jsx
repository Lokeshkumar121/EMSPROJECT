import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

export const Authcontext = createContext();

const API = "https://ems-backend-jy3w.onrender.com/api/employees";

const AuthProvider = ({ children }) => {
  // 🔹 All employees
  const [userData, setUserData] = useState([]);
  // const [loggedInUser, setLoggedInUser] = useState(null);



  // 🔹 Load employees from localStorage on first load
  
  // 🔹 LOAD EMPLOYEES FROM BACKEND
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API);
      setUserData(res.data);
    } catch (err) {
      console.error("Fetch employees failed", err);
    }
  };

  // 🔁 UPDATE TASK STATUS (BACKEND BASED)
    // 🔁 UPDATE TASK STATUS
  const updateTaskStatus = async (employeeId, taskIndex, status) => {
    if (!employeeId) {
      console.error("❌ employeeId missing");
      return;
    }

    try {
      const res = await axios.patch(`${API}/tasks/status`, {
        employeeId,
        taskIndex,
        status,
      });

      const updatedEmployee = res.data;

      setUserData(prev =>
        prev.map(emp =>
          emp._id === updatedEmployee._id ? updatedEmployee : emp
        )
      );

    } catch (err) {
      console.error(
        "Task update failed:",
        err.response?.data || err.message
      );
    }
    fetchEmployees(); // instant UI update
  };

    // ➕ ADD TASK (BACKEND)
  const addTaskToEmployee = async (employeeId, task) => {
    try {
      const res = await axios.post(`${API}/tasks`, {
        employeeId,
        task,
      });

      const updatedEmployee = res.data;

      setUserData(prev =>
        prev.map(emp =>
          emp._id === updatedEmployee._id ? updatedEmployee : emp
        )
      );

    } catch (err) {
      console.error("Add task failed", err);
    }
  };


 const deleteEmployee = async (employeeId) => {
  try {
    // 🔹 Backend delete
    await axios.delete(`${API}/${employeeId}`);

    // 🔹 Frontend state update
    setUserData(prev => 
      {
       const updated = prev.filter(emp => emp._id !== employeeId)
        localStorage.setItem("employees", JSON.stringify(updated));
        return updated;
      });


    toast.success("Employee deleted successfully!");
  } catch (err) {
    console.error("Delete failed:", err);
    toast.error("Failed to delete employee");
  }
};
console.log(deleteEmployee)

  // ➕ ADD NEW TASK (LOCAL)

  return (
    <Authcontext.Provider
      value={{
        userData,

    setUserData,
    fetchEmployees,
    addTaskToEmployee,
    updateTaskStatus,
    deleteEmployee,
    fetchEmployees
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};

export default AuthProvider;
