import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";


const API = "https://ems-backend-jy3w.onrender.com";

const EmployeeSalary = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/employees/${id}/salary`)
      .then(res => res.json())
      .then(setData);
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>{data.name} Salary Graph</h2>

      <Line
        data={{
          labels: data.salaryHistory.map(s =>
            new Date(s.date).toLocaleDateString()
          ),
          datasets: [
            {
              label: "Salary",
              data: data.salaryHistory.map(s => s.salary),
              borderWidth: 2,
            },
          ],
        }}
      />
     
    </div>
  );
};

export default EmployeeSalary;
