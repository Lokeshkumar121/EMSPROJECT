import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../utils/chartSetup";
import { API_BASE } from "../config/api";

const EmployeeSalary = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/analytics/salary/${id}`)
      .then(res => res.json())
      .then(setData);
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl mb-4">{data.name} Salary Graph</h2>

      <Line
        data={{
          labels: data.history.map(h =>
            new Date(h.date).toLocaleDateString()
          ),
          datasets: [
            {
              label: "Salary",
              data: data.history.map(h => h.salary),
              borderWidth: 2,
              borderColor: "#10b981",
            },
          ],
        }}
      />
      <SalaryGraph employeeId={id} />
    </div>
  );
};

export default EmployeeSalary;
