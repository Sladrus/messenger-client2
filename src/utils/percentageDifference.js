export const percentageDifference = (num1, num2) => {
  //   let difference = (Math.abs(num1 - num2) / ((num1 + num2) / 2)) * 100;
  const difference = ((num1 - num2) * 100) / num2;
  return parseFloat(difference).toFixed(2);
};
