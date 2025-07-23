export const generateDate = (targetType, targetValue) => {
  const currentDate = getCurrentDate();
  const [year, month, day] = currentDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (targetType === "day") {
    date.setDate(date.getDate() + targetValue);
  } else if (targetType === "month") {
    date.setMonth(date.getMonth() + targetValue);
  } else if (targetType === "year") {
    date.setFullYear(date.getFullYear() + targetValue);
  }

  const generatedYear = date.getFullYear();
  const generatedMonth = String(date.getMonth() + 1).padStart(2, "0");
  const generatedDay = String(date.getDate()).padStart(2, "0");

  return `${generatedYear}-${generatedMonth}-${generatedDay}`;
};

const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
