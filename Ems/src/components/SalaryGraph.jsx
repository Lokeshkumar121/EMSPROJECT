import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "../utils/chartSetup"; // 🔥 MUST
import { API_BASE } from "../config/api";

const SalaryGraph = ({ employeeId }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!employeeId) return;

    const fetchSalary = async () => {
      try {
        const res = await axios.get(
          `${API_BASE}/analytics/salary/${employeeId}`
        );

        const history = res.data.history || [];

        const labels = history.map(h =>
          new Date(h.date).toLocaleDateString()
        );

        const salaries = history.map(h => h.salary);

        setChartData({
          labels,
          datasets: [
            {
              label: "Daily Salary",
              data: salaries,
              borderWidth: 2,
              borderColor: "#10b981",
              backgroundColor: "rgba(16,185,129,0.2)",
              tension: 0.4,
            },
          ],
        });
      } catch (err) {
        console.error("Salary graph error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalary();
  }, [employeeId]);

  if (loading) return <p className="text-gray-400">Loading graph...</p>;
  if (!chartData || chartData.labels.length === 0)
    return <p className="text-gray-500">No salary data available</p>;

  return (
    <div className="bg-[#111] p-6 rounded-xl border border-gray-800 mt-6">
      <h3 className="text-lg font-semibold mb-4 text-white">
        Salary Trend
      </h3>

      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: { color: "#9ca3af" },
              grid: { color: "#1f2937" },
            },
            y: {
              ticks: { color: "#9ca3af" },
              grid: { color: "#1f2937" },
            },
          },
          plugins: {
            legend: {
              labels: { color: "#e5e7eb" },
            },
          },
        }}
        height={300}
      />
    </div>
  );
};

export default SalaryGraph;
