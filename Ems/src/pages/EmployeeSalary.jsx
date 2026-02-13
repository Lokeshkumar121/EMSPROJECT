import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../context/AuthProvider";
import SalaryGraph from "../components/SalaryGraph";

const EmployeeSalary = () => {
  const { id } = useParams();
  const { userData } = useContext(Authcontext);

  const employee = userData.find(emp => emp._id === id);

  if (!employee) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-400">
        Employee not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] p-6 text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {employee.firstName} {employee.lastName}
        </h1>
        <p className="text-gray-400">
          Salary Analytics Dashboard
        </p>
      </div>

      <SalaryGraph employeeId={id} />
    </div>
  );
};

export default EmployeeSalary;
