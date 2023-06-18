export const isPercentage = (value: string) => {
  return (
    (/^\d+$/.test(value) && Number(value) > 0 && Number(value) <= 100) ||
    value === ''
  );
};
