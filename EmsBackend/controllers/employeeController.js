import Employee from "../models/Employee.js";
import { io } from "../server.js"; // ✅ Import Socket.io instance

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
    console.log("BODY =>", req.body);
    const { employeeId, task } = req.body;
        console.log("EMP ID =>", employeeId);

    console.log("TASK =>", task);
    const employee = await Employee.findById(employeeId);
    console.log("EMPLOYEE FOUND =>", employee);
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    // Add task
    employee.tasks.push(task);

    // Update taskCounts automatically
    if (task.newTask) employee.taskCounts.newTask += 1;
    if (task.active) employee.taskCounts.active += 1;
    if (task.complete) employee.taskCounts.complete += 1;
    if (task.failed) employee.taskCounts.failed += 1;

    await employee.save();
      // 🔔 Emit notification to employee in real-time
    io.to(employeeId).emit("newTask", {
      taskId: task._id || employee.tasks.length - 1,
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

    // 🔥 REMOVE OLD COUNTS
    if (task.newTask) employee.taskCounts.newTask--;
    if (task.active) employee.taskCounts.active--;
    if (task.complete) employee.taskCounts.complete--;
    if (task.failed) employee.taskCounts.failed--;

    // 🔥 RESET ALL FLAGS
    task.newTask = false;
    task.active = false;
    task.complete = false;
    task.failed = false;

    // 🔥 SET NEW STATUS
      // 🔥 SET NEW STATUS
    if (status === "new") task.newTask = true;
    if (status === "active") task.active = true;
    if (status === "complete") task.complete = true;
    if (status === "failed") task.failed = true;

    // 🔥 ADD NEW COUNTS
     // 🔥 ADD NEW COUNTS
    if (task.newTask) employee.taskCounts.newTask++;
    if (task.active) employee.taskCounts.active++;
    if (task.complete) employee.taskCounts.complete++;
    if (task.failed) employee.taskCounts.failed++;

    await employee.save();
     io.emit("taskStatusUpdate", {
      employeeId,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      taskId: task._id || taskIndex,
      status,
    });
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

