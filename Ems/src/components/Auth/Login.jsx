import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";


const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    // // 🔑 login result from App.jsx
    // const isLoggedIn = handleLogin(email, password);

    // if (isLoggedIn) {
    //   toast.success("Login Successfully");
    // } else {
    //   toast.error("Invalid Email or Password");
    // }

    // setEmail("");
    // setPassword("");
    try {
    // 🔹 Call backend API
    const res = await axios.post("http://localhost:8080/api/auth/login", {
      email,
      password,
    });

    // 🔹 Backend returned user data
    const employeeData = res.data;


    // 🔹 Add role manually for frontend
    const userWithRole = { ...employeeData, role: "employee" };

     // ✅ MOST IMPORTANT (MISSING LINE)
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(userWithRole)
    );

    // 🔹 Update App state
    setUser(userWithRole);

    toast.success("Login Successful");

    // 🔹 Store user in App state (or localStorage)
    // This assumes you pass `setUser` from App.jsx
    // setUser(user);

    // Reset form
    setEmail("");
    setPassword("");
  } catch (err) {
    // 🔹 Check for hard-coded admin
      if (email === "admin@me.com" && password === "123") {
        const adminUser = { role: "admin", name: "Admin", email: "admin@me.com" };
        localStorage.setItem("loggedInUser", JSON.stringify(adminUser));
        setUser(adminUser);
        toast.success("Admin Login Successful");
      } else {
        toast.error(err.response?.data?.message || "Invalid Email or Password");
      }
  }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-10 shadow-2xl">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Welcome User</h2>
          <p className="text-gray-400 text-sm mt-1">
            Login to continue
          </p>
        </div>

        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-xl border border-emerald-500/40 bg-transparent px-5 py-3 text-white placeholder-gray-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-xl border border-emerald-500/40 bg-transparent px-5 py-3 text-white placeholder-gray-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition"
          />

          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-emerald-500 py-3 text-lg font-semibold text-white shadow-lg hover:bg-emerald-600 transition-all active:scale-95"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
