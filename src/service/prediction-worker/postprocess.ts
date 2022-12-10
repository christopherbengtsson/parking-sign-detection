import { logPerformance } from '../../utils/logPerformanceTime';
import { getClassLabels } from '../tensorflow/utils';
import { IBoundingBoxes, IImageSize, ISign } from '../../types';

export const postProcessPredictions = (
  predictions: (number[] | number[][])[],
  imageSize: IImageSize,
  threshold: number,
) => {
  const t1 = performance.now();

  const classLabels = getClassLabels();

  const probabilities = predictions[0] as number[];
  const boundingBoxes = predictions[1] as number[][];
  const classIds = predictions[2] as number[];

  const result = classIds.reduce((previous, current, index) => {
    if (probabilities[index] >= threshold) {
      const bbox = normalizeBoundingBoxes(
        boundingBoxes[index],
        imageSize.width,
        imageSize.height,
      );

      const { left, top, width, height } = bbox;
      const sign = {
        label: classLabels[current],
        probability: probabilities[index],
        boundingBoxes: {
          left,
          top,
          width,
          height,
        },
      };

      const nestedSigns = checkIfSignIsNested(previous, sign, bbox);

      if (!nestedSigns) {
        previous.push(sign);
      } else {
        previous = nestedSigns;
      }
    }

    return previous;
  }, [] as ISign[]);

  const t2 = performance.now();
  logPerformance(t1, t2, 'postProcessPredictions()');

  return result;
};

const normalizeBoundingBoxes = (
  boundingBoxes: number[],
  imageWidth: number,
  imageHeight: number,
) => {
  const bboxLeft = boundingBoxes[0] * imageWidth;
  const bboxTop = boundingBoxes[1] * imageHeight;
  const bboxWidth = boundingBoxes[2] * imageWidth - bboxLeft;
  const bboxHeight = boundingBoxes[3] * imageHeight - bboxTop;

  return {
    left: bboxLeft,
    top: bboxTop,
    width: bboxWidth,
    height: bboxHeight,
  } as IBoundingBoxes;
};

const checkIfSignIsNested = (
  signs: ISign[],
  currentSign: ISign,
  signBoundingBoxes: IBoundingBoxes,
): ISign[] | false => {
  let currentSignIsNested = false;
  if (signs.length) {
    signs.every((previousSign, index) => {
      const { boundingBoxes: previousSignBoundingBoxes } = previousSign;
      const { left, top, width, height } = signBoundingBoxes;

      if (
        previousSignBoundingBoxes.left <= left &&
        previousSignBoundingBoxes.top <= top &&
        left + width <=
          previousSignBoundingBoxes.left + previousSignBoundingBoxes.width &&
        top + height <=
          previousSignBoundingBoxes.top + previousSignBoundingBoxes.height
      ) {
        signs[index].nestedSign = currentSign;

        currentSignIsNested = true;
        return false; // Break loop, a sign can (?) only be nested in one sign
      }
      return true;
    });
  }
  return currentSignIsNested ? signs : false;
};
