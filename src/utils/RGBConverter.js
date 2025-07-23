export const convertRGBString = (inputStr) => {
  const values = inputStr.match(/\d+/g);
  const [r, g, b] = values.map(Number);
  const resultStr = `RGB: ${r}, ${g}, ${b}`;
  return resultStr;
};
