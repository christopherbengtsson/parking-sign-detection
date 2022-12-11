import { Request, Response } from 'express';
import { DEFAULT_THRESHOLD, IS_DEV, WORKER_ENABLED } from '../config';
import { mockDetectText } from '../mocks/mocks';
import { runWorkerTask } from '../service/prediction-worker';
import { mapTextToSign } from '../service/textMapper/textMapper';
import { detectText } from './detectText';
import logger from '../logger';
import { IImageSize, ISign } from '../types';
import predictLocal from '../service/prediction-worker/predict';

export const predictAndDetect = async (
  request: Request,
  response: Response,
) => {
  const image = request.file as Express.Multer.File;

  let threshold = Number(request.body.threshold);

  if (Number.isNaN(threshold)) {
    threshold = Number(DEFAULT_THRESHOLD);
  }

  let signPredictionPromise: Promise<{
    mappedPredictions: ISign[];
    originalImageSize: IImageSize;
  }>;

  if (WORKER_ENABLED) {
    signPredictionPromise = runWorkerTask(image, threshold);
  } else {
    signPredictionPromise = predictLocal({ image, threshold });
  }

  const textDetectionPromise = IS_DEV ? mockDetectText() : detectText(image);

  Promise.all([signPredictionPromise, textDetectionPromise])
    .then((res) => {
      const { mappedPredictions, originalImageSize } = res[0];
      const textPredictions = res[1];

      const result = mapTextToSign(
        mappedPredictions,
        textPredictions,
        originalImageSize,
      );

      if (IS_DEV) {
        response.json({
          result,
          sign: res[0].mappedPredictions,
          text: res[1],
        });
        return;
      }

      response.json({
        result,
      });
    })
    .catch((err) => {
      logger.error(err);
      response.status(500).send(err);
    });
};
