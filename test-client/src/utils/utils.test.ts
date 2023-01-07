import { it, expect, describe, vi } from 'vitest';
import { isDayBeforeRedDay, isPublicHoliday, isRedDay } from '.';

describe('Red days', () => {
  it('christmas as holiday', () => {
    const date = new Date('2022-12-25');
    vi.setSystemTime(date);
    expect(isPublicHoliday()).toBe(true);
  });
  it('christmas tomorrow as holiday', () => {
    const date = new Date('2022-12-25');
    vi.setSystemTime(date);
    expect(isPublicHoliday(new Date(), 1)).toBe(true);
  });
  it('day before christmas as red day', () => {
    const date = new Date('2022-12-25');
    vi.setSystemTime(date);
    expect(isRedDay()).toBe(true);
  });
  it('day before christmas as day before red day', () => {
    const date = new Date('2022-12-24');
    vi.setSystemTime(date);
    expect(isDayBeforeRedDay()).toBe(true);
  });
});
