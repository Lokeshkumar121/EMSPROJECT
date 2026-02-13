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
  Legend
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

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
  const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    background: "#f4f6f9",
    minHeight: "100vh"
  },
  title: {
    marginBottom: "30px",
    fontSize: "28px",
    fontWeight: "bold"
  },
  cardContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap"
  },
  card: {
    flex: "1",
    minWidth: "200px",
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
  },
  amount: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#2c3e50"
  },
  success: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#27ae60"
  },
  danger: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#e74c3c"
  },
  chartCard: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    marginBottom: "30px"
  },
  paySection: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
  },
  payBox: {
    display: "flex",
    gap: "15px",
    marginTop: "15px",
    flexWrap: "wrap"
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    flex: "1",
    minWidth: "150px"
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3498db",
    color: "#fff",
    cursor: "pointer"
  }
};


 return (
  <div style={styles.container}>
    <h2 style={styles.title}>Monthly Salary Dashboard</h2>

    {/* ===== SUMMARY CARDS ===== */}
    <div style={styles.cardContainer}>
      <div style={styles.card}>
        <h4>Total Salary</h4>
        <p style={styles.amount}>₹ {summary.totalSalary}</p>
      </div>

      <div style={styles.card}>
        <h4>Completed Tasks</h4>
        <p style={styles.success}>{summary.totalCompleted}</p>
      </div>

      <div style={styles.card}>
        <h4>Failed Tasks</h4>
        <p style={styles.danger}>{summary.totalFailed}</p>
      </div>
    </div>

    {/* ===== GRAPH SECTION ===== */}
    {graphData && (
      <div style={styles.chartCard}>
        <Line data={graphData} />
      </div>
    )}

    {/* ===== PAY SALARY SECTION ===== */}
    <div style={styles.paySection}>
      <h3>Pay Salary</h3>

      <div style={styles.payBox}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.input}
        />

        <button onClick={handlePaySalary} style={styles.button}>
          Pay Salary
        </button>
      </div>
    </div>
  </div>
);

}
