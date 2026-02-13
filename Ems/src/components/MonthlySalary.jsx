import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { API_BASE } from "../config/api";

export default function MonthlySalary() {

  const { id } = useParams();   // ✅ GET ID FROM URL
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
      const res = await axios.get(
        `${API_BASE}/employees/${id}/monthly-summary`
      );
       console.log("API RESPONSE:", res.data); 
      setSummary(res.data);

      const labels = res.data.monthlyData.map(item =>
        new Date(item.date).toLocaleDateString()
      );

      const salary = res.data.monthlyData.map(item => item.salary);

      setGraphData({
        labels,
        datasets: [
          {
            label: "Monthly Salary Trend",
            data: salary,
            borderColor: "green",
            tension: 0.3,
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
      await axios.post(
        `${API_BASE}/employees/${id}/pay-salary`,
        { amount }
      );

      alert("Salary Paid Successfully");
      setAmount("");
      fetchMonthlyData();

    } catch (err) {
      console.error("Payment Error:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!summary) return <p>No data found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Monthly Salary Dashboard</h2>

      {/* ===== SUMMARY ===== */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div>
          <h4>Total Salary</h4>
          <p>₹ {summary.totalSalary}</p>
        </div>

        <div>
          <h4>Completed Tasks</h4>
          <p>{summary.totalCompleted}</p>
        </div>

        <div>
          <h4>Failed Tasks</h4>
          <p>{summary.totalFailed}</p>
        </div>
      </div>

      {/* ===== GRAPH ===== */}
      {graphData && (
        <div style={{ width: "600px" }}>
          <Line data={graphData} />
        </div>
      )}

      {/* ===== PAY SALARY ===== */}
      <div style={{ marginTop: "30px" }}>
        <h3>Pay Salary</h3>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={handlePaySalary}>
          Pay Salary
        </button>
      </div>
    </div>
  );
}
