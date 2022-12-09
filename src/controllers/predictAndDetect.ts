import { Request, Response } from 'express';
import { DEFAULT_THRESHOLD, IS_DEV } from '../config';
import { mockDetectText } from '../mocks/mocks';
import { runWorkerTask } from '../service/prediction-worker';
import { mapTextToSign } from '../service/textMapper/textMapper';
import { detectText } from './detectText';
import logger from '../logger';

export const predictAndDetect = async (
  request: Request,
  response: Response,
) => {
  const image = request.file as Express.Multer.File;

  let threshold = Number(request.body.threshold);
  if (!Number.isInteger(threshold)) {
    threshold = Number(DEFAULT_THRESHOLD);
  }

  const textDetectionPromise = IS_DEV ? mockDetectText() : detectText(image);

  Promise.all([runWorkerTask(image, threshold), textDetectionPromise])
    .then((res) => {
      const { mappedPredictions, originalImageSize } = res[0];
      const textPredictions = res[1];

      const result = mapTextToSign(
        mappedPredictions,
        textPredictions,
        originalImageSize,
      );

      response.json({
        result,
      });
    })
    .catch((err) => {
      logger.error(err);
      response.status(500).send(err);
    });
};
