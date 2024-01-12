export const percentageDifference = (num1, num2) => {
  const difference = ((num1 - num2) * 100) / num2;
  return parseFloat(Math.abs(difference)).toFixed(2);
};
