import { useState, useEffect, useContext } from "react";
import {  Routes, Route , Navigate} from "react-router-dom";
import Login from "./components/Auth/Login";
import Admindashboard from "./components/Dashboard/Admindashboard";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import Home from "./pages/Home";
import EmployeeSalary from "./pages/EmployeeSalary";
import { Authcontext } from "./context/AuthProvider";
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

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            !user ? (
              showLogin ? (
                <Login setUser={setUser} />
              ) : (
                <Home onLoginClick={() => setShowLogin(true)} />
              )
            ) : (
              <Navigate
                to={user.role === "admin" ? "/admin" : "/employee/dashboard"}
              />
            )
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <Admindashboard changeUser={logout} user={user} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* EMPLOYEE DASHBOARD */}
        <Route
          path="/employee/dashboard"
          element={
            user?.role === "employee" ? (
              <EmployeeDashboard changeUser={logout} user={user} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* EMPLOYEE SALARY GRAPH */}
        <Route path="/employee/:id" element={<EmployeeSalary />} />

      </Routes>
    </>
  );
};

export default App;
