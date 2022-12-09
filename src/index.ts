import service from './main/service';
import { DEFAULT_HOST, DEFAULT_PORT, WORKER_ENABLED } from './config';
import logger from './logger';
import { initWorker } from './service/prediction-worker';
import { initModel } from './service/prediction-worker/predict';

function startServer() {
  const HOST = process.env.HOST || DEFAULT_HOST;
  const PORT = process.env.PORT || DEFAULT_PORT;

  const server = service.listen(PORT, () => {
    logger.info(`Service started at ${HOST}:${PORT}`);
  });

  server.keepAliveTimeout = 61 * 1000;
}

if (WORKER_ENABLED) {
  initWorker()
    .then(() => {
      startServer();
    })
    .catch((err) => {
      logger.error('Failed to start server', err);
    });
} else {
  logger.warn('Not using `worker_threads` module!');
  initModel().then(() => {
    startServer();
  });
}
