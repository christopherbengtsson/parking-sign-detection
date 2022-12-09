import { logPerformance } from '../../utils/logPerformanceTime';

export const mapTextToSign = (
  mappedPredictions,
  textPredictions,
  originalImageSize,
) => {
  const t1 = performance.now();

  let predictedTextToSigns = [...mappedPredictions];

  textPredictions?.readResult?.pages[0]?.lines?.forEach(
    ({ content, boundingBox }: { content: any; boundingBox: any }) => {
      const boundingX = boundingBox.filter((_, idx: number) => idx % 2 === 0);
      const boundingY = boundingBox.filter((_, idx: number) => idx % 2 === 1);

      const maxLeft = Math.max(...boundingX);
      const minLeft = Math.min(...boundingX);
      const maxTop = Math.max(...boundingY);
      const minTop = Math.min(...boundingY);

      const bboxLeft =
        (minLeft / originalImageSize.width) * originalImageSize.width;
      const bboxTop =
        (minTop / originalImageSize.height) * originalImageSize.height;
      const bboxWidth = maxLeft - minLeft;
      const bboxHeight = maxTop - minTop;

      const getTextContent = (signs: any[]) => {
        for (let i = 0, len = signs.length; i < len; i++) {
          const signBoundingboxes = signs[i].boundingBoxes;

          if (
            signBoundingboxes.left <= bboxLeft &&
            signBoundingboxes.top <= bboxTop &&
            bboxLeft + bboxWidth <=
              signBoundingboxes.left + signBoundingboxes.width &&
            bboxTop + bboxHeight <=
              signBoundingboxes.top + signBoundingboxes.height
          ) {
            if (signs[i].textContent) {
              signs[i].textContent = [
                ...signs[i].textContent,
                content.toLowerCase(),
              ];
            } else {
              signs[i].textContent = [content.toLowerCase()];
            }
          }

          if (signs[i].nestedSigns?.length) {
            signs[i].nestedSigns = getTextContent(signs[i].nestedSigns);
          }
        }
        return signs;
      };

      predictedTextToSigns = getTextContent(predictedTextToSigns);
    },
  );

  const t2 = performance.now();
  logPerformance(t1, t2, 'to run `mapTextToSign()`');

  return predictedTextToSigns;
};
