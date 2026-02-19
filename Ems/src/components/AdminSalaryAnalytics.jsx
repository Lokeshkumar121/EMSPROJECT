const AdminSalaryAnalytics = ({ analytics }) => {
  if (!analytics || analytics.length === 0) {
    return (
      <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
        Loading analytics...
      </div>
    );
  }

  const totalEmployees = analytics.length;
  const totalSalaryToday = analytics.reduce((sum, emp) => sum + (emp.todaySalary || 0), 0);
  const totalCompleted = analytics.reduce((sum, emp) => sum + (emp.salaryStats?.completedToday || 0), 0);
  const totalFailed = analytics.reduce((sum, emp) => sum + (emp.salaryStats?.failedToday || 0), 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
      
      <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
        <p className="text-gray-400 text-sm">Total Employees</p>
        <p className="text-2xl font-bold">
          {totalEmployees}
        </p>
      </div>

      <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
        <p className="text-gray-400 text-sm">Today's Total Salary</p>
        <p className="text-2xl font-bold text-green-400">
          ₹ {totalSalaryToday}
        </p>
      </div>

      <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
        <p className="text-gray-400 text-sm">Completed Tasks</p>
        <p className="text-2xl font-bold text-emerald-400">
          {totalCompleted}
        </p>
      </div>

      <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
        <p className="text-gray-400 text-sm">Failed Tasks</p>
        <p className="text-2xl font-bold text-red-400">
          {totalFailed}
        </p>
      </div>

    </div>
  );
};

export default AdminSalaryAnalytics;
