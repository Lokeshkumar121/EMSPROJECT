export const calculateSalary = ({
  baseSalary,
  completed,
  failed,
  fastCompleted,
}) => {
  let salary = baseSalary;

  // ✅ 10% bonus per completed task
  if (completed > 0) {
    salary += baseSalary * 0.10 * completed;
  }

  // ⚡ Fast task bonus
  if (fastCompleted > 0) {
    salary += baseSalary * 0.10 * fastCompleted;
  }

  // ❌ 7% penalty per failed task
  if (failed > 0) {
    salary -= baseSalary * 0.07 * failed;
  }

  return Math.max(Math.round(salary), 0);
};
