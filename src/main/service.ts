import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { SignDetectionRouter } from '../routes/SignDetectionRouter';
import logger from '../logger';

// const APP_STATIC_DIR = __dirname + 'data/compact_s1';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
} else {
  app.use(helmet());
}

app.use('/api', SignDetectionRouter);

// app.use(express.static(APP_STATIC_DIR));
// if (!fs.existsSync(APP_STATIC_DIR)) {
//   console.error(
//     'Static files not found. Perhaps you need to run the frontend build step.',
//   );
// }

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err?.message ?? 'Unknown server error', err, {
    originalUrl: req.originalUrl,
  });
  logger.error('Unknown server error', err);
  res.status(500).send('Unknown server error');
};

app.use(errorHandler);

export default app;
