import {MILLISECONDS_IN_HOUR} from '../../../../../store/constants';
import {IBar} from '../../../../../store/slices/types';

type Params = Omit<IBar, 'id'>;

export const useCardsValues = (barItem: Params) => {
  let width;
  const total = barItem.endTime - barItem.startTime || 1;
  let current;
  let percentage = 0;
  let remainingTime = 0;

  barItem.type === 'asc'
    ? (remainingTime =
        (barItem.endTime -
          (new Date().getTime() + (total * barItem.currentUpdate) / 100)) /
        MILLISECONDS_IN_HOUR)
    : (remainingTime =
        (barItem.endTime -
          (new Date().getTime() - (total * barItem.currentUpdate) / 100)) /
        MILLISECONDS_IN_HOUR);

  if (barItem.startTime - barItem.endTime === 0) {
    current = 0;
  } else {
    barItem.type === 'asc'
      ? (current =
          new Date().getTime() -
          barItem.startTime +
          (total * barItem.currentUpdate) / 100)
      : (current =
          new Date().getTime() -
          barItem.startTime -
          (total * barItem.currentUpdate) / 100);
  }

  /** Считаю проценты заполнения бара в зависимости от типа бара*/
  if (barItem.type === 'asc' && (1 - (total - current) / total) * 100 > 100) {
    percentage = 100;
  } else if (
    barItem.type === 'asc' &&
    (1 - (total - current) / total) * 100 < 0
  ) {
    percentage = 0;
  } else if (
    barItem.type === 'asc' &&
    (1 - (total - current) / total) * 100 > 0 &&
    (1 - (total - current) / total) * 100 < 100
  ) {
    percentage = (1 - (total - current) / total) * 100;
  }

  if (barItem.type === 'desc' && ((total - current) / total) * 100 > 100) {
    percentage = 100;
  } else if (barItem.type === 'desc' && ((total - current) / total) * 100 < 0) {
    percentage = 0;
  } else if (
    barItem.type === 'desc' &&
    ((total - current) / total) * 100 > 0 &&
    ((total - current) / total) * 100 < 100
  ) {
    percentage = ((total - current) / total) * 100;
  }
  /** -----------------------------------------------------------*/

  /** Считаю ширину заполнения бара в зависимости от типа бара*/
  if (barItem.type === 'asc') {
    width = 1 - (total - current) / total;
  } else {
    width = (total - current) / total;
  }

  if (width > 1) {
    width = 1;
  }

  if (width < 0) {
    width = 0;
  }
  /** -----------------------------------------------------------*/

  return {
    width,
    percentage,
    remainingTime,
  };
};
