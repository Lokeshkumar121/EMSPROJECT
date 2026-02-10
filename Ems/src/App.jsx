import { useState, useEffect, useContext } from "react";

import { Routes, Route, Navigate } from "react-router-dom";
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
  const [showLogin, setShowLogin] = useState(false);

  const { userData } = useContext(Authcontext);

  // 🔹 Restore login from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("loggedInUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, [userData]);

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
  };

  return (
    <>
      <ToastContainer />

      <Routes>
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

        <Route path="/employee/:id" element={<EmployeeSalary />} />
      </Routes>
    </>
  );
};

export default App;
