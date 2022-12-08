import logger from '../logger';

export const logPerformance = (t1: number, t2: number, msgSuffix?: string) =>
  logger.debug(t2 - t1 + ' ms ' + msgSuffix);
