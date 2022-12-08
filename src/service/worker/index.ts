import { Worker } from 'node:worker_threads';
import path from 'path';
import logger from '../../logger';

let worker: Worker;

export const initWorker = () => {
  return new Promise<void>((resolve, reject) => {
    worker = new Worker(path.join(__dirname + '/predict'));

    worker.once('message', () => {
      logger.info('Model ready in worker');
      resolve();
    });

    worker.on('error', (err) => {
      logger.error('Error from worker loading model', err);
      reject(err);
    });
  });
};

export const runWorkerTask = (
  image: Express.Multer.File,
  threshold: number,
) => {
  return new Promise((resolve, reject) => {
    worker.once('message', (result) => {
      logger.info('Predictions received from worker');
      resolve(result);
    });
    worker.on('error', (err) => {
      logger.error('Worker threw an error', err);
      reject(err);
    });
    worker.on('exit', (exitCode) => {
      logger.error('Worker exited', exitCode);
      reject(exitCode);
    });

    worker.postMessage({ image, threshold });
  });
};
