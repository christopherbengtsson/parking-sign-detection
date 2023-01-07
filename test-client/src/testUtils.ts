import { vi } from 'vitest';

export const mockDate = (date: string) => {
  vi.setSystemTime(new Date(date));
};

export * from 'vitest';
