import express from "express";
import { getEmployees, addEmployee, updateEmployee, deleteEmployee , addTaskToEmployee, updateTaskStatus } from "../controllers/employeeController.js";
import Employee from "../models/Employee.js";


const router = express.Router();

// Employees
router.get("/", getEmployees);
router.post("/", addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
// 🔹 Get single employee salary data
router.get("/:id/salary", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({
      name: employee.firstName + " " + employee.lastName,
      salaryHistory: employee.salaryHistory,
      todaySalary: employee.todaySalary,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Tasks
router.post("/tasks", addTaskToEmployee);
router.patch("/tasks/status", updateTaskStatus);


export default router;
