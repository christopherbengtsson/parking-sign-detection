import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { SignDetectionRouter } from '../routes/SignDetectionRouter';
import logger from '../logger';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
} else {
  app.use(helmet());
}

app.use('/api', SignDetectionRouter);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err?.message ?? 'Unknown server error', err, {
    originalUrl: req.originalUrl,
  });
  logger.error('Unknown server error', err);
  res.status(500).send('Unknown server error');
};

app.use(errorHandler);

export default app;
