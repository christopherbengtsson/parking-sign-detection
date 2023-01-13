import { ITextContent } from "../../../../src/types";
import {
  getFullMatch,
  LIMITATION_KEYS,
  ALL,
  DAYS,
  ALL_DAYS,
  ODD,
} from "../../utils/constants/limitation";

export const checkLimitation = (textArray: string[]) => {
  const included: string[] = [];
  const limits = [];

  textArray.forEach((content, index) => {
    if (LIMITATION_KEYS.includes(content)) {
      included.push(content);
    }
  });

  if (included.includes(ALL)) {
    if (included.includes(DAYS)) {
      limits.push({ key: "ALL_DAYS", value: () => true });
    }
  }

  return limits.length ? limits : null;
};
