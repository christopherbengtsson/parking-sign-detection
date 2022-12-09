import { Request, Response } from 'express';
import { DEFAULT_THRESHOLD } from '../config';
import { runWorkerTask } from '../service/prediction-worker';
import { mapTextToSign } from '../service/textMapper/textMapper';
import { mockText } from '../mocks/text';

const fakePromise = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockText);
    }, 200);
  });
};

export const predictAndDetect = async (
  request: Request,
  response: Response,
) => {
  const image = request.file as Express.Multer.File;

  let threshold = Number(request.body.threshold);
  if (!Number.isInteger(threshold)) {
    threshold = Number(DEFAULT_THRESHOLD);
  }

  // detectText(image)
  Promise.all([runWorkerTask(image, threshold), fakePromise()])
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
      console.error(err);
      response.status(500).send(err);
    });
};
