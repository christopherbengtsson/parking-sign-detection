import { addDays, addHours, endOfDay, isFriday } from 'date-fns';
import { isDayBeforeRedDay, isRedDay } from '../utils/dayType';

export const pSign = () => {
  // monday - thursday
  if (!isRedDay() && !isDayBeforeRedDay() && !isFriday(Date.now())) {
    return addHours(Date.now(), 24);
  }

  let date = endOfDay(new Date());
  while (isDayBeforeRedDay(date) || isRedDay(date) || isFriday(date)) {
    date = addDays(date, 1);
  }
  return date;
};
