import { addHours, addMinutes } from "date-fns";
import { HOURS, MINUTES, TIME_LIMITS } from "../utils/constants/right";

interface ITimeLimit {
  validTo: Date | null;
  maxMinutes: number | null;
}

export const handleTimeLimit = (signText: string[]): ITimeLimit | null => {
  const timeLimit: ITimeLimit = {
    validTo: null,
    maxMinutes: null,
  };

  signText.forEach((content) => {
    const strings = content.split(" ");
    const match = strings.filter((subContent) =>
      TIME_LIMITS.some((constant) => subContent === constant)
    );
    if (match.length && strings.length === 2) {
      const [limit, unit] = strings;

      if (HOURS.includes(unit)) {
        timeLimit.validTo = addHours(Date.now(), Number(limit));
        timeLimit.maxMinutes = +limit * 60;
      } else if (MINUTES.includes(unit)) {
        timeLimit.validTo = addMinutes(Date.now(), Number(limit));
        timeLimit.maxMinutes = +limit;
      }
    }
  });

  if (timeLimit.maxMinutes && timeLimit.validTo) {
    return timeLimit;
  }
  return null;
};

export function getMaxParkingTime(text: string) {
  // const units = TIME_LIMITS.join("|");
  // TODO: use units variable in regex
  console.log(text)
  const timeMatch = text.match(/(\d+)\s*(h|tim|min)/);
  if (timeMatch) {
    const timeAmount = parseInt(timeMatch[1], 10);
    const timeUnit = timeMatch[2];
    if (HOURS.includes(timeUnit)) {
      return timeAmount * 60;
    } else if (MINUTES.includes(timeUnit)) {
      return timeAmount;
    }
  }
  return undefined;
}
