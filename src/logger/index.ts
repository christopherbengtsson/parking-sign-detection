import { createLogger, transports, format } from 'winston';

const mainLogger = createLogger({
  level: 'info',
  transports: [
    new transports.File({
      filename: 'logs/warning-logs.log',
      level: 'warning',
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.json(),
      ),
    }),
    new transports.File({
      filename: 'logs/error-logs.log',
      level: 'error',
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.json(),
      ),
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  mainLogger.add(
    new transports.Console({
      level:'debug',
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

export default mainLogger;
