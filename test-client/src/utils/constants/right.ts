export const MINUTES = ["min", "mins", "minuter", "m"];
export const HOURS = ["tim", "timmar", "timme", "h", "t"];
export const TIME_LIMITS = [...HOURS, ...MINUTES];

export const WEEK = ["veckor", "vecka"];
export const DAY = ["dag", "dagar", "dagen"];
export const MONTH = ["månad", "månader"];

export const RIGHT_HAND_SIDE_WORDS = [
  ...TIME_LIMITS,
  ...WEEK,
  ...DAY,
  ...MONTH,
];
