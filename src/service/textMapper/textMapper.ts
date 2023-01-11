import { IImageSize, IOcr, ISign, IResult, ITextContent } from '../../types';
import { logPerformance } from '../../utils/logPerformanceTime';

export const mapTextToSign = (
  mappedPredictions: ISign[],
  textPredictions: IOcr,
  originalImageSize: IImageSize,
) => {
  const t1 = performance.now();

  let predictedTextToSigns = [...mappedPredictions];

  textPredictions?.readResult?.pages[0]?.lines?.forEach(
    ({ content, boundingBox }) => {
      const [x1, y1, x2, y2, x3, y3, x4, y4] = boundingBox;
      const left = Math.max(x1, x4);
      const top = Math.max(y1, y2);
      const width = Math.min(x2, x3) - left;
      const height = Math.min(y3, y4) - top;

      const nestedRect = { left, top, width, height };

      const getTextContent = (signs: IResult[] | ISign[]) => {
        for (let i = 0, len = signs.length; i < len; i++) {
          const signBoundingboxes = signs[i].boundingBoxes;

          if (
            signBoundingboxes.left <= left &&
            signBoundingboxes.top <= top &&
            left + width <= signBoundingboxes.left + signBoundingboxes.width &&
            top + height <= signBoundingboxes.top + signBoundingboxes.height
          ) {
            const newTextContent: ITextContent = {
              content: content.toLowerCase(),
              textBoundry: boundingBox,
              normalizedTextBoundry: nestedRect,
            };

            if (Array.isArray((signs[i] as IResult).textContent)) {
              (signs[i] as IResult).textContent = [
                ...((signs[i] as IResult).textContent ?? []),
                newTextContent,
              ];
            } else {
              (signs[i] as IResult).textContent = [newTextContent];
            }
          }

          if (Array.isArray(signs[i].nestedSigns)) {
            signs[i].nestedSigns = getTextContent(signs[i].nestedSigns!);
          }
        }
        return signs;
      };

      predictedTextToSigns = getTextContent(predictedTextToSigns);
    },
  );

  const t2 = performance.now();
  logPerformance(t1, t2, 'mapTextToSign()');

  return predictedTextToSigns;
};
