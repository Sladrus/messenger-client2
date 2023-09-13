export const generatePastelColor = (str) => {
  // Преобразуем строку в число
  let num = 0;
  for (let i = 0; i < str.length; i++) {
    num += str.charCodeAt(i);
  }

  // Генерируем RGB компоненты цвета
  const red = (num * 15) % 256;
  const green = (num * 12) % 256;
  const blue = (num * 9) % 256;

  // Преобразуем RGB значения в HEX
  const hex = rgbToHex(red, green, blue);

  return hex;
};

function rgbToHex(r, g, b) {
  const redHex = r.toString(16).padStart(2, '0');
  const greenHex = g.toString(16).padStart(2, '0');
  const blueHex = b.toString(16).padStart(2, '0');

  return `#${redHex}${greenHex}${blueHex}`;
}
