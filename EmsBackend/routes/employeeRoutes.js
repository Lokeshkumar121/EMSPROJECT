import express from "express";
import mongoose from "mongoose";
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
// 🔹 Monthly Summary
router.get("/:id/monthly-summary", async (req, res) => {
  try {

    const { id } = req.params;
    console.log("Monthly route hit, ID:", id);
      console.log("Monthly summary route hit");
    console.log("ID:", req.params.id);


    // ✅ ID validation
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }

     const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    const salaryHistory = employee.salaryHistory || [];
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const monthlyData = employee.salaryHistory.filter(h => {
      const d = new Date(h.date);
      return d.getMonth() === month && d.getFullYear() === year;
    });

    const totalSalary = monthlyData.reduce(
  (acc, h) => acc + (h.salary || 0),
  0
);

const totalCompleted = monthlyData.reduce(
  (acc, h) => acc + (h.completed || 0),
  0
);

const totalFailed = monthlyData.reduce(
  (acc, h) => acc + (h.failed || 0),
  0
);


    res.json({
      totalSalary,
      totalCompleted,
      totalFailed,
      monthlyData
    });

  } catch (err) {
     console.error("MONTHLY ROUTE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


// 🔹 Pay Salary
router.post("/:id/pay-salary", async (req, res) => {
  try {
     const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Employee ID" });
    }
    
    const { amount } = req.body;


    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    if (!employee.salaryPaidHistory) {
  employee.salaryPaidHistory = [];
}
    employee.salaryPaidHistory.push({
      amount,
      date: new Date(),
      transactionId: "TXN" + Date.now()
    });

    await employee.save();

    res.json({ message: "Salary Paid Successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Tasks
router.post("/tasks", addTaskToEmployee);
router.patch("/tasks/status", updateTaskStatus);


export default router;
