import { cpus } from 'os';

export const IS_DEV = process.env.NODE_ENV === 'development';

export const DEFAULT_HOST = 'http://localhost';
export const DEFAULT_PORT = 8080;

export const CORES = cpus().length / 2;

export const DEFAULT_THRESHOLD = process.env.DEFAULT_THRESHOLD ?? 0.6;
