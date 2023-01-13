import {
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
  addDays,
} from 'date-fns';
import {
  FRIDAY,
  MONDAY,
  SATURDAY,
  SUNDAY,
  THURSDAY,
  TUESDAY,
  WEDNESDAY,
} from './constants';
import { isHoliday } from './holidays';

export const validateDay = (day: string) => {
  if (MONDAY.includes(day)) {
    return isMonday(Date.now());
  }
  if (TUESDAY.includes(day)) {
    return isTuesday(Date.now());
  }
  if (WEDNESDAY.includes(day)) {
    return isWednesday(Date.now());
  }
  if (THURSDAY.includes(day)) {
    return isThursday(Date.now());
  }
  if (FRIDAY.includes(day)) {
    return isFriday(Date.now());
  }
  if (SATURDAY.includes(day)) {
    return isSaturday(Date.now());
  }
  if (SUNDAY.includes(day)) {
    return isSunday(Date.now());
  }
  return false;
};

export const isPublicHoliday = (date = new Date(), daysToAdd = 0) => {
  if (daysToAdd > 0) {
    return isHoliday(addDays(date, daysToAdd));
  }

  return isHoliday(date);
};

export const isDayBeforeRedDay = (date = new Date(), daysToAdd = 0) => {
  if (daysToAdd > 0) {
    return (
      isSaturday(addDays(date, daysToAdd)) || isRedDay(date, daysToAdd + 1)
    );
  }

  return isSaturday(date) || isRedDay(date, daysToAdd + 1);
};

export const isRedDay = (date = new Date(), daysToAdd = 0) => {
  if (daysToAdd > 0) {
    return (
      isSunday(addDays(date, daysToAdd)) || isPublicHoliday(date, daysToAdd)
    );
  }

  return isSunday(date) || isPublicHoliday(date, daysToAdd);
};
