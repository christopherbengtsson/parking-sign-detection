import { IResult, ISign } from "../../../src/types";
import { pSign } from "../rules/pSign";
import { isWithinTimeRange, timeRangeRegex } from "../rules/timeRange";
import {
  LIMITATION_KEYS,
  getFullMatch,
  getMatch,
} from "../utils/constants/index";
import { getMaxParkingTime, handleTimeLimit } from "../rules/timeLimit";
import { isBefore } from "date-fns";

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

  const analyseSigns = (data: IResult[] | ISign[]) => {
    for (const sign of data) {
      let signMaxMins: number | undefined = undefined;

      if (sign.label === "p_sign") {
        parkingResult.isParkingAllowed = true;
        parkingResult.parkingAllowed.from = new Date();
        parkingResult.parkingAllowed.to = pSign();
        continue;
      }

      const signTexts: string[] =
        (sign as IResult).textContent?.map(({ content }) => content) ?? [];
      let hasTimeRange = false;
      let textLimitations: string[] = [];
      let parkingDiskRequired = false;

      for (const [index, signText] of signTexts.entries()) {
        const match = getMaxParkingTime(signText);
        if (match !== undefined) {
          signMaxMins = match;
        }

        if (LIMITATION_KEYS.some((key) => signText.includes(key))) {
          const match = getMatch(signText, signTexts[+index + 1]);
          if (match) textLimitations.push(match);
        }

        hasTimeRange = !!signText
          .replace("(", "")
          .replace(")", "")
          .match(timeRangeRegex);

        // Get max distance
        // Get date ranges
      }

      if (hasTimeRange) {
        var timeRange = isWithinTimeRange({
          signText: signTexts,
          maxMinutes: signMaxMins ?? parkingResult.maxParkingMins,
          textLimitation: textLimitations[0],
        });

        console.log(timeRange);

        if (timeRange?.currentlyInRange) {
          parkingResult.isParkingAllowed = sign.label === "sign";
          if (sign.label === "sign") {
            parkingResult.parkingAllowed.to = timeRange.to;
            parkingResult.parkingAllowed.from = new Date();
          } else if (sign.label === "warning_sign") {
            parkingResult.parkingProhibited.to = timeRange.to;
            parkingResult.parkingProhibited.from = new Date();
          }

          // If not only ranges on sign, TODO: add more stuffs in if like Avgift etc
          // if (textLimitations.length) {
          //   sign.label === "sign"
          //     ? (parkingAllowed.from = new Date())
          //     : (parkingProhibited.from = new Date());
          // }
        } else {
          signMaxMins = undefined;

          if (timeRange?.from && timeRange.to) {
            if (sign.label === "sign") {
              parkingResult.parkingAllowed.to = timeRange.to;
              parkingResult.parkingAllowed.from = timeRange.from;
            } else if (sign.label === "warning_sign") {
              parkingResult.parkingProhibited.to = timeRange.to;
              parkingResult.parkingProhibited.from = timeRange.from;
            }
          }
        }
      }

      if (sign.nestedSigns?.length) {
        if (sign.nestedSigns.at(0)?.label.startsWith("prohibited_")) {
          //
        } else if (sign.nestedSigns.at(0)?.label === "parking_disk") {
          parkingDiskRequired =
            hasTimeRange && timeRange?.currentlyInRange ? true : false;
        }
      }

      parkingResult.maxParkingMins =
        signMaxMins ?? parkingResult.maxParkingMins;
      parkingResult.parkingDiskRequired =
        parkingDiskRequired ?? parkingResult.parkingDiskRequired;
    }
  };

  analyseSigns(response);

  if (
    parkingResult.isParkingAllowed &&
    parkingResult.parkingProhibited.from &&
    parkingResult.parkingAllowed.to
  ) {
    if (
      isBefore(
        parkingResult.parkingProhibited.from,
        parkingResult.parkingAllowed.to
      )
    ) {
      parkingResult.parkingAllowed.to = parkingResult.parkingProhibited.from;
    }
  }

  console.log(parkingResult);

  return parkingResult;
}

function checkProhibited(sign: IResult | ISign) {}
