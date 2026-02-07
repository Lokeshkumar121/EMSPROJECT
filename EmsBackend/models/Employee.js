import mongoose from "mongoose";
import { type } from "node:os";

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password : {type : String , required : true },
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
    },
  ],
  taskCounts: {
    newTask: { type: Number, default: 0 },
    active: { type: Number, default: 0 },
    complete: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
  },
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
