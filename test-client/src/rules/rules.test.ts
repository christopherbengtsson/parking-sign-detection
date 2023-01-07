import { isWithinTimeRange } from './timeRange';
import { mockDate, describe, it, expect, vi, afterEach } from '../testUtils';

// TODO: Use constants on dates

afterEach(() => {
  vi.clearAllMocks();
});

describe('Time ranges', () => {
  it('returns false on invalid ranges', () => {
    let data = ['invalid range'];
    expect(isWithinTimeRange(data)).toBe(null);
    data = ['invalid-range'];
    expect(isWithinTimeRange(data)).toBe(null);
  });

  describe('single ranges', () => {
    it('handles weekdays', () => {
      mockDate('2022-12-01 13:00');
      const data = ['12-16'];

      expect(isWithinTimeRange(data)).toEqual(new Date('2022-12-01 16:00'));
    });
    it('handles days before red days', () => {
      mockDate('2022-12-03 13:00');
      const data = ['(12-16)'];

      expect(isWithinTimeRange(data)).toEqual(new Date('2022-12-03 16:00'));
    });
    it('handles red days', () => {
      mockDate('2022-12-04 13:00');
      const data = ['(12-16)', '12-16'];

      expect(isWithinTimeRange(data)).toEqual(new Date('2022-12-04 16:00'));
    });
  });

  describe('weekend ranges', () => {
    const data = ['(13-17)', '15-17'];

    it('handles days before red days', () => {
      // dayBeforeRedDay in range
      mockDate('2022-12-03 13:10');
      expect(isWithinTimeRange(data)).toEqual(new Date('2022-12-03 17:00'));
      // dayBeforeRedDay off range
      mockDate('2022-12-03 17:10');
      expect(isWithinTimeRange(data)).toEqual(new Date('2022-12-04 17:00'));
    });

    it('handles red days', () => {
      // redDay in range
      mockDate('2022-12-04 16:00');
      expect(isWithinTimeRange(data)).toEqual(new Date('2022-12-04 17:00'));
      // redDay off range
      mockDate('2022-12-04 17:10');
      expect(isWithinTimeRange(data)).toEqual(new Date('2022-12-10 17:00'));
    });
  });

  describe('full ranges', () => {
    const data = ['12-16', '(13-17)', '15-17'];

    it('handles weekdays', () => {
      // weekday in range
      mockDate('2022-12-01 13:00');
      expect(isWithinTimeRange(data)).toEqual(new Date('2022-12-01 16:00'));
      // weekday off range
      mockDate('2022-12-01 17:10');
      expect(isWithinTimeRange(data)).toEqual(new Date('2022-12-02 16:00'));
    });
    it('handles days before red day', () => {
      // dayBeforeRedDay in range
      mockDate('2022-12-03 13:10');
      expect(isWithinTimeRange(data)).toEqual(new Date('2022-12-03 17:00'));
      // dayBeforeRedDay off range
      mockDate('2022-12-03 17:10');
      expect(isWithinTimeRange(data)).toEqual(new Date('2022-12-04 17:00'));
    });
    it('handles red days', () => {
      // redDay in range
      mockDate('2022-12-04 16:00');
      expect(isWithinTimeRange(data)).toEqual(new Date('2022-12-04 17:00'));

      // redDay off range
      mockDate('2022-12-04 17:10');
      expect(isWithinTimeRange(data)).toEqual(new Date('2022-12-05 16:00'));
    });
  });
});
