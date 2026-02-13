import Employee from "../models/Employee.js";
import { io } from "../server.js"; // ✅ Import Socket.io instance
import { calculateSalary } from "../utils/calculateSalary.js";
const isNewDay = (date) => {
  if (!date) return true;
  const today = new Date().toDateString();
  return new Date(date).toDateString() !== today;
};
// 🔹 Get all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find(); // get all employees
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Add new employee
export const addEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if email already exists
    const exists = await Employee.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      password,
      tasks: [],
      taskCounts: { newTask: 0, active: 0, complete: 0, failed: 0 },
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🔹 Update employee info
export const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// 🔹 Delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) return res.status(404).json({ message: "Employee not found" });

    res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// 🔹 Add task to an employee
export const addTaskToEmployee = async (req, res) => {
  try {
    const { employeeId, task } = req.body;
    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    // Add task
    employee.tasks.push({
   title: task.title,
      description: task.description,
      category: task.category,
      expectedTime: task.expectedTime,
  newTask: true,
  active: false,
  complete: false,
  failed: false,
  assignedAt: new Date()
});
employee.taskCounts.newTask++;

    // Update taskCounts automatically
    // if (task.newTask) employee.taskCounts.newTask += 1;
    // if (task.active) employee.taskCounts.active += 1;
    // if (task.complete) employee.taskCounts.complete += 1;
    // if (task.failed) employee.taskCounts.failed += 1;

    await employee.save();
      // 🔔 Emit notification to employee in real-time
    io.to(employeeId).emit("newTask", {
      // taskId: task._id || employee.tasks.length - 1,
      title: task.title,
      description: task.description,
    });
    res.status(200).json(employee);
  } catch (err) {
    console.error("ADD TASK ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Update task status for an employee
export const updateTaskStatus = async (req, res) => {
  try {
    const { employeeId, taskIndex, status } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const task = employee.tasks[taskIndex];
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // ================= REMOVE OLD COUNTS =================

    if (task.newTask && employee.taskCounts.newTask > 0)
      employee.taskCounts.newTask--;

    if (task.active && employee.taskCounts.active > 0)
      employee.taskCounts.active--;

    if (task.complete && employee.taskCounts.complete > 0) {
      employee.taskCounts.complete--;
      if (employee.salaryStats.completedToday > 0)
        employee.salaryStats.completedToday--;
    }

    if (task.failed && employee.taskCounts.failed > 0) {
      employee.taskCounts.failed--;
      if (employee.salaryStats.failedToday > 0)
        employee.salaryStats.failedToday--;
    }

    // ================= RESET FLAGS =================

    task.newTask = false;
    task.active = false;
    task.complete = false;
    task.failed = false;

    let fastCompleted = 0;

    // ================= SET NEW STATUS =================

    if (status === "new") {
      task.newTask = true;
      employee.taskCounts.newTask++;
    }

    if (status === "active") {
      task.active = true;
      employee.taskCounts.active++;
    }

    if (status === "complete") {
      task.complete = true;
      task.completedAt = new Date();

      employee.taskCounts.complete++;
      employee.salaryStats.completedToday++;

      // Fast completion bonus
      if (
        task.expectedTime &&
        (task.completedAt - task.assignedAt) / 60000 <= task.expectedTime
      ) {
        fastCompleted = 1;
      }
    }

    if (status === "failed") {
      task.failed = true;
      employee.taskCounts.failed++;
      employee.salaryStats.failedToday++;
    }

    // ================= SALARY CALCULATION =================

    employee.todaySalary = calculateSalary({
      baseSalary: employee.baseSalaryPerDay,
      completed: employee.salaryStats.completedToday,
      failed: employee.salaryStats.failedToday,
      fastCompleted,
    });

    // ================= UPDATE TODAY ENTRY IN HISTORY =================

    const todayString = new Date().toDateString();

    const existingEntry = employee.salaryHistory.find(
      (s) => new Date(s.date).toDateString() === todayString
    );

    if (!existingEntry) {
      employee.salaryHistory.push({
        date: new Date(),
        salary: employee.todaySalary,
        completed: employee.salaryStats.completedToday,
        failed: employee.salaryStats.failedToday,
      });
    } else {
      existingEntry.salary = employee.todaySalary;
      existingEntry.completed = employee.salaryStats.completedToday;
      existingEntry.failed = employee.salaryStats.failedToday;
    }

    await employee.save();

    // ================= SOCKET EMIT =================

    io.emit("taskStatusUpdate", {
      employeeId,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      status,
      todaySalary: employee.todaySalary,
    });

    res.status(200).json({
      message: "Task updated & salary recalculated",
      todaySalary: employee.todaySalary,
      stats: employee.salaryStats,
    });

  } catch (err) {
    console.error("UPDATE TASK ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


