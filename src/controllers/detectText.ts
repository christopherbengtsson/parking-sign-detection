import fetch from 'node-fetch';
import logger from '../logger';
import { IOcr } from '../types';

const ocpApimKey = process.env.OCP_APIM_SUBSCRIPTION_KEY;
const requestUrl =
  'https://westeurope.api.cognitive.microsoft.com/computervision/imageanalysis:analyze?features=Read&model-version=latest&n&api-version=2022-10-12-preview';

export const detectText = async (image: Express.Multer.File) => {
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

  return response;
};
