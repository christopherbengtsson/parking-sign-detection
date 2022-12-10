import logger from '../logger';

export const logPerformance = (t1: number, t2: number, func?: string) =>
  logger.debug(
    `Took ${
      Math.round((t2 - t1 + Number.EPSILON) * 100) / 100
    } ms ro tun \`${func}\``,
  );
