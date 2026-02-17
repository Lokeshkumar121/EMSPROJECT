export const calculateSalary = ({
  baseSalary,
  completed,
  failed,
  fastCompleted,
}) => {
let bonusPercent = Math.min(completed * 10, 50);   // max 50%
let penaltyPercent = Math.min(failed * 7, 30);     // max 30%


if (fastCompleted > 0) {
  bonusPercent = Math.min(bonusPercent + 10, 60);
}

  let salary =
    baseSalary +
    (baseSalary * bonusPercent) / 100 -
    (baseSalary * penaltyPercent) / 100;

  

  return {
    salary: Math.max(Math.round(salary), 0),
    bonusPercent,
    penaltyPercent,
  };
};
