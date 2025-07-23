export const rgbaToHex = (rgba) => {
  const [r, g, b, a] = rgba
    .substring(5, rgba.length - 1)
    .replace(/ /g, "")
    .split(",")
    .map((value) => parseInt(value, 10));

  const toHex = (value) => {
    const hex = value.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const rgbStringToHex = (rgbString) => {
  const rgbValues = rgbString.match(/\d+/g);

  if (rgbValues && rgbValues.length === 3) {
    const hexValues = rgbValues.map((value) =>
      parseInt(value).toString(16).padStart(2, "0")
    );

    const hexColor = "#" + hexValues.join("");
    return hexColor;
  } else {
    return null;
  }
};

export const convertRGBToString = (originalRGB) => {
  const originalValues = originalRGB.match(/\d+/g).map(Number);
  const newValues = [217, 140, 154];

  // Assuming both arrays have the same lengths
  const convertedRGB = originalValues.map(
    (value, index) => value + newValues[index]
  );

  return `rgb(${convertedRGB.join(", ")})`;
};
