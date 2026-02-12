import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_BASE } from "../config/api";
import SalaryGraph from "../components/SalaryGraph";

const EmployeeSalary = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/employees/${id}`)
      .then(res => res.json())
      .then(data => {
        setEmployee(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-400">
        Loading salary data...
      </div>
    );

  if (!employee)
    return (
      <div className="text-center text-red-400 mt-10">
        Employee not found
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6 text-white">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {employee.name}
        </h1>
        <p className="text-gray-400">
          Salary Analytics Dashboard
        </p>
      </div>

      {/* Graph Card */}
      <SalaryGraph employeeId={id} />
    </div>
  );
};

export default EmployeeSalary;
