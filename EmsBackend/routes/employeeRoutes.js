import express from "express";
import { getEmployees, addEmployee, updateEmployee, deleteEmployee , addTaskToEmployee, updateTaskStatus } from "../controllers/employeeController.js";

const router = express.Router();

// Employees
router.get("/", getEmployees);
router.post("/", addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

// Tasks
router.post("/tasks", addTaskToEmployee);
router.patch("/tasks/status", updateTaskStatus);


export default router;
