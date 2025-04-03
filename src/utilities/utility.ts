export const changeToPrice = (price: number) => {
  const string = (price / 100).toFixed(2).toString();
  if (string.length >= 8 && string.length <= 9) {
    const backPart = string.slice(-6);
    const frontPart = string.slice(0, -6);
    return "$" + frontPart + "," + backPart;
  } else return "$" + string;
};
