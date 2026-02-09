const AdminSalaryAnalytics = ({ analytics }) => {
  if (!analytics) {
    return (
      <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
      
      <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
        <p className="text-gray-400 text-sm">Total Employees</p>
        <p className="text-2xl font-bold">
          {analytics.totalEmployees}
        </p>
      </div>

      <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
        <p className="text-gray-400 text-sm">Today's Total Salary</p>
        <p className="text-2xl font-bold text-green-400">
          ₹ {analytics.totalSalaryToday}
        </p>
      </div>

      <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
        <p className="text-gray-400 text-sm">Completed Tasks</p>
        <p className="text-2xl font-bold text-emerald-400">
          {analytics.totalCompleted}
        </p>
      </div>

      <div className="bg-[#111] p-6 rounded-xl border border-gray-800">
        <p className="text-gray-400 text-sm">Failed Tasks</p>
        <p className="text-2xl font-bold text-red-400">
          {analytics.totalFailed}
        </p>
      </div>

    </div>
  );
};

export default AdminSalaryAnalytics;
