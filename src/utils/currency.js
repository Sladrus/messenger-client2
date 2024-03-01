export function currencyFormat(num) {
  const number = Number(num);
  if (number / 1000 < 10) return number;

  return number?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
}
