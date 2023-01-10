import { interpretSigns } from '.';
import { mockDate, describe, it, expect } from '../testUtils';
import {
  prohibited_even,
  prohibited_odd,
  pskiva_förbud,
  thirty_mins,
  two_hours,
} from './mocks';

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

  describe('max minutes parking', () => {
    it('30 mins', () => {
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

    it('2 tim', () => {
      const date = '2023-01-10';
      mockDate(`${date} 19:29`);
      const {
        isParkingAllowed,
        maxParkingMins,
        parkingAllowed,
        parkingDiskRequired,
        parkingProhibited,
      } = interpretSigns(two_hours);

      expect(isParkingAllowed).toBe(true);
      expect(maxParkingMins).toBe(120);
      expect(parkingAllowed.to).toEqual(new Date(`${date} 21:29`));
      expect(parkingDiskRequired).toBe(false);
      expect(parkingProhibited.from).toEqual(null);
      expect(parkingProhibited.to).toEqual(null);
    });
  });

  describe('date parking', () => {
    describe('prohibited_odd', () => {
      it('out of range even day', () => {
        const date = '2023-01-10';
        mockDate(`${date} 09:11`);
        const {
          isParkingAllowed,
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = interpretSigns(prohibited_odd);

        expect(isParkingAllowed).toBe(true);
        expect(maxParkingMins).toBe(undefined);
        expect(parkingAllowed.to).toEqual(new Date('2023-01-11 00:00'));
        expect(parkingDiskRequired).toBe(false);
        expect(parkingProhibited.from).toEqual(new Date('2023-01-11 00:00'));
        expect(parkingProhibited.to).toEqual(new Date('2023-01-11 08:00'));
      });

      it('out of range odd day', () => {
        const date = '2023-01-11';
        mockDate(`${date} 09:11`);
        const {
          isParkingAllowed,
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = interpretSigns(prohibited_odd);

        expect(isParkingAllowed).toBe(true);
        expect(maxParkingMins).toBe(undefined);
        expect(parkingAllowed.to).toEqual(new Date('2023-01-13 00:00'));
        expect(parkingDiskRequired).toBe(false);
        expect(parkingProhibited.from).toEqual(new Date('2023-01-13 00:00'));
        expect(parkingProhibited.to).toEqual(new Date('2023-01-13 08:00'));
      });
      it('in range even day', () => {
        const date = '2023-01-10';
        mockDate(`${date} 00:11`);
        const {
          isParkingAllowed,
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = interpretSigns(prohibited_odd);

        expect(isParkingAllowed).toBe(true);
        expect(maxParkingMins).toBe(undefined);
        expect(parkingAllowed.to).toEqual(new Date('2023-01-11 00:00'));
        expect(parkingDiskRequired).toBe(false);
        expect(parkingProhibited.from).toEqual(new Date('2023-01-11 00:00'));
        expect(parkingProhibited.to).toEqual(new Date('2023-01-11 08:00'));
      });

      it('in range odd day', () => {
        const date = '2023-01-11';
        mockDate(`${date} 00:11`);
        const {
          isParkingAllowed,
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = interpretSigns(prohibited_odd);

        expect(isParkingAllowed).toBe(false);
        expect(maxParkingMins).toBe(undefined);
        expect(parkingAllowed.to).toEqual(null);
        expect(parkingDiskRequired).toBe(false);
        expect(parkingProhibited.from).toEqual(new Date('2023-01-11 00:11'));
        expect(parkingProhibited.to).toEqual(new Date('2023-01-11 08:00'));
      });
    });

    describe('prohibited_even', () => {
      it('out of range odd day', () => {
        const date = '2023-01-11';
        mockDate(`${date} 09:11`);
        const {
          isParkingAllowed,
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = interpretSigns(prohibited_even);

        expect(isParkingAllowed).toBe(true);
        expect(maxParkingMins).toBe(undefined);
        expect(parkingAllowed.to).toEqual(new Date('2023-01-12 00:00'));
        expect(parkingDiskRequired).toBe(false);
        expect(parkingProhibited.from).toEqual(new Date('2023-01-12 00:00'));
        expect(parkingProhibited.to).toEqual(new Date('2023-01-12 08:00'));
      });

      it('out of range even day', () => {
        const date = '2023-01-12';
        mockDate(`${date} 09:11`);
        const {
          isParkingAllowed,
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = interpretSigns(prohibited_even);

        expect(isParkingAllowed).toBe(true);
        expect(maxParkingMins).toBe(undefined);
        expect(parkingAllowed.to).toEqual(new Date('2023-01-14 00:00'));
        expect(parkingDiskRequired).toBe(false);
        expect(parkingProhibited.from).toEqual(new Date('2023-01-14 00:00'));
        expect(parkingProhibited.to).toEqual(new Date('2023-01-14 08:00'));
      });

      it('in range odd day', () => {
        const date = '2023-01-11';
        mockDate(`${date} 00:11`);
        const {
          isParkingAllowed,
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = interpretSigns(prohibited_even);

        expect(isParkingAllowed).toBe(true);
        expect(maxParkingMins).toBe(undefined);
        expect(parkingAllowed.to).toEqual(new Date('2023-01-12 00:00'));
        expect(parkingDiskRequired).toBe(false);
        expect(parkingProhibited.from).toEqual(new Date('2023-01-12 00:00'));
        expect(parkingProhibited.to).toEqual(new Date('2023-01-12 08:00'));
      });

      it('in range even day', () => {
        const date = '2023-01-12';
        mockDate(`${date} 00:11`);
        const {
          isParkingAllowed,
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = interpretSigns(prohibited_even);

        expect(isParkingAllowed).toBe(false);
        expect(maxParkingMins).toBe(undefined);
        expect(parkingAllowed.to).toEqual(null);
        expect(parkingDiskRequired).toBe(false);
        expect(parkingProhibited.from).toEqual(new Date('2023-01-12 00:11'));
        expect(parkingProhibited.to).toEqual(new Date('2023-01-12 08:00'));
      });
    });
  });
});
