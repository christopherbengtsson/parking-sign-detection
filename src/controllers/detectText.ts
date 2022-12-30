import fetch from 'node-fetch';
import logger from '../logger';
import { IOcr } from '../types';
import { logPerformance } from '../utils/logPerformanceTime';

const ocpApimKey = process.env.OCP_APIM_SUBSCRIPTION_KEY;
const requestUrl =
  'https://westeurope.api.cognitive.microsoft.com/computervision/imageanalysis:analyze?api-version=2022-10-12-preview&features=Read&language=sv';

export const detectText = async (image: Express.Multer.File) => {
  const t1 = performance.now();

  if (!ocpApimKey) {
    logger.error('Could not find `Ocp-Apim-Subscription-Key`');
    throw new Error('Could not find `Ocp-Apim-Subscription-Key`!');
  }

  const response: IOcr = await fetch(requestUrl, {
    method: 'post',
    headers: {
      'Ocp-Apim-Subscription-Key': ocpApimKey,
      'Content-Type': 'application/octet-stream',
    },
    body: image.buffer,
  }).then((res) => res.json());

  const t2 = performance.now();
  logPerformance(t1, t2, 'detectText()');

  return response;
};
