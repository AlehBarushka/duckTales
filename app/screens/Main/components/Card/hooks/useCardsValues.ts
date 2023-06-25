import {MILLISECONDS_IN_HOUR} from '../../../../../store/constants';
import {IBar} from '../../../../../store/slices/types';

type Params = Omit<IBar, 'id'>;

export const useCardsValues = (barItem: Params) => {
  let width;
  let total = barItem.endTime - barItem.startTime;
  let current;
  let percentage = 0;
  let remainingTime =
    (barItem.endTime - new Date().getTime()) / MILLISECONDS_IN_HOUR;

  if (barItem.startTime - barItem.endTime === 0) {
    current = 0;
  } else {
    current = new Date().getTime() - barItem.startTime;
  }

  if (barItem.startTime - barItem.endTime === 0) {
    total = 1;
  }

  if (barItem.type === 'asc') {
    (1 - (total - current) / total) * 100 > 100
      ? (percentage = 100)
      : (percentage = (1 - (total - current) / total) * 100);
  } else {
    ((total - current) / total) * 100 < 0
      ? (percentage = 0)
      : (percentage = (total - current) / total) * 100;
  }

  if (barItem.type === 'asc') {
    1 - (total - current) / total > 1
      ? (width = 1)
      : (width = 1 - (total - current) / total);
  } else {
    (total - current) / total < 0
      ? (width = 0)
      : (width = (total - current) / total);
  }

  return {
    width,
    percentage,
    remainingTime,
  };
};
