import { pSign } from './pSign';
import { mockDate, describe, it, expect, vi, afterEach } from '../testUtils';

// TODO: Use constants on dates

afterEach(() => {
  vi.clearAllMocks();
});

describe('Rules', () => {
  describe('P-sign', () => {
    it('returns friday on a thursday', () => {
      mockDate('2022-12-01 13:30');
      const expected = new Date('2022-12-02 13:30');
      expect(pSign()).toEqual(expected);
    });
    it('returns monday 23:59 on a friday', () => {
      mockDate('2022-12-02 13:30');
      const expected = new Date('2022-12-05 23:59:59.999');
      expect(pSign()).toEqual(expected);
    });
    it('returns wednesday on a thursday since friday and monday is red', () => {
      mockDate('2022-04-14 13:00');
      const expected = new Date('2022-04-19 23:59:59.999');
      expect(pSign()).toEqual(expected);
    });
  });
});
