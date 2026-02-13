import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "../utils/chartSetup";
import { API_BASE } from "../config/api";

export default function SalaryGraph({ employeeId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!employeeId) return;

    axios.get(`${API_BASE}/employees/${employeeId}/salary`)
      .then(res => {
        console.log("API Response:", res.data);

        const history = res.data.salaryHistory || [];

        const labels = history.map(h =>
          new Date(h.date).toLocaleDateString()
        );

        const salaries = history.map(h => h.salary);

        setData({
          labels,
          datasets: [{
            label: "Daily Salary",
            data: salaries,
            borderColor: "rgb(75,192,192)",
            backgroundColor: "rgba(75,192,192,0.2)",
            tension: 0.3,
            borderWidth: 2
          }]
        });
      })
      .catch(err => {
        console.error("Salary fetch error:", err);
      });

  }, [employeeId]);

  if (!data) return <p>Loading graph...</p>;

  return <Line data={data} />;
}
