import { IResult, ISign } from '../../../src/types';
import { pSign } from '../rules/pSign';
import {
  isWithinTimeRange,
  ITimeRangeMetadata,
  timeRangeRegex,
} from '../rules/timeRange';
import {
  LIMITATION_KEYS,
  getMatch,
  ODD_DATES,
  EVEN_DATES,
} from '../utils/constants/index';
import { getMaxParkingTime } from '../rules/timeLimit';
import { addMinutes, isBefore } from 'date-fns';
import isEqual from 'lodash.isequal';

interface IRange {
  from: Date | null;
  to: Date | null;
  metadata?: ITimeRangeMetadata | null;
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
        metadata: null,
      },
      parkingProhibited: {
        from: null,
        to: null,
        metadata: null,
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
    let textLimitations: string[] = [];

    for (const [index, signText] of signTexts.entries()) {
      setMaxMinuteParking(rule, signText);
      setLimitationsFromSignText(
        sign,
        signText,
        signTexts[+index + 1],
        textLimitations,
      );

      hasTimeRange = !!signText
        .replace('(', '')
        .replace(')', '')
        .match(timeRangeRegex);

      // TODO: Get max distance
      // TODO: Get date ranges
    }

    if (hasTimeRange) {
      setTimeRange(parkingResult, rule, signTexts, textLimitations[0], sign);

      if (
        parkingResult.rules.length &&
        Number(rule.maxParkingMins) > 0 &&
        Number(parkingResult.rules[0].maxParkingMins) > 0
      ) {
        const hasSameRange = checkIfHasSameTimeRangeMetadata(
          parkingResult,
          rule.parkingAllowed,
        );

        if (hasSameRange) {
          const maxMins =
            parkingResult.rules[0].maxParkingMins! + rule.maxParkingMins!;

          setTimeRange(
            parkingResult,
            rule,
            signTexts,
            textLimitations[0],
            sign,
            maxMins,
          );
        }
      }
    }

    postprocessTimeRange(parkingResult, rule);

    if (hasTimeRange && parkingResult.rules.length) {
      const hasSameRange = checkIfHasSameTimeRangeMetadata(
        parkingResult,
        rule.parkingAllowed,
      );

      if (hasSameRange) {
        parkingResult.rules.push(rule);
      } else {
        setEarliestTimeRange(parkingResult, rule);

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
    console.log('\n\n');
  }

  console.log('Final result:');
  console.dir(parkingResult, { depth: null });
  return parkingResult;
}

function postprocessTimeRange(
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

const checkIfHasSameTimeRangeMetadata = (
  parkingResult: IParkingResult,
  ruleRange: IRange,
) =>
  parkingResult.rules.some(({ parkingAllowed }) => {
    const checker = (first: any, sec: any) => {
      if (
        first.from &&
        first.to &&
        first.metadata &&
        sec.to &&
        sec.from &&
        sec.metadata
      ) {
        if (isEqual(first.metadata, sec.metadata)) {
          return true;
        }
        return false;
      }

      return false;
    };

    const allowed = checker(parkingAllowed, ruleRange);
    //const prohib = checker(parkingProhibited, rule.parkingProhibited);
    return allowed;
  });

const setTimeRange = (
  parkingResult: IParkingResult,
  rule: IParkingRule,
  signTexts: string[],
  textLimitation: string,
  sign: IResult,
  maxMins?: number,
) => {
  const timeRange = isWithinTimeRange({
    signText: signTexts,
    maxMinutes: maxMins ?? rule.maxParkingMins,
    textLimitation, // TODO
  });

  if (timeRange?.currentlyInRange) {
    const { label } = sign;
    parkingResult.isParkingAllowed = label === 'sign';
    const targetRange =
      label === 'sign' ? rule.parkingAllowed : rule.parkingProhibited;
    targetRange.to = timeRange.to;
    targetRange.from = new Date();
    targetRange.metadata = timeRange.timeRange;
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

  checkNestedSigns(sign, rule, timeRange);
};

const checkNestedSigns = (
  sign: IResult,
  rule: IParkingRule,
  timeRange: {
    from: Date;
    to: Date;
    inRangeToday: boolean;
    currentlyInRange: boolean;
    timeRange: ITimeRangeMetadata;
  } | null,
) => {
  if (sign.nestedSigns?.length) {
    if (sign.nestedSigns.at(0)?.label === 'parking_disk') {
      rule.parkingDiskRequired = timeRange?.inRangeToday ? true : false;
    }
  }
};

const setMaxMinuteParking = (rule: IParkingRule, signText: string) => {
  const maxMinutes = getMaxParkingTime(signText);
  if (maxMinutes !== undefined) {
    rule.maxParkingMins = maxMinutes;
    rule.parkingAllowed.to = addMinutes(new Date(), maxMinutes);
  }
};

const setLimitationsFromSignText = (
  sign: IResult,
  signText: string,
  previousText: string,
  textLimitations: string[],
) => {
  if (LIMITATION_KEYS.some((key) => signText.includes(key))) {
    const match = getMatch(signText, previousText);
    if (match) textLimitations.push(match);
  } else if (sign.nestedSigns?.at(0)?.label === 'prohibited_parking_odd') {
    textLimitations.push(getMatch(ODD_DATES)!);
  } else if (sign.nestedSigns?.at(0)?.label === 'prohibited_parking_even') {
    textLimitations.push(getMatch(EVEN_DATES)!);
  }
};
