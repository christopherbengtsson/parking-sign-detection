import { Request, Response } from 'express';
import { DEFAULT_THRESHOLD } from '../config';
import { Worker } from 'worker_threads';
import path from 'path';
import logger from '../logger';

const worker = new Worker(path.join(__dirname + '/predict'));

const predictionService = (image: Express.Multer.File, threshold: number) => {
  return new Promise((resolve, reject) => {
    worker.once('message', (msg) => {
      logger.debug('response received from worker');
      resolve(msg);
    });
    worker.on('error', (err) => {
      logger.error('Worker threw an error', err);
      reject(err);
    });

    worker.postMessage({ image, threshold });
  });
};

const fakePromise = () => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 200);
  });
};

export const predictAndDetect = async (
  request: Request,
  response: Response,
) => {
  // const model = TensorflowModel.getInstance()?.getModel();

  // if (!model) {
  //   response.status(503).send('Server not ready, try again later');
  //   return;
  // }

  const image = request.file as Express.Multer.File;

  let threshold = Number(request.body.threshold);
  if (!Number.isInteger(threshold)) {
    threshold = Number(DEFAULT_THRESHOLD);
  }

  // predictLocal({ model, image, threshold })
  // detectText(image)
  // workerPool.run(image)

  Promise.all([predictionService(image, threshold), fakePromise()])
    .then((res) => {
      const signsResult = res[0];
      // const textResult = res[1];

      // const t1 = performance.now();
      // const result = mapTextToSign(signsResult, textResult);
      // const t2 = performance.now();
      // logPerformance(t1, t2, 'to run `mapTextToSign()`');

      response.json({
        signsResult,
        // textResult,
      });
    })
    .catch((err) => {
      console.error(err);
      response.status(500).send(err);
    });
};
