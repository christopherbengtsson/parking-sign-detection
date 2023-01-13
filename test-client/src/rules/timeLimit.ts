import { HOURS, MINUTES } from '../utils/constants';

export function getMaxParkingTime(text: string) {
  // TODO: use units variable in regex

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
