import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { API_BASE } from "../config/api";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend, Filler);

export default function MonthlySalary() {
  const { id } = useParams();   
  const [summary, setSummary] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetchMonthlyData();
  }, [id]);

  const fetchMonthlyData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/employees/${id}/monthly-summary`);
      setSummary(res.data);

      const labels = res.data.monthlyData.map(item =>
        new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
      );

      const salary = res.data.monthlyData.map(item => item.salary);

      setGraphData({
        labels,
        datasets: [
          {
            label: "Monthly Salary Trend",
            data: salary,
            borderColor: "#10b981",
            backgroundColor: function(context) {
              const chart = context.chart;
              const {ctx, chartArea} = chart;
              if (!chartArea) return null;
              const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
              gradient.addColorStop(0, "rgba(16,185,129,0.1)");
              gradient.addColorStop(1, "rgba(16,185,129,0.4)");
              return gradient;
            },
            tension: 0.4,
            fill: true,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointBackgroundColor: "#10b981",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
          }
        ]
      });
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePaySalary = async () => {
    if (!amount) return alert("Enter amount");
    try {
      await axios.post(`${API_BASE}/employees/${id}/pay-salary`, { amount });
      alert("Salary Paid Successfully");
      setAmount("");
      fetchMonthlyData();
    } catch (err) {
      console.error("Payment Error:", err);
    }
  };

  if (loading) return <p className="text-white text-center mt-10">Loading...</p>;
  if (!summary) return <p className="text-white text-center mt-10">No data found</p>;

  return (
    <div className="p-6 md:p-10 bg-[#111] min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6 text-white">Monthly Salary Dashboard</h2>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1f1f1f] p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
          <h4 className="text-gray-300 text-sm mb-2">Total Salary</h4>
          <p className="text-2xl font-semibold text-white">₹ {summary.totalSalary}</p>
        </div>
        <div className="bg-[#1f1f1f] p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
          <h4 className="text-gray-300 text-sm mb-2">Completed Tasks</h4>
          <p className="text-2xl font-semibold text-emerald-400">{summary.totalCompleted}</p>
        </div>
        <div className="bg-[#1f1f1f] p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
          <h4 className="text-gray-300 text-sm mb-2">Failed Tasks</h4>
          <p className="text-2xl font-semibold text-red-500">{summary.totalFailed}</p>
        </div>
      </div>

      {/* ===== PREMIUM GRAPH ===== */}
      {graphData && (
        <div className="bg-[#1f1f1f] p-6 rounded-xl shadow-lg hover:shadow-2xl transition mb-8">
          <Line 
            data={graphData} 
            options={{
              responsive: true,
              plugins: {
                legend: { 
                  labels: { color: "#ffffff", font: { size: 14 } } 
                },
                tooltip: {
                  backgroundColor: "#1f1f1f",
                  titleColor: "#10b981",
                  bodyColor: "#ffffff",
                  borderColor: "#10b981",
                  borderWidth: 1,
                  padding: 10,
                }
              },
              scales: {
                x: {
                  ticks: { color: "#ffffff", font: { size: 12 } },
                  grid: { color: "rgba(255,255,255,0.1)" }
                },
                y: {
                  ticks: { color: "#ffffff", font: { size: 12 } },
                  grid: { color: "rgba(255,255,255,0.1)" }
                }
              }
            }} 
          />
        </div>
      )}

      {/* ===== PAY SALARY ===== */}
      <div className="bg-[#1f1f1f] p-6 rounded-xl shadow-lg hover:shadow-2xl transition max-w-md">
        <h3 className="text-xl font-semibold mb-4 text-white">Pay Salary</h3>
        <div className="flex items-center gap-4">
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-[#2a2a2a] text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          <button
            onClick={handlePaySalary}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-lg transition"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
