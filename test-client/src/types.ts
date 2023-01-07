export enum DayType {
  RED_DAY = 'redDay',
  DAY_BEFORE_RED_DAY = 'dayBeforeRedDay',
  WEEKDAY = 'weekDay',
}

export const isDayType = (value: string) =>
  Object.keys(DayType).includes(value);
