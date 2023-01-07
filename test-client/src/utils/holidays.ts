import {
  isNewYearsDay,
  isEpiphany,
  isGoodFriday,
  isEasterSunday,
  isEasterMonday,
  isLabourDay,
  isAscensionDay,
  isPentecost,
  isNationalDay,
  isMidsummerDay,
  isAllSaintsDay,
  isChristmasDay,
  isBoxingDay,
} from 'se-bank-holidays';

export const isHoliday = (date = new Date()) => {
  return (
    isNewYearsDay(date) ||
    isEpiphany(date) ||
    isGoodFriday(date) ||
    isEasterSunday(date) ||
    isEasterMonday(date) ||
    isLabourDay(date) ||
    isAscensionDay(date) ||
    isPentecost(date) ||
    isNationalDay(date) ||
    isMidsummerDay(date) ||
    isAllSaintsDay(date) ||
    isChristmasDay(date) ||
    isBoxingDay(date)
  );
};
