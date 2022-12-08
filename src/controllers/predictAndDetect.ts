import { Request, Response } from 'express';
import { DEFAULT_THRESHOLD } from '../config';
import { runWorkerTask } from '../service/worker';

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

  Promise.all([runWorkerTask(image, threshold), fakePromise()])
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
