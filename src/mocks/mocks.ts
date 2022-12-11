import { IOcr } from '../types';
// import { mockedOcrResponse } from './responses/ocrMockReponse';
// import { response } from './responses/not_working';
import logger from '../logger';
import { mock } from './responses/30min';

export const mockDetectText = (): Promise<IOcr> => {
  logger.info('Using mock OCR');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mock);
    }, 200);
  });
};
