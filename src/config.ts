import { cpus } from 'os';

export const DEFAULT_HOST = 'http://localhost';
export const DEFAULT_PORT = 3008;

export const CORES = cpus().length / 2;

export const DEFAULT_THRESHOLD = process.env.DEFAULT_THRESHOLD ?? 0.6;
