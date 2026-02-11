import { io } from "socket.io-client";

const SOCKET_URL = "https://ems-backend-jy3w.onrender.com/";

const socket = io(SOCKET_URL, {
  withCredentials : true,
  transports: ["websocket"],

});

export default socket;