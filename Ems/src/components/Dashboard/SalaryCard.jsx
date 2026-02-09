import React from 'react'
const SalaryCard = ({ employee }) => {
  return (
    <div className="bg-[#111111] border border-gray-800 rounded-2xl p-6 mt-6 shadow-lg flex flex-col sm:flex-row justify-between items-center gap-4">

      <div>
        <h3 className="text-gray-400 text-sm">Today's Salary</h3>
        <p className="text-3xl font-bold text-green-400">
          ₹ {employee.todaySalary ?? employee.baseSalaryPerDay}
        </p>
      </div>

      <div className="flex gap-6 text-sm text-gray-300">
        <div>
          <p>✅ Completed</p>
          <p className="font-bold text-center">
            {employee.salaryStats?.completedToday ?? 0}
          </p>
        </div>

        <div>
          <p>❌ Failed</p>
          <p className="font-bold text-center">
            {employee.salaryStats?.failedToday ?? 0}
          </p>
        </div>

        <div>
          <p>⚡ Bonus</p>
          <p className="font-bold text-green-400 text-center">
            +{employee.salaryStats?.bonusPercent ?? 0}%
          </p>
        </div>

        <div>
          <p>⬇ Penalty</p>
          <p className="font-bold text-red-400 text-center">
            -{employee.salaryStats?.penaltyPercent ?? 0}%
          </p>
        </div>
      </div>
    </div>
  );
};


export default SalaryCard;
