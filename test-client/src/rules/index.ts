import { IResult, ISign } from '../../../src/types';
// import { interpretSigns } from "../logic";
import { interpretSigns } from '../logic/twopoimto';
import { PARKING_DISK } from '../utils/constants';

import { checkLimitation } from './limitations';
import { pSign } from './pSign';
import { handleTimeLimit } from './timeLimit';
import { isWithinTimeRange } from './timeRange';
import { validateRules } from './validateRules';

export const readSignData = (signs: IResult[]) => {
  const rules = [];
  console.log('signs', signs);

  // return interpretSigns(signs);
  return interpretSigns(signs);

  // signs.forEach(
  //   ({ label, probability, boundingBoxes, nestedSigns, textContent }) => {
  //     const signRules = {};

  //     signRules["allowed"] = true;
  //     signRules["valid"] = true;

  //     if (textContent.length === 1 && textContent[0].content === "p") {
  //       signRules["range"] = { from: new Date(), to: pSign() };
  //       signRules["valid"] = true;
  //       signRules["pSign"] = true;
  //       // break?
  //     }

  //     const nested = checkNestedPSign(nestedSigns);
  //     if (
  //       nested ||
  //       textContent.some(({ content }) => PARKING_DISK.includes(content))
  //     ) {
  //       signRules[nested ? nested : "pDisk"] = true;
  //     }

  //     const maxMins = handleTimeLimit(
  //       textContent.map(({ content }) => content)
  //     );
  //     if (maxMins !== null) {
  //       const { maxMinutes, validTo } = maxMins;

  //       signRules["maxMinutes"] = maxMinutes;
  //     }

  //     const clockRangeMaxDate = isWithinTimeRange({
  //       signText: textContent.map(({ content }) => content),
  //       maxMinutes: signRules["maxMinutes"],
  //     });
  //     if (clockRangeMaxDate !== null) {
  //       signRules["range"] = clockRangeMaxDate;
  //       signRules["valid"] = clockRangeMaxDate.currentlyInRange;
  //     }

  //     if (label === "warning_sign") {
  //       signRules["allowed"] = false;

  //       const textLimits = checkLimitation(
  //         textContent.map(({ content }) => content)
  //       );

  //       if (textLimits?.key) {
  //         signRules[textLimits.key] = textLimits.value;
  //       }
  //     }

  //     rules.push(signRules);
  //   }
  // );

  // console.log(rules);
  // validateRules(rules);
};

const checkNestedPSign = (nestedSigns?: ISign[]) => {
  if (!nestedSigns) return false;

  let result = '';
  nestedSigns.forEach((sign) => {
    if (sign.label === 'parking_disk') {
      result = 'parking_disk';
    }

    if (sign.label === 'prohibited_parking') {
      result = 'prohibited_parking';
    }
  });

  return result || false;
};
