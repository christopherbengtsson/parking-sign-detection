import { IResult, ISign } from '../../../src/types';
import { pSign } from '../rules/pSign';
import { isWithinTimeRange, timeRangeRegex } from '../rules/timeRange';
import {
  LIMITATION_KEYS,
  getMatch,
  ODD_DATES,
  EVEN_DATES,
} from '../utils/constants/index';
import { getMaxParkingTime } from '../rules/timeLimit';
import { addMinutes, isBefore } from 'date-fns';

interface IRange {
  from: Date | null;
  to: Date | null;
}

interface IParkingRule {
  maxParkingMins: number | undefined;
  parkingAllowed: IRange;
  parkingProhibited: IRange;
  parkingDiskRequired: boolean;
}
interface IParkingResult {
  isParkingAllowed: boolean;
  rules: IParkingRule[];
}

export function interpretSigns(response: IResult[]) {
  const parkingResult: IParkingResult = {
    isParkingAllowed: false,
    rules: [],
  };

  for (const sign of response) {
    const rule: IParkingRule = {
      maxParkingMins: undefined,
      parkingAllowed: {
        from: null,
        to: null,
      },
      parkingProhibited: {
        from: null,
        to: null,
      },
      parkingDiskRequired: false,
    };

    if (sign.label === 'p_sign') {
      parkingResult.isParkingAllowed = true;
      rule.parkingAllowed.from = new Date();

      if (response.length === 1) rule.parkingAllowed.to = pSign();

      continue;
    }

    const signTexts: string[] =
      (sign as IResult).textContent?.map(({ content }) => content) ?? [];
    let hasTimeRange = false;
    let timeRange;
    let textLimitations: string[] = [];

    for (const [index, signText] of signTexts.entries()) {
      const maxMinutes = getMaxParkingTime(signText);
      if (maxMinutes !== undefined) {
        rule.maxParkingMins = maxMinutes;
        rule.parkingAllowed.to = addMinutes(new Date(), maxMinutes);
      }

      if (LIMITATION_KEYS.some((key) => signText.includes(key))) {
        const match = getMatch(signText, signTexts[+index + 1]);
        if (match) textLimitations.push(match);
      } else if (sign.nestedSigns?.at(0)?.label === 'prohibited_parking_odd') {
        textLimitations.push(getMatch(ODD_DATES)!);
      } else if (sign.nestedSigns?.at(0)?.label === 'prohibited_parking_even') {
        textLimitations.push(getMatch(EVEN_DATES)!);
      }

      hasTimeRange = !!signText
        .replace('(', '')
        .replace(')', '')
        .match(timeRangeRegex);

      // if (hasTimeRange) signText = signText.replace(/\s/g, '');

      // Get max distance
      // Get date ranges
    }

    if (hasTimeRange) {
      timeRange = isWithinTimeRange({
        signText: signTexts,
        maxMinutes: rule.maxParkingMins,
        textLimitation: textLimitations[0], // TODO
      });

      console.log('timeRange', timeRange);

      if (timeRange?.currentlyInRange) {
        const { label } = sign;
        parkingResult.isParkingAllowed = label === 'sign';
        const targetRange =
          label === 'sign' ? rule.parkingAllowed : rule.parkingProhibited;
        targetRange.to = timeRange.to;
        targetRange.from = new Date();
      } else {
        rule.maxParkingMins = timeRange?.inRangeToday
          ? rule.maxParkingMins
          : undefined;

        if (timeRange?.from && timeRange.to) {
          const { label } = sign;
          parkingResult.isParkingAllowed = label !== 'sign';
          if (label === 'sign') {
            rule.parkingAllowed = timeRange;
          } else if (label === 'warning_sign') {
            rule.parkingProhibited = timeRange;
          }
        }
      }
    }

    if (sign.nestedSigns?.length) {
      if (sign.nestedSigns.at(0)?.label === 'parking_disk') {
        rule.parkingDiskRequired = timeRange?.inRangeToday ? true : false;
      }
    }

    postprocess(parkingResult, rule);

    if (hasTimeRange && parkingResult.rules.length) {
      setEarliestTimeRange(parkingResult, rule);

      // TODO: Need to check range text from sign
      const hasSameRange = parkingResult.rules.some(
        ({ parkingAllowed, parkingProhibited }) => {
          if (
            rule.parkingAllowed.to === parkingAllowed.to &&
            rule.parkingAllowed.from === parkingAllowed.from &&
            rule.parkingProhibited.to === parkingProhibited.to &&
            rule.parkingProhibited.from === parkingProhibited.from
          ) {
            return true;
          }

          return false;
        },
      );

      if (hasSameRange) {
        parkingResult.rules.push(rule);
      } else {
        const hasMaxMin = parkingResult.rules.find(
          ({ maxParkingMins }) => Number(maxParkingMins) > 0,
        )?.maxParkingMins;
        const hasPDisk = parkingResult.rules.find(
          ({ parkingDiskRequired }) => parkingDiskRequired,
        )?.parkingDiskRequired;

        rule.maxParkingMins = rule.maxParkingMins ?? hasMaxMin;
        rule.parkingDiskRequired = rule.parkingDiskRequired || !!hasPDisk;
        parkingResult.rules[0] = rule;
      }
    } else {
      parkingResult.rules[0] = rule;
    }
  }

  console.log('Final result:', parkingResult);
  console.log(parkingResult.rules.length);
  return parkingResult;
}

function postprocess(
  { isParkingAllowed }: IParkingResult,
  parkingResult: IParkingRule,
) {
  // TODO: Shorten the parking allowed range if parking is not allowed in the near future
  const { parkingAllowed, parkingProhibited } = parkingResult;
  if (!isParkingAllowed) return parkingResult;

  const { from: allowedFrom, to: allowedTo } = parkingAllowed;
  const { from: prohibitedFrom } = parkingProhibited;

  if (!allowedFrom || isBefore(new Date(), allowedFrom)) {
    parkingAllowed.from = new Date();
  }

  if (
    prohibitedFrom &&
    allowedFrom &&
    allowedTo &&
    isBefore(prohibitedFrom, allowedTo)
  ) {
    parkingAllowed.to = prohibitedFrom;
  }

  if (!allowedTo && prohibitedFrom) {
    parkingAllowed.to = prohibitedFrom;
  }

  console.log('postprocess', parkingResult);
  return parkingResult;
}

function setEarliestTimeRange(
  parkingResult: IParkingResult,
  rule: IParkingRule,
) {
  const prevAllowedTo = parkingResult.rules.find(
    ({ parkingAllowed }) => parkingAllowed.to !== null,
  )?.parkingAllowed.to;
  if (
    prevAllowedTo &&
    rule.parkingAllowed.to &&
    isBefore(prevAllowedTo, rule.parkingAllowed.to)
  ) {
    rule.parkingAllowed.to = prevAllowedTo;
  }

  const prevAllowedFrom = parkingResult.rules.find(
    ({ parkingAllowed }) => parkingAllowed.from !== null,
  )?.parkingAllowed.from;
  if (
    prevAllowedFrom &&
    rule.parkingAllowed.from &&
    isBefore(prevAllowedFrom, rule.parkingAllowed.from)
  ) {
    rule.parkingAllowed.from = prevAllowedFrom;
  }

  const prevProhibTo = parkingResult.rules.find(
    ({ parkingProhibited }) => parkingProhibited.to !== null,
  )?.parkingProhibited.to;
  if (
    prevProhibTo &&
    rule.parkingAllowed.to &&
    isBefore(prevProhibTo, rule.parkingAllowed.to)
  ) {
    rule.parkingAllowed.to = prevProhibTo;
  }

  const prevAProhibFrom = parkingResult.rules.find(
    ({ parkingProhibited }) => parkingProhibited.from !== null,
  )?.parkingProhibited.from;
  if (
    prevAProhibFrom &&
    rule.parkingAllowed.from &&
    isBefore(prevAProhibFrom, rule.parkingAllowed.from)
  ) {
    rule.parkingAllowed.from = prevAProhibFrom;
  }
}
