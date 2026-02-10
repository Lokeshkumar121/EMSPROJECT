import { Line } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE } from "../config/api";

export default function SalaryGraph({ employeeId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/analytics/salary/${employeeId}`)
      .then(res => {
        const labels = res.data.history.map(h =>
          new Date(h.date).toLocaleDateString()
        );
        const salaries = res.data.history.map(h => h.salary);

        setData({
          labels,
          datasets: [{
            label: "Daily Salary",
            data: salaries,
            borderWidth: 2
          }]
        });
      });
  }, [employeeId]);

  if (!data) return <p>Loading graph...</p>;

  return <Line data={data} />;
}
