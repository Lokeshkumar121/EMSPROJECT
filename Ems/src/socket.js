import { io } from "socket.io-client";

const socket = io("https://ems-backend-jy3w.onrender.com/", {
  withCredentials: true,
  transports: ["websocket"]
});

export default socket;
