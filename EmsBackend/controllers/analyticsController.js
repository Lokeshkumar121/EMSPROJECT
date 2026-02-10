import Employee from "../models/Employee.js";

export const getSalaryAnalytics = async (req, res) => {
  try {
    const employees = await Employee.find();

    let totalSalaryToday = 0;
    let totalCompleted = 0;
    let totalFailed = 0;

    employees.forEach(emp => {
      totalSalaryToday += emp.todaySalary || 0;
      totalCompleted += emp.salaryStats?.completedToday || 0;
      totalFailed += emp.salaryStats?.failedToday || 0;
    });

    res.json({
      totalEmployees: employees.length,
      totalSalaryToday,
      totalCompleted,
      totalFailed
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEmployeeSalaryGraph = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeId)
      .select("firstName lastName salaryHistory");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({
      name: `${employee.firstName} ${employee.lastName}`,
      history: employee.salaryHistory
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};