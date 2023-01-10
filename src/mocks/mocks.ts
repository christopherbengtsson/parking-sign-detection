import { IOcr } from '../types';
// import { mockedOcrResponse } from './responses/ocrMockReponse';
import logger from '../logger';
// import { mock } from './responses/pskiva';
// import { mock } from './responses/30min';
import { mock } from './responses/prohibited_odd';

export const mockDetectText = (): Promise<IOcr> => {
  logger.info('Using mock OCR');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mock);
    }, 200);
  });
};
