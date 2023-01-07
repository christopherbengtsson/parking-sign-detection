import { mockDate, describe, it, expect } from '../testUtils';
import { isHoliday } from './holidays';

describe('holidays current 2026', () => {
  it('isNewYearsDay', () => {
    mockDate('2026-01-01');
    expect(isHoliday()).toBe(true);
  });
  it('isEpiphany', () => {
    mockDate('2026-01-06');
    expect(isHoliday()).toBe(true);
  });
  it('isGoodFriday', () => {
    mockDate('2026-04-03');
    expect(isHoliday()).toBe(true);
  });
  it('isEasterSunday', () => {
    mockDate('2026-04-05');
    expect(isHoliday()).toBe(true);
  });
  it('isEasterMonday', () => {
    mockDate('2026-04-06');
    expect(isHoliday()).toBe(true);
  });
  it('isLabourDay', () => {
    mockDate('2026-05-01');
    expect(isHoliday()).toBe(true);
  });
  it('isAscensionDay', () => {
    mockDate('2026-05-14');
    expect(isHoliday()).toBe(true);
  });
  it('isPentecost', () => {
    mockDate('2026-05-24');
    expect(isHoliday()).toBe(true);
  });
  it('isNationalDay', () => {
    mockDate('2026-06-06');
    expect(isHoliday()).toBe(true);
  });
  it('isMidsummerDay', () => {
    mockDate('2026-06-20');
    expect(isHoliday()).toBe(true);
  });
  it('isAllSaintsDay', () => {
    mockDate('2026-10-31');
    expect(isHoliday()).toBe(true);
  });
  it('isChristmasDay', () => {
    mockDate('2026-12-25');
    expect(isHoliday()).toBe(true);
  });
  it('isBoxingDay', () => {
    mockDate('2026-12-26');
    expect(isHoliday()).toBe(true);
  });
});
