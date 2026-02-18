import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js"


import cors from "cors";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
connectDB();

const app = express();

// ✅ MIDDLEWARE
const allowedOrigins = ["https://emsproject-lh2b.onrender.com", "http://localhost:5173"];

// app.use(cors({
//   origin:function(origin, callback){
//     if(!origin) return callback(null, true); // for mobile apps / postman
//     if(allowedOrigins.indexOf(origin) === -1){
//       const msg = 'CORS policy: This origin is not allowed';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   credentials: true
// }));
app.use(cors({
  origin: true, // allow all origins (DEV + Render safe)
  credentials: true
}));
app.use(express.json());

// ✅ LOGGER
app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

// ✅ ROUTES
app.use("/api/employees", employeeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/analytics", analyticsRoutes);


console.log("Analytics routes loaded");



// ✅ ROOT
app.get("/", (req, res) => {
  res.send("Hello i am root");
});

// ✅ CREATE HTTP SERVER (important!)
const PORT = process.env.PORT || 5000;
const server = http.createServer(app); // <-- ye missing tha

// ✅ SOCKET.IO SETUP
export const io = new Server(server, {
  cors: {
    origin: ["https://emsproject-lh2b.onrender.com", "http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ SOCKET CONNECTION HANDLER
io.on("connection", (socket) => {
  // console.log("🔔 New user connected:", socket.id);

  // Employee joins their personal room
  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    // console.log(`User ${userId} joined their room`);
  });

  // Employee task status update
  socket.on("taskStatusUpdate", (data) => {
    io.emit("taskStatusUpdate", data); // notify admin
    // console.log("Task status update:", data);
  });

  socket.on("disconnect", () => {
    // console.log("❌ User disconnected:", socket.id);
  });
});


//  DAILY MIDNIGHT SALARY RESET SYSTEM






// ✅ START SERVER
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
