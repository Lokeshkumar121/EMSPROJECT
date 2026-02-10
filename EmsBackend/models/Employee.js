import mongoose from "mongoose";
import { type } from "node:os";

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee"
  },
  tasks: [
    {
      title: String,
      description: String,
      date: Date,
      category: String,
      active: Boolean,
      complete: Boolean,
      failed: Boolean,
      newTask: Boolean,
      assignedAt: { type: Date, default: Date.now },
      completedAt: Date,
      expectedTime: Number, // minutes (optional for speed bonus)
    },
  ],
  taskCounts: {
    newTask: { type: Number, default: 0 },
    active: { type: Number, default: 0 },
    complete: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
  },
  // salary system 
    baseSalaryPerDay: {
    type: Number,
    default: 1000, // ₹1000 per day (change later)
  },

  todaySalary: {
    type: Number,
    default: 1000,
  },

  salaryStats: {
    completedToday: { type: Number, default: 0 },
    failedToday: { type: Number, default: 0 },
    bonusPercent: { type: Number, default: 0 },
    penaltyPercent: { type: Number, default: 0 },
  },
  salaryHistory: [
  {
    date: { type: Date, required: true },
    salary: { type: Number, required: true }
  }
],
} , { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
