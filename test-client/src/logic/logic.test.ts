import { interpretSigns } from '.';
import { mockDate, describe, it, expect } from '../testUtils';
import { pskiva_förbud, thirty_mins } from './mocks';

describe('interpret', () => {
  describe('pskiva_förbud', () => {
    it('out of range weekday', () => {
      const date = '2023-01-09';
      mockDate(`${date} 19:29`);
      const {
        isParkingAllowed,
        maxParkingMins,
        parkingAllowed,
        parkingDiskRequired,
        parkingProhibited,
      } = interpretSigns(pskiva_förbud);

      expect(isParkingAllowed).toBe(true);
      expect(maxParkingMins).toBe(undefined);
      expect(parkingAllowed.to).toEqual(new Date(`${date} 23:00`));
      expect(parkingDiskRequired).toBe(false);
      expect(parkingProhibited.from).toEqual(new Date(`${date} 23:00`));
      expect(parkingProhibited.to).toEqual(new Date(`2023-01-10 04:00`));
    });

    it('out of range saturday', () => {
      const date = '2023-01-07';
      mockDate(`${date} 19:00`);
      const {
        isParkingAllowed,
        maxParkingMins,
        parkingAllowed,
        parkingDiskRequired,
        parkingProhibited,
      } = interpretSigns(pskiva_förbud);

      expect(isParkingAllowed).toBe(true);
      expect(maxParkingMins).toBe(undefined);
      expect(parkingAllowed.to).toEqual(new Date(`${date} 23:00`));
      expect(parkingDiskRequired).toBe(false);
      expect(parkingProhibited.from).toEqual(new Date(`${date} 23:00`));
      expect(parkingProhibited.to).toEqual(new Date(`2023-01-08 04:00`));
    });

    it('in range saturday', () => {
      const date = '2023-01-07';
      mockDate(`${date} 10:00`);
      const {
        isParkingAllowed,
        maxParkingMins,
        parkingAllowed,
        parkingDiskRequired,
        parkingProhibited,
      } = interpretSigns(pskiva_förbud);

      expect(isParkingAllowed).toBe(true);
      expect(maxParkingMins).toBe(60);
      expect(parkingAllowed.to).toEqual(new Date(`${date} 11:00`));
      expect(parkingDiskRequired).toBe(true);
      expect(parkingProhibited.from).toEqual(new Date(`${date} 23:00`));
      expect(parkingProhibited.to).toEqual(new Date(`2023-01-08 04:00`));
    });

    it('in range today saturday', () => {
      const date = '2023-01-07';
      mockDate(`${date} 06:00`);
      const {
        isParkingAllowed,
        maxParkingMins,
        parkingAllowed,
        parkingDiskRequired,
        parkingProhibited,
      } = interpretSigns(pskiva_förbud);

      expect(isParkingAllowed).toBe(true);
      expect(maxParkingMins).toBe(60);
      expect(parkingAllowed.to).toEqual(new Date(`${date} 09:00`));
      expect(parkingDiskRequired).toBe(true);
      expect(parkingProhibited.from).toEqual(new Date(`${date} 23:00`));
      expect(parkingProhibited.to).toEqual(new Date(`2023-01-08 04:00`));
    });

    it('in range today saturday', () => {
      const date = '2023-01-08';
      mockDate(`${date} 06:00`);
      const {
        isParkingAllowed,
        maxParkingMins,
        parkingAllowed,
        parkingDiskRequired,
        parkingProhibited,
      } = interpretSigns(pskiva_förbud);

      expect(isParkingAllowed).toBe(true);
      expect(maxParkingMins).toBe(undefined);
      expect(parkingAllowed.to).toEqual(new Date(`${date} 23:00`));
      expect(parkingDiskRequired).toBe(false);
      expect(parkingProhibited.from).toEqual(new Date(`${date} 23:00`));
      expect(parkingProhibited.to).toEqual(new Date(`2023-01-09 04:00`));
    });
  });

  describe('thirty_mins', () => {
    it('works', () => {
      const date = '2023-01-10';
      mockDate(`${date} 19:29`);
      const {
        isParkingAllowed,
        maxParkingMins,
        parkingAllowed,
        parkingDiskRequired,
        parkingProhibited,
      } = interpretSigns(thirty_mins);

      expect(isParkingAllowed).toBe(true);
      expect(maxParkingMins).toBe(30);
      expect(parkingAllowed.to).toEqual(new Date(`${date} 19:59`));
      expect(parkingDiskRequired).toBe(false);
      expect(parkingProhibited.from).toEqual(null);
      expect(parkingProhibited.to).toEqual(null);
    });
  });
});
