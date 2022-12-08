import express from 'express';
import multer from 'multer';

import { predictAndDetect } from '../controllers/predictAndDetect';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fieldNameSize: 3000,
  },
});
export const SignDetectionRouter = express.Router();

SignDetectionRouter.post(
  '/predict-and-ocr',
  upload.single('image'),
  (request, response) => {
    const file = request.file as Express.Multer.File;

    if (!file) {
      return response
        .status(400)
        .send({ error: 'You need to supply an image' });
    }

    predictAndDetect(request, response);
  },
);
