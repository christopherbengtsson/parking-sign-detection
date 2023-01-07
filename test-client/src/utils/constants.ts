export const PROHIBITED_LABELS = ["forbidden_parking"];

export const PREREQUISITES = ["avgift", "tillstånd"];

export const PARKING_DISK = ["p-skiva", "pskiva", "parkeringsskiva"];

export const MINUTES = ["min", "mins", "minuter", "m"];
export const HOURS = ["tim", "timmar", "timme", "h", "t"];
export const TIME_LIMITS = [...HOURS, ...MINUTES];

export const MONDAY = ["mån", "månd", "måndag", "måndagen", "måndagar"];
export const TUESDAY = ["tis", "tisd", "tisdag", "tisdagen", "tisdagar"];
export const WEDNESDAY = ["ons", "onsd", "onsdag", "onsdagen", "onsdagar"];
export const THURSDAY = [
  "tor",
  "tors",
  "torsd",
  "torsdag",
  "torsdagen",
  "torsdagar",
];
export const FRIDAY = ["fre", "fred", "fredag", "fredagen", "fredagar"];
export const SATURDAY = ["lör", "lörd", "lördag", "lördagen", "lördagar"];
export const SUNDAY = ["sön", "sönd", "söndag", "söndagen", "söndagar"];
export const DAYS = [
  ...MONDAY,
  ...TUESDAY,
  ...WEDNESDAY,
  ...THURSDAY,
  ...FRIDAY,
  ...SATURDAY,
  ...SUNDAY,
  "alla dagar",
];

export const ALL = ["alla"];
export const ODD = ["udda"];
export const EVEN = ["jämna"];

export const WEEK = ["veckor", "vecka"];
export const DAY = ["dag", "dagar", "dagen"];
export const MONTH = ["månad", "månader"];

export const MONTHS = [
  "jan",
  "januari",
  "feb",
  "februari",
  "mar",
  "mars",
  "apr",
  "april",
  "maj",
  "jun",
  "juni",
  "jul",
  "juli",
  "aug",
  "augusti",
  "sep",
  "sept",
  "september",
  "okt",
  "oktober",
  "nov",
  "november",
  "dec",
  "december",
];

export const LIMITATIONS = [
  ...PREREQUISITES,
  ...PARKING_DISK,
  ...TIME_LIMITS,
  ...DAYS,
  ...DAY,
  ...WEEK,
  ...MONTH,
  ...ODD,
  ...EVEN,
];
