import { IFFT } from '@tensorflow/tfjs-node';
import { addMinutes, isAfter, isBefore, isEqual } from 'date-fns';
import { IResult } from '../../../src/types';
import { pSign } from '../rules/pSign';
import { getMaxParkingTime } from '../rules/timeLimit';
import {
  isWithinTimeRange,
  ITimeRangeMetadata,
  timeRangeRegex,
} from '../rules/timeRange';
import {
  EVEN_DATES,
  getMatch,
  LIMITATION_KEYS,
  ODD_DATES,
} from '../utils/constants';

interface IParkingRule {
  parkingAllowed: boolean;
  pSign?: true;
  maxParkingMins?: number | undefined;
  parkingDiskRequired?: boolean;
  from?: Date;
  to?: Date;
}

export function interpretSigns(response: IResult[]) {
  const parkingRules: IParkingRule[] = [];

  for (const sign of response) {
    const rule: IParkingRule = {
      parkingAllowed: false,
    };

    if (sign.label === 'p_sign') {
      rule.pSign = true;
      rule.parkingAllowed = true;

      if (response.length === 1) {
        rule.from = new Date();
        rule.to = pSign();
      }

      parkingRules.push(rule);
      continue;
    }

    rule.parkingAllowed = sign.label === 'sign';

    const signTexts: string[] =
      (sign as IResult).textContent?.map(({ content }) => content) ?? [];
    let hasTimeRange = false;
    let textLimitations: string[] = [];

    for (const [index, signText] of signTexts.entries()) {
      setMaxMinuteParking(rule, signText);
      setLimitationsFromSignText(
        sign,
        signText,
        signTexts[index + 1],
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
      setTimeRange(rule, signTexts, textLimitations[0], sign);
    }

    checkNestedSigns(sign, rule);

    parkingRules.push(rule);
  }

  const parkingRulesWithPSignTimeRange = setPSignTimeRange(parkingRules);

  console.log(parkingRulesWithPSignTimeRange);
  return parkingRulesWithPSignTimeRange;
}

const setMaxMinuteParking = (rule: IParkingRule, signText: string) => {
  const maxMinutes = getMaxParkingTime(signText);
  if (maxMinutes !== undefined) {
    rule.maxParkingMins = maxMinutes;
    rule.from = new Date();
    rule.to = addMinutes(new Date(), maxMinutes);
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

const setTimeRange = (
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

  if (timeRange) {
    rule.to = timeRange.to;
    rule.from = timeRange.currentlyInRange ? new Date() : timeRange.from;
  }
};

const checkNestedSigns = (sign: IResult, rule: IParkingRule) => {
  if (sign.nestedSigns?.length) {
    if (sign.nestedSigns.at(0)?.label === 'parking_disk') {
      rule.parkingDiskRequired = true;
    }
  }
};

function setPSignTimeRange(parkingRules: IParkingRule[]) {
  if (parkingRules[0].pSign) {
    const now = new Date();

    const anyRuleInRange = parkingRules.some(
      ({ from }) => from && isEqual(from, now),
    );

    if (anyRuleInRange) {
      return parkingRules.filter(({ pSign }) => !pSign);
    }
    const closestFrom = parkingRules.reduce((closest, rule) => {
      if (
        rule.from &&
        isAfter(rule.from, now) &&
        isBefore(rule.from, closest)
      ) {
        return rule.from;
      }
      return closest;
    }, now);

    parkingRules[0].to = closestFrom;
  }

  return parkingRules;
}


