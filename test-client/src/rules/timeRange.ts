import {
  addDays,
  addMinutes,
  isAfter,
  isBefore,
  isTomorrow,
  isWithinInterval,
  setHours,
  startOfDay,
} from "date-fns";
import { DayType } from "../types";
import { isDayBeforeRedDay, isRedDay } from "../utils";

/**
 * if no ranges
 *  return null
 *
 * check current day-type
 * check if ranges includes day-type
 *  if current datetime is before range start or if its within range
 *    TODO: handle possibility if this returned validTo < max parking time
 *    return validTo from range
 *
 *  if current datetime is after range
 *    re run function with tomorrow from 00:00
 *
 * re run function with tomorrow from 00:00
 */

export const timeRangeRegex = /(\d+)-(\d+)/;
// const timeRangeMatch = timeRangeRegex.exec(text.content);

interface IRange {
  from: number;
  to: number;
}
interface IRanges {
  weekDay: IRange;
  dayBeforeRedDay: IRange;
  redDay: IRange;
}

const setRange = (rangeString: string): IRange | null => {
  const res = rangeString.replace(/[()]/g, "").split("-");
  const from = res[0]?.trim();
  const to = res[1]?.trim();
  if (
    !Number.isInteger(Number(from?.trim())) ||
    !Number.isInteger(Number(to?.trim()))
  ) {
    return null;
  }
  return { from: Number(from), to: Number(to) };
};

const setRangesFromSignText = (signText: string[]) =>
  signText.reduce((previous, current) => {
    if (current.includes("-")) {
      let range: IRange | null;
      let dayType: DayType;
      if (current.startsWith("(") && current.endsWith(")")) {
        range = setRange(current);
        dayType = DayType.DAY_BEFORE_RED_DAY;
      } else if (previous.dayBeforeRedDay) {
        range = setRange(current);
        dayType = DayType.RED_DAY;
      } else {
        range = setRange(current);
        dayType = DayType.WEEKDAY;
      }

      if (range && dayType) {
        previous[dayType] = range;
      }
    }

    return previous;
  }, {} as IRanges);

const getCurrentDayType = (date: Date) => {
  if (isRedDay(date)) {
    return DayType.RED_DAY;
  } else if (isDayBeforeRedDay(date)) {
    return DayType.DAY_BEFORE_RED_DAY;
  } else {
    return DayType.WEEKDAY;
  }
};

const getTomorrow = (date: Date) => startOfDay(addDays(date, 1));

const getMaxDateTime = (
  currentDate: Date,
  rangeFromDate: Date,
  maxMinutes: number
): Date => {
  if (isAfter(currentDate, rangeFromDate)) {
    return addMinutes(currentDate, maxMinutes);
  }

  return addMinutes(rangeFromDate, maxMinutes);
};

export const isWithinTimeRange = ({
  signText,
  currentDate = new Date(),
  offRangeToday = false,
  maxMinutes,
  textLimitation,
}: {
  signText: string[];
  currentDate?: Date;
  offRangeToday?: boolean;
  maxMinutes?: number;
  textLimitation?: any;
}): {
  from: Date;
  to: Date;
  inRangeToday: boolean;
  currentlyInRange: boolean;
} | null => {
  const ranges = setRangesFromSignText(signText);

  if (!Object.values(ranges).length) return null;

  if (textLimitation) {
    return handleTextLimitation(ranges, textLimitation);
  }

  const dayType = getCurrentDayType(currentDate);

  if (!ranges[dayType]) {
    return isWithinTimeRange({
      signText,
      currentDate: getTomorrow(currentDate),
      offRangeToday: true,
      maxMinutes,
    });
  }

  const { from: rangeFromHour, to: rangeToHour } = ranges[dayType];
  const rangeFromDate = setHours(startOfDay(currentDate), rangeFromHour);
  let rangeToDate = setHours(startOfDay(currentDate), rangeToHour);

  if (isBefore(rangeToDate, rangeFromDate)) {
    rangeToDate = addDays(rangeToDate, 1);
  }

  const isWithinRange = isWithinInterval(currentDate, {
    start: rangeFromDate,
    end: rangeToDate,
  });

  if (isWithinRange || isBefore(currentDate, rangeFromDate)) {
    if (maxMinutes && maxMinutes > 0) {
      let toDateTime = getMaxDateTime(currentDate, rangeFromDate, maxMinutes);
      if (isAfter(toDateTime, rangeToDate)) {
        const tomorrowRange = isWithinTimeRange({
          signText,
          currentDate: getTomorrow(currentDate),
          offRangeToday,
          maxMinutes,
        });

        if (tomorrowRange?.to) toDateTime = tomorrowRange.to;
      }

      return {
        from: rangeFromDate,
        to: toDateTime,
        inRangeToday: !offRangeToday,
        currentlyInRange: !offRangeToday && isWithinRange,
      };
    }

    return {
      from: rangeFromDate,
      to: rangeToDate,
      inRangeToday: !offRangeToday,
      currentlyInRange: !offRangeToday && isWithinRange,
    };
  }

  if (isAfter(currentDate, rangeToDate)) {
    return isWithinTimeRange({
      signText,
      currentDate: getTomorrow(currentDate),
      offRangeToday: true,
      maxMinutes,
    });
  }

  console.warn("This shouldn't happen (?)");
  throw new Error("isWithinTimeRange()` returning invalid null value");
};

function handleTextLimitation(
  ranges: IRanges,
  textLimitation: any
): {
  from: Date;
  to: Date;
  inRangeToday: boolean;
  currentlyInRange: boolean;
} | null {
  const currentDate = new Date();
  const { from, to } = ranges.weekDay;
  const rangeFromDate = setHours(startOfDay(currentDate), from);
  let rangeToDate = setHours(startOfDay(currentDate), to);

  if (isBefore(rangeToDate, rangeFromDate)) {
    rangeToDate = addDays(rangeToDate, 1);
  }

  const inRange = isWithinInterval(currentDate, {
    start: rangeFromDate,
    end: rangeToDate,
  });

  const returnResult = () => {
    if (inRange) {
      return {
        from: rangeFromDate,
        to: rangeToDate,
        inRangeToday: true,
        currentlyInRange: true,
      };
    } else if (isTomorrow(from)) {
      return {
        from: addDays(rangeFromDate, 1),
        to: addDays(rangeFromDate, 1),
        inRangeToday: false,
        currentlyInRange: false,
      };
    } else {
      return {
        from: rangeFromDate,
        to: rangeToDate,
        inRangeToday: true,
        currentlyInRange: false,
      };
    }
  };

  switch (textLimitation) {
    case "ALL_DAYS":
      return returnResult();
    case "ODD_DAYS":
      return null;
    case "EVEN_DAYS":
      return null;
    case "ODD_WEEKS":
      return null;
    case "EVEN_WEEKS":
      return null;

    default:
      return null;
  }
}
