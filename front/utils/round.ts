export const round = (data: number, digit: number) => {
  const pow = Math.pow(10, digit);

  return Math.round(data * pow) / pow;
};
