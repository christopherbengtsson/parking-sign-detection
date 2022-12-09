import { IOcr } from '../types';
import { mockedOcrResponse } from './responses/ocrMockReponse';
import logger from '../logger';

export const mockDetectText = (): Promise<IOcr> => {
  logger.info('Using mock OCR');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockedOcrResponse);
    }, 200);
  });
};
