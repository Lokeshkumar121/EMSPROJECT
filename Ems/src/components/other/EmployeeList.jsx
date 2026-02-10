import { useNavigate } from "react-router-dom";

const EmployeeList = ({ employees }) => {
  const navigate = useNavigate();

  return (
    <table>
      <tbody>
        {employees.map(emp => (
          <tr key={emp._id}>
            <td
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate(`/employee/${emp._id}`)}
            >
              {emp.firstName} {emp.lastName}
            </td>
            <td>₹{emp.todaySalary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeList;
