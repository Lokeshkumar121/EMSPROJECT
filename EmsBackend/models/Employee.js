import mongoose from "mongoose";


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
    default: 0,
  },

  salaryStats: {
    completedToday: { type: Number, default: 0 },
    failedToday: { type: Number, default: 0 },
    bonusPercent: { type: Number, default: 0 },
    penaltyPercent: { type: Number, default: 0 },
  },
   lastSalaryResetDate: {
    type: Date,
    default: Date.now
  },
  salaryHistory: [
    {
      date: { type: Date, required: true },
      salary: { type: Number, required: true },
      completed: { type: Number, default: 0 },
      failed: { type: Number, default: 0 }
    }
  ],
  // UPI ID
  upiId: {
    type: String
  },
  // Salary payment tracking
  salaryPaidHistory: [
    {
      amount: Number,
      date: Date,
      transactionId: String
    }
  ],
}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
