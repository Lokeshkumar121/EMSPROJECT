import { useState, useEffect, useContext } from "react";
import Login from "./components/Auth/Login";
import Admindashboard from "./components/Dashboard/Admindashboard";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import Home from "./pages/Home";
import { Authcontext } from "./context/AuthProvider";
import axios from 'axios';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeSalary from "./pages/EmployeeSalary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  
  const [user, setUser] = useState(null);
  const [loggedInEmployee, setLoggedInEmployee] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const { userData } = useContext(Authcontext);

 // restore login
useEffect(() => {
  const stored = localStorage.getItem("loggedInUser");
  if (stored) {
    const parsed = JSON.parse(stored);

    // 🔹 Set full user object, not just role
    setUser(parsed);

    // 🔹 If employee, set loggedInEmployee
    if (parsed.role === "employee") {
      // const emp = userData.find(e => e.email === parsed.email);
      setLoggedInEmployee(parsed);
    }
  }
}, []); // run only once on mount

  // const handleLogin = (email, password) => {
  //   // ADMIN
  //   if (email === "admin@me.com" && password === "123") {
  //     const adminUser = {
  //   role: "admin",
  //   name: "Admin",
  //   email: "admin@me.com",
  // };
  //     localStorage.setItem(
  //       "loggedInUser",
  //       JSON.stringify(adminUser)
  //     );
  //     setUser(adminUser);
  //     return true;
  //   }

  //   // EMPLOYEE
  //   if (userData) {
  //     const emp = userData.find(
  //       e => e.email === email && e.password === password
  //     );

  //     if (emp) {

  //        const empUser = {
  //   role: "employee",
  //   email: emp.email,
  //   name: emp.firstName
  // };
  //       localStorage.setItem(
  //         "loggedInUser",
  //         JSON.stringify(
  //           empUser
  //         )
  //       );
  //       setUser(emp);
  //       setLoggedInEmployee(emp);
  //       return true;
  //     }
  //   }

  //   return false;
  // };

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    setLoggedInEmployee(null);
  };

  return (
    <>
      <ToastContainer />

      {/* PUBLIC */}
      {!user && !showLogin && (
        <Home onLoginClick={() => setShowLogin(true)} />
      )}

      {/* LOGIN */}
      {!user && showLogin && (
        <Login
        setUser={(loggedInEmployee) => {
          setUser(loggedInEmployee);   // user object update
      setLoggedInEmployee(loggedInEmployee); // dashboard ke liye
      setShowLogin(false);
        }}
        
          handleLogin={(email, password) => {
            const ok = handleLogin(email, password);
            if (ok) setShowLogin(false);
            return ok;
          }}
          onBack={() => setShowLogin(false)}
        />
      )}

      {/* ADMIN */}
      {user?.role === "admin" && <Admindashboard changeUser={logout} user={user} />}

      {/* EMPLOYEE */}
      {user?.role === "employee" && loggedInEmployee && (
        <EmployeeDashboard
          changeUser={logout}
          user={loggedInEmployee}
        />
      )}


  <Routes>
    <Route path="/employee/:id" element={<EmployeeSalary />} />
  </Routes>

    </>
  );
};

export default App;
