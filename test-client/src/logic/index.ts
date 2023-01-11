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

interface IParkingResult {
  isParkingAllowed: boolean;
  maxParkingMins: number | undefined;
  parkingAllowed: IRange;
  parkingProhibited: IRange;
  parkingDiskRequired: boolean;
}

export function interpretSigns(response: IResult[]) {
  const parkingResult: IParkingResult = {
    isParkingAllowed: false,
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

  for (const sign of response) {
    let signMaxMins: number | undefined = undefined;

    if (sign.label === 'p_sign') {
      parkingResult.isParkingAllowed = true;
      parkingResult.parkingAllowed.from = new Date();

      if (response.length === 1) parkingResult.parkingAllowed.to = pSign();

      continue;
    }

    const signTexts: string[] =
      (sign as IResult).textContent?.map(({ content }) => content) ?? [];
    let hasTimeRange = false;
    let timeRange;
    let textLimitations: string[] = [];
    let parkingDiskRequired;

    for (const [index, signText] of signTexts.entries()) {
      const maxMinutes = getMaxParkingTime(signText);
      if (maxMinutes !== undefined) {
        signMaxMins = maxMinutes;
        parkingResult.parkingAllowed.to = addMinutes(new Date(), signMaxMins);
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
        maxMinutes: signMaxMins ?? parkingResult.maxParkingMins,
        textLimitation: textLimitations[0], // TODO
      });

      console.log('timeRange', timeRange);

      if (timeRange?.currentlyInRange) {
        const { label } = sign;
        parkingResult.isParkingAllowed = label === 'sign';
        const targetRange =
          label === 'sign'
            ? parkingResult.parkingAllowed
            : parkingResult.parkingProhibited;
        targetRange.to = timeRange.to;
        targetRange.from = new Date();

        // If not only ranges on sign, TODO: add more stuffs in if like Avgift etc
        // if (textLimitations.length) {
        //   sign.label === "sign"
        //     ? (parkingAllowed.from = new Date())
        //     : (parkingProhibited.from = new Date());
        // }
      } else {
        signMaxMins = timeRange?.inRangeToday ? signMaxMins : undefined;

        if (timeRange?.from && timeRange.to) {
          const { label } = sign;
          parkingResult.isParkingAllowed = label !== 'sign';
          if (label === 'sign') {
            parkingResult.parkingAllowed = timeRange;
          } else if (label === 'warning_sign') {
            parkingResult.parkingProhibited = timeRange;
          }
        }
      }
    }

    if (sign.nestedSigns?.length) {
      if (sign.nestedSigns.at(0)?.label === 'parking_disk') {
        parkingDiskRequired = timeRange?.inRangeToday ? true : false;
      }
    }

    parkingResult.maxParkingMins = signMaxMins ?? parkingResult.maxParkingMins;
    parkingResult.parkingDiskRequired =
      parkingDiskRequired ?? parkingResult.parkingDiskRequired;
  }

  console.log('preprocessed', parkingResult);

  return postprocess(parkingResult);
}

function postprocess(parkingResult: IParkingResult) {
  // TODO: Shorten the parking allowed range if parking is not allowed in the near future
  const { isParkingAllowed, parkingAllowed, parkingProhibited } = parkingResult;
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
