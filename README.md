#  Employee Management System (EMS) – MERN + Realtime Architecture

A **production-oriented full-stack Employee Management System** built using the **MERN Stack** with **real-time bidirectional communication using Socket.IO**.

This project demonstrates **clean architecture**, **role-based workflows**, **state management**, and **real-time event-driven systems**—designed to reflect **industry-level engineering practices**, not just CRUD operations.

---

##  Why This Project Matters (For Interviewers)

This project goes beyond basic MERN applications by implementing:

-  **Admin vs Employee role separation**
-  **Real-time task updates (WebSockets)**
-  **Event-driven notifications**
-  **Centralized Socket architecture**
-  **Scalable folder structure**
-  **Async-safe React rendering**
-  **JWT-based authentication**
-  **Clean backend MVC design**

> ⚡ Built to simulate **real corporate task management systems**

---

##  Core Features

###  Admin Dashboard
- Secure admin authentication
- Add & manage employees
- Assign tasks to employees
- Monitor task progress in real time
- Receive **live notifications** when task status changes
- Sound + Toast alerts for critical updates

###  Employee Dashboard
- Secure employee login
- View assigned tasks
- Update task status (New / Active / Completed / Failed)
- Receive **instant real-time task notifications**
- Smooth UI with non-blocking async updates

###  Real-Time System (Socket.IO)
- Single global WebSocket connection
- User-specific rooms for targeted notifications
- Live Admin ↔ Employee sync
- Zero page refresh architecture

---

##  System Architecture

Client (React)
│
│ REST API (HTTP)
│──────────────▶ Express Server
│
│ WebSocket (Socket.IO)
│◀─────────────▶ Realtime Server
│
MongoDB (Mongoose ODM)


✔ REST for data  
✔ WebSockets for events  
✔ Clean separation of concerns  

---

## 🛠 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Socket.IO Client
- React Context API
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- JWT Authentication
- MVC Architecture

### Database
- MongoDB (Local / Atlas)

---

##  Project Structure (Monorepo)

EMS/
│
├── frontend/ # React (Vite)
│ ├── src/
│ │ ├── context/
│ │ ├── components/
│ │ ├── socket.js # Single global socket instance
│ │ └── pages/
│ └── package.json
│
├── backend/ # Node + Express
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── config/
│ ├── server.js # HTTP + Socket.IO server
│ └── package.json
│
├── .gitignore
└── README.md




# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
