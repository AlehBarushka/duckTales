export const isValidPercentage = (value: string) => {
  return (/^\d+$/.test(value) && Number(value) > 0) || value === '';
};
