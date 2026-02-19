import Employee from "../models/Employee.js";
import { io } from "../server.js";
import { calculateSalary } from "../utils/calculateSalary.js";

/* =====================================================
   DAILY RESET (Multi-Day Safe + Ledger Correct)
===================================================== */
const handleDailyReset = async (employee) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let lastReset = new Date(employee.lastSalaryResetDate || today);
  lastReset.setHours(0, 0, 0, 0);

  if (lastReset >= today) return;

  let firstIteration = true;

  while (lastReset < today) {
    employee.salaryHistory.push({
      date: new Date(lastReset),
      salary: firstIteration ? (employee.todaySalary || 0) : 0,
      completed: firstIteration ? (employee.salaryStats?.completedToday || 0) : 0,
      failed: firstIteration ? (employee.salaryStats?.failedToday || 0) : 0,
    });

    firstIteration = false;
    lastReset.setDate(lastReset.getDate() + 1);
  }

  employee.todaySalary = 0;
  employee.salaryStats = { completedToday: 0, failedToday: 0, bonusPercent: 0, penaltyPercent: 0 };
  employee.lastSalaryResetDate = today;

  await employee.save();
};

/* =====================================================
   ADD EMPLOYEE
===================================================== */
export const addEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const exists = await Employee.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      password,
      baseSalaryPerDay: 1000,
      tasks: [],
      taskCounts: { newTask: 0, active: 0, complete: 0, failed: 0 },
      todaySalary: 0,
      salaryHistory: [],
      lastSalaryResetDate: today,
      salaryStats: { completedToday: 0, failedToday: 0, bonusPercent: 0, penaltyPercent: 0 },
    });

    const saved = await newEmployee.save();

    // 🔥 Emit to all clients
    io.emit("employeeAdded", saved);

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =====================================================
   UPDATE TASK STATUS
===================================================== */
export const updateTaskStatus = async (req, res) => {
  try {
    const { employeeId, taskId, status } = req.body;

    if (!["new", "active", "complete", "failed"].includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const employee = await Employee.findById(employeeId);
    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    await handleDailyReset(employee);

    const task = employee.tasks.find(t => t._id.toString() === taskId.toString());
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Remove old salary impact
    if (task.complete) employee.salaryStats.completedToday = Math.max(0, employee.salaryStats.completedToday - 1);
    if (task.failed) employee.salaryStats.failedToday = Math.max(0, employee.salaryStats.failedToday - 1);

    // Reset task state
    task.newTask = false;
    task.active = false;
    task.complete = false;
    task.failed = false;

    let fastCompleted = false;

    // Apply new status
    if (status === "new") task.newTask = true;
    if (status === "active") task.active = true;
    if (status === "complete") {
      task.complete = true;
      employee.salaryStats.completedToday++;
      if (task.deadline) {
        const completionTime = new Date();
        const deadline = new Date(task.deadline);
        if (completionTime <= deadline) fastCompleted = true;
      }
    }
    if (status === "failed") {
      task.failed = true;
      employee.salaryStats.failedToday++;
    }

    // Recalculate taskCounts
    employee.taskCounts = { newTask: 0, active: 0, complete: 0, failed: 0 };
    employee.tasks.forEach(t => {
      if (t.newTask) employee.taskCounts.newTask++;
      if (t.active) employee.taskCounts.active++;
      if (t.complete) employee.taskCounts.complete++;
      if (t.failed) employee.taskCounts.failed++;
    });

    // Recalculate salary
    const salaryData = calculateSalary({
      baseSalary: employee.baseSalaryPerDay || 0,
      completed: employee.salaryStats.completedToday,
      failed: employee.salaryStats.failedToday,
      fastCompleted,
    });

    employee.todaySalary = salaryData.salary;
    employee.salaryStats.bonusPercent = salaryData.bonusPercent;
    employee.salaryStats.penaltyPercent = salaryData.penaltyPercent;

    await employee.save();

    // 🔥 Emit task updated to all clients
    io.emit("taskUpdated", {
      _id: employee._id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      tasks: employee.tasks,
      taskCounts: employee.taskCounts,
      todaySalary: employee.todaySalary,
      salaryStats: employee.salaryStats,
      updatedTask: task,
    });

    res.status(200).json(employee);
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* =====================================================
   ADD TASK
===================================================== */
export const addTaskToEmployee = async (req, res) => {
  try {
    const { employeeId, task } = req.body;
    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    employee.tasks.push({
      title: task.title,
      description: task.description,
      category: task.category,
      expectedTime: task.expectedTime,
      deadline: task.deadline || null,
      newTask: true,
      active: false,
      complete: false,
      failed: false,
      assignedAt: new Date(),
    });

    employee.taskCounts.newTask++;

    await employee.save();

    // 🔥 Emit task added
    io.emit("taskUpdated", {
      _id: employee._id,
      firstName: employee.firstName,
      tasks: employee.tasks,
      taskCounts: employee.taskCounts,
      todaySalary: employee.todaySalary,
      salaryStats: employee.salaryStats,
      updatedTask: employee.tasks[employee.tasks.length - 1],
    });

    res.status(200).json(employee);
  } catch (err) {
    console.error("Add Task Error:", err);
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   GET EMPLOYEES
===================================================== */
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    await Promise.all(employees.map(handleDailyReset));
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   UPDATE EMPLOYEE
===================================================== */
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Employee not found" });

    // 🔥 Emit employee updated
    io.emit("employeeAdded", updated);

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =====================================================
   DELETE EMPLOYEE
===================================================== */
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Employee.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Employee not found" });

    //  Emit employee deleted
    io.emit("employeeDeleted", id);

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
