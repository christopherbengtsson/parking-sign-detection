export const ALL = "alla";
export const ODD = "udda";
export const EVEN = "jämna";
export const DATES = "datum";
export const DAYS = "dagar";
export const WEEKS = "veckor";

export const LIMITATION_KEYS = [ALL, ODD, EVEN, DATES, DAYS, WEEKS];

export const ALL_DAYS = `${ALL} ${DAYS}`;
export const ODD_DAYS = `${ODD} ${DAYS}`;
export const EVEN_DAYS = `${EVEN} ${DAYS}`;

export const ODD_DATES = `${ODD} ${DATES}`;
export const EVEN_DATES = `${EVEN} ${DATES}`;

export const ODD_WEEKS = `${ODD} ${WEEKS}`;
export const EVEN_WEEKS = `${EVEN} ${WEEKS}`;

export const getMatch = (text: string, textAfter?: string) => {
  if (!text?.length) return null;

  const match = getFullMatch(text);

  if (match) return match;

  if (!textAfter?.length) return null;

  if (text === ALL || text === ODD || text === EVEN) {
    return getFullMatch(`${text.trim()} ${textAfter.trim()}`);
  }

  return null;
};

export const getFullMatch = (text: string) => {
  switch (text) {
    case ALL_DAYS:
      return "ALL_DAYS";

    case ODD_DAYS:
      return "ODD_DAYS";

    case EVEN_DAYS:
      return "EVEN_DAYS";

    case ODD_WEEKS:
      return "ODD_WEEKS";

    case EVEN_WEEKS:
      return "EVEN_WEEKS";

    default:
      return null;
  }
};
