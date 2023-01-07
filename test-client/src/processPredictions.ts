import { mockText } from './mocks/text';
import { validate } from './rules/old-index';
const THRESHOLD = 0.6;

export const calcStuff = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  result: any,
) => {
  console.log(result);

  let filtered = result?.signsResult?.mappedPredictions?.reduce(
    (previous: any, current: any) => {
      const { boundingBoxes, probability } = current;
      const sign = { ...current, nestedSigns: [] };

      if (probability > THRESHOLD) {
        const bboxLeft = boundingBoxes.left * img.width;
        const bboxTop = boundingBoxes.top * img.height;
        const bboxWidth = boundingBoxes.width * img.width - bboxLeft;
        const bboxHeight = boundingBoxes.height * img.height - bboxTop;

        drawSignBoundry(ctx, bboxLeft, bboxTop, bboxWidth, bboxHeight, sign);

        // Find signs within signs
        let currentIsNested = false;
        if (previous.length) {
          previous.forEach((previousSign: any, index: any) => {
            const { boundingBoxes: previousBoundingBoxes } = previousSign;

            if (
              previousBoundingBoxes.left <= bboxLeft &&
              previousBoundingBoxes.top <= bboxTop &&
              bboxLeft + bboxWidth <=
                previousBoundingBoxes.left + previousBoundingBoxes.width &&
              bboxTop + bboxHeight <=
                previousBoundingBoxes.top + previousBoundingBoxes.height
            ) {
              currentIsNested = true;
              previous[index].nestedSigns = [
                ...previous[index].nestedSigns,
                sign,
              ];
            }
          });
        }

        if (!currentIsNested) {
          previous.push({
            ...sign,
            boundingBoxes: {
              left: bboxLeft,
              top: bboxTop,
              width: bboxWidth,
              height: bboxHeight,
            },
          });
        }
      }
      return previous;
    },
    [],
  );

  mockText?.readResult?.pages[0]?.lines?.forEach(
    ({ content, boundingBox }: { content: any; boundingBox: any }) => {
      const boundingX = boundingBox.filter((_:any, idx: number) => idx % 2 === 0);
      const boundingY = boundingBox.filter((_:any, idx: number) => idx % 2 === 1);

      const p2 = Math.max(...boundingX);
      const p1 = Math.min(...boundingX);
      const q2 = Math.max(...boundingY);
      const q1 = Math.min(...boundingY);

      const bboxLeft = (p1 / img.width) * img.width;
      const bboxTop = (q1 / img.height) * img.height;
      const bboxWidth = p2 - p1;
      const bboxHeight = q2 - q1;

      drawTextBoundry(
        ctx,
        bboxLeft,
        bboxTop,
        bboxWidth,
        bboxHeight,
        content,
        boundingBox,
      );

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

      filtered = getTextContent(filtered);
    },
  );

  return validate(filtered);
};

const drawSignBoundry = (
  ctx: any,
  bboxLeft: any,
  bboxTop: any,
  bboxWidth: any,
  bboxHeight: any,
  { label, probability }: { label: string; probability: number },
) => {
  ctx.strokeStyle = 'green';
  ctx.lineWidth = 4;

  ctx.beginPath();

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 16px Arial';
  ctx.fillText(
    label + ' - ' + Math.round(probability) * 100 + '% prob',
    bboxLeft,
    bboxTop - 10,
  );
  ctx.fill();

  ctx.fillStyle = 'rgba(4,170,109,0.3)';

  ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
  ctx.fill();
  ctx.stroke();
};

const drawTextBoundry = (
  ctx: any,
  bboxLeft: any,
  bboxTop: any,
  bboxWidth: any,
  bboxHeight: any,
  content: any,
  boundingBox: any,
) => {
  ctx.strokeStyle = 'yellow';
  ctx.beginPath();
  ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
  ctx.stroke();

  ctx.strokeStyle = 'red';
  ctx.beginPath();
  ctx.fillText(content, boundingBox[0], boundingBox[1] - 10);
  ctx.moveTo(boundingBox[0], boundingBox[1]);
  ctx.lineTo(boundingBox[2], boundingBox[3]);
  ctx.lineTo(boundingBox[4], boundingBox[5]);
  ctx.lineTo(boundingBox[6], boundingBox[7]);
  ctx.closePath();
  ctx.stroke();
};
