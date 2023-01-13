import {
  addHours,
  addMinutes,
  isWithinInterval,
  setHours,
  startOfDay,
  nextDay,
  isBefore,
} from 'date-fns';

import { DAYS, PROHIBITED_LABELS, TIME_LIMITS } from '../utils/constants';
import { validateDay } from '../utils/dayType';
import { pSign } from './pSign';
import { isWithinTimeRange } from './timeRange';
import { handleTimeLimit } from './timeLimit';

interface IResult {
  prohibited: boolean;
  validTo: Date | null;
  invalidTo: Date | null;
  maxMinutes: number | null;
  visitorRules: object;
  staffRules: object;
}
export const result: IResult = {
  prohibited: false,
  validTo: null,
  invalidTo: null,
  maxMinutes: null,
  visitorRules: {},
  staffRules: {},
};

export const validate = (data: any) => {
  console.log(data);
  data.forEach(
    (
      {
        textContent,
        label,
        nestedSigns,
      }: {
        textContent: string[];
        label: string;
        nestedSigns: any[];
      },
      signIndex: number,
    ) => {
      if (label === 'sign') {
        if (textContent?.length === 1) {
          if (textContent[0] === 'p') {
            result.validTo = pSign();
          } else if (textContent[0] === 'avgift') {
            // TODO more single words signs, besökare, personal, tillstånd
          }
        } else if (textContent?.length > 1) {
          // TODO: time limit validTo
          // validTo from range point of view

          const timeLimits: string[] = [];
          const timeRanges: string[] = [];
          textContent.forEach((text) => {
            if (TIME_LIMITS.includes(text)) {
              const textSplit = text.split(' ');
              if (textSplit.length === 2) {
                timeLimits.push(text);
              }
            }

            if (text.includes('-')) {
              const res = text.split('-');
              const one = res[0]?.trim();
              const two = res[1]?.trim();
              if (Number.isInteger(one) && Number.isInteger(two)) {
                timeRanges.push(`${one}-${two}`);
              }
            }
          });
          if (timeLimits.length) {
            const res = handleTimeLimit(timeLimits);
            if (res && res.maxMinutes && res.validTo) {
              result.validTo = res.validTo;
              result.maxMinutes = res.maxMinutes;
            }
          }
          if (timeRanges.length) {
            const res = isWithinTimeRange(timeRanges);
            if (res) {
              if (result.validTo && isBefore(res, result.validTo)) {
                result.validTo = res;
              }
            }
          }
        }
      } else if (PROHIBITED_LABELS.includes(label)) {
        // TODO: Handle prohibited signs
      }

      if (nestedSigns?.length) {
        if (PROHIBITED_LABELS.includes(nestedSigns[0].label)) {
          if (nestedSigns[0].content?.length > 1) {
            nestedSigns[0].content.forEach((text: string) => {
              if (DAYS.includes(text)) {
                if (validateDay(text)) {
                  result.prohibited = true;
                }
              } else if (text.includes('-')) {
                const [from, to] = text.split('-');

                const withinRange = isWithinInterval(Date.now(), {
                  start: setHours(new Date(), Number(from)),
                  end: setHours(new Date(), Number(to)),
                });
                result.prohibited = withinRange;
              }
            });
          }
        }
        // TODO: Nested P and nested p-skiva
      }
    },
  );

  console.log(result);
  return result;
};
