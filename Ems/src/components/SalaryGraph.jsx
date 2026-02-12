import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "../utils/chartSetup";
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
              borderWidth: 3,
              borderColor: "#10b981",
              backgroundColor: "rgba(16,185,129,0.15)",
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: "#10b981",
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

  if (loading)
    return (
      <div className="bg-[#111] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-400">Loading graph...</p>
      </div>
    );

  if (!chartData || chartData.labels.length === 0)
    return (
      <div className="bg-[#111] p-6 rounded-2xl border border-gray-800">
        <p className="text-gray-500">No salary data available</p>
      </div>
    );

  return (
    <div className="bg-[#111111] p-8 rounded-2xl border border-gray-800 shadow-xl h-[400px]">
      
      <h3 className="text-xl font-semibold mb-6">
        📈 Salary Trend Overview
      </h3>

      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: "index",
            intersect: false,
          },
          scales: {
            x: {
              ticks: { color: "#9ca3af" },
              grid: { color: "#1f2937" },
            },
            y: {
              ticks: {
                color: "#9ca3af",
                callback: function (value) {
                  return "₹ " + value;
                },
              },
              grid: { color: "#1f2937" },
            },
          },
          plugins: {
            legend: {
              labels: { color: "#e5e7eb" },
            },
            tooltip: {
              backgroundColor: "#1f2937",
              titleColor: "#fff",
              bodyColor: "#10b981",
              callbacks: {
                label: function (context) {
                  return "Salary: ₹ " + context.raw;
                },
              },
            },
          },
        }}
      />
    </div>
  );
};

export default SalaryGraph;
