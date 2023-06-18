const MINUTES_IN_HOUR = 60;

export const getRemainingTime = (hours: number) => {
  if (hours < 1 && hours * MINUTES_IN_HOUR > 4) {
    return `${(hours * MINUTES_IN_HOUR).toFixed(0)} минут`;
  }

  if (hours * MINUTES_IN_HOUR <= 4 && hours * MINUTES_IN_HOUR > 1) {
    return `${(hours * MINUTES_IN_HOUR).toFixed(0)} минуты`;
  }

  if (hours < 1 && hours * MINUTES_IN_HOUR > 1) {
    return `${(hours * MINUTES_IN_HOUR).toFixed(0)} минуту`;
  }

  return `${hours.toFixed(2)} часов`;
};
