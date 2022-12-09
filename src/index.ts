import service from './main/service';
import { DEFAULT_HOST, DEFAULT_PORT } from './config';
import logger from './logger';
import { initWorker } from './service/prediction-worker';

function startServer() {
  const HOST = process.env.HOST || DEFAULT_HOST;
  const PORT = process.env.PORT || DEFAULT_PORT;

  const server = service.listen(PORT, () => {
    logger.info(`Service started at ${HOST}:${PORT}`);
  });

  server.keepAliveTimeout = 61 * 1000;
}

initWorker()
  .then(() => {
    startServer();
  })
  .catch((err) => {
    logger.error('Failed to start server', err);
  });
