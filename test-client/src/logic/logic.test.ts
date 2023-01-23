import { interpretSigns } from '.';
import { mockDate, describe, it, expect } from '../testUtils';
import {
  double_time_range,
  prohibited_even,
  prohibited_odd,
  prohibited_range,
  pskiva_förbud,
  thirty_mins,
  two_hours,
} from './mocks';

describe('interpret', () => {
  describe('pskiva_förbud', () => {
    it('out of range weekday', () => {
      const date = '2023-01-09';
      mockDate(`${date} 19:29`);
      const { isParkingAllowed, rules } = interpretSigns(pskiva_förbud);
      const {
        maxParkingMins,
        parkingAllowed,
        parkingDiskRequired,
        parkingProhibited,
      } = rules[0];
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
      const { isParkingAllowed, rules } = interpretSigns(pskiva_förbud);
      const {
        maxParkingMins,
        parkingAllowed,
        parkingDiskRequired,
        parkingProhibited,
      } = rules[0];
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
      const { isParkingAllowed, rules } = interpretSigns(pskiva_förbud);
      const {
        maxParkingMins,
        parkingAllowed,
        parkingDiskRequired,
        parkingProhibited,
      } = rules[0];
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
      const { isParkingAllowed, rules } = interpretSigns(pskiva_förbud);
      const {
        maxParkingMins,
        parkingAllowed,
        parkingDiskRequired,
        parkingProhibited,
      } = rules[0];
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
      const { isParkingAllowed, rules } = interpretSigns(pskiva_förbud);
      const {
        maxParkingMins,
        parkingAllowed,
        parkingDiskRequired,
        parkingProhibited,
      } = rules[0];
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
      const { isParkingAllowed, rules } = interpretSigns(thirty_mins);
      const {
        maxParkingMins,
        parkingAllowed,
        parkingDiskRequired,
        parkingProhibited,
      } = rules[0];
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
      const { isParkingAllowed, rules } = interpretSigns(two_hours);
      const {
        maxParkingMins,
        parkingAllowed,
        parkingDiskRequired,
        parkingProhibited,
      } = rules[0];
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
        const { isParkingAllowed, rules } = interpretSigns(prohibited_odd);
        const {
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = rules[0];
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
        const { isParkingAllowed, rules } = interpretSigns(prohibited_odd);
        const {
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = rules[0];
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
        const { isParkingAllowed, rules } = interpretSigns(prohibited_odd);
        const {
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = rules[0];
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
        const { isParkingAllowed, rules } = interpretSigns(prohibited_odd);
        const {
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = rules[0];
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
        const { isParkingAllowed, rules } = interpretSigns(prohibited_even);
        const {
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = rules[0];
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
        const { isParkingAllowed, rules } = interpretSigns(prohibited_even);
        const {
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = rules[0];
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
        const { isParkingAllowed, rules } = interpretSigns(prohibited_even);
        const {
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = rules[0];
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
        const { isParkingAllowed, rules } = interpretSigns(prohibited_even);
        const {
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = rules[0];
        expect(isParkingAllowed).toBe(false);
        expect(maxParkingMins).toBe(undefined);
        expect(parkingAllowed.to).toEqual(null);
        expect(parkingDiskRequired).toBe(false);
        expect(parkingProhibited.from).toEqual(new Date('2023-01-12 00:11'));
        expect(parkingProhibited.to).toEqual(new Date('2023-01-12 08:00'));
      });
    });
  });

  describe('prohibited', () => {
    describe('prohibited range', () => {
      it('out of range weekday', () => {
        const date = '2023-01-11';
        mockDate(`${date} 17:11`);
        const { isParkingAllowed, rules } = interpretSigns(prohibited_range);
        const {
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = rules[0];
        expect(isParkingAllowed).toBe(true);
        expect(maxParkingMins).toBe(undefined);
        expect(parkingAllowed.to).toEqual(new Date('2023-01-12 08:00'));
        expect(parkingDiskRequired).toBe(false);
        expect(parkingProhibited.from).toEqual(new Date('2023-01-12 08:00'));
        expect(parkingProhibited.to).toEqual(new Date('2023-01-12 17:00'));
      });

      it('in range weekday', () => {
        const date = '2023-01-11';
        mockDate(`${date} 15:11`);
        const { isParkingAllowed, rules } = interpretSigns(prohibited_range);
        const {
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = rules[0];
        expect(isParkingAllowed).toBe(false);
        expect(maxParkingMins).toBe(undefined);
        expect(parkingAllowed.to).toEqual(null);
        expect(parkingDiskRequired).toBe(false);
        expect(parkingProhibited.from).toEqual(new Date('2023-01-11 15:11'));
        expect(parkingProhibited.to).toEqual(new Date('2023-01-11 17:00'));
      });

      it('off range weekday, next day is saturday', () => {
        const date = '2023-01-13';
        mockDate(`${date} 17:11`);
        const { isParkingAllowed, rules } = interpretSigns(prohibited_range);
        const {
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = rules[0];
        expect(isParkingAllowed).toBe(true);
        expect(maxParkingMins).toBe(undefined);
        expect(parkingAllowed.to).toEqual(new Date('2023-01-14 09:00'));
        expect(parkingDiskRequired).toBe(false);
        expect(parkingProhibited.from).toEqual(new Date('2023-01-14 09:00'));
        expect(parkingProhibited.to).toEqual(new Date('2023-01-14 18:00'));
      });

      it('off range saturday', () => {
        const date = '2023-01-14';
        mockDate(`${date} 19:11`);
        const { isParkingAllowed, rules } = interpretSigns(prohibited_range);
        const {
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = rules[0];
        expect(isParkingAllowed).toBe(true);
        expect(maxParkingMins).toBe(undefined);
        expect(parkingAllowed.to).toEqual(new Date('2023-01-16 08:00'));
        expect(parkingDiskRequired).toBe(false);
        expect(parkingProhibited.from).toEqual(new Date('2023-01-16 08:00'));
        expect(parkingProhibited.to).toEqual(new Date('2023-01-16 17:00'));
      });

      it('in range saturday', () => {
        const date = '2023-01-14';
        mockDate(`${date} 15:11`);
        const { isParkingAllowed, rules } = interpretSigns(prohibited_range);
        const {
          maxParkingMins,
          parkingAllowed,
          parkingDiskRequired,
          parkingProhibited,
        } = rules[0];
        expect(isParkingAllowed).toBe(false);
        expect(maxParkingMins).toBe(undefined);
        expect(parkingAllowed.to).toEqual(null);
        expect(parkingDiskRequired).toBe(false);
        expect(parkingProhibited.from).toEqual(new Date('2023-01-14 15:11'));
        expect(parkingProhibited.to).toEqual(new Date('2023-01-14 18:00'));
      });
    });
  });

  describe('two parking rules', () => {
    it('in range weekday', () => {
      const date = '2023-01-11';
      mockDate(`${date} 08:00`);
      const { isParkingAllowed, rules } = interpretSigns(double_time_range);

      expect(rules.length).toBe(2);
      expect(isParkingAllowed).toBe(true);

      expect(rules[0].maxParkingMins).toBe(60);
      expect(rules[0].parkingAllowed.to).toEqual(new Date('2023-01-11 09:00'));
      expect(rules[0].parkingDiskRequired).toBe(true);

      expect(rules[1].maxParkingMins).toBe(240);
      expect(rules[1].parkingAllowed.to).toEqual(new Date('2023-01-11 13:00'));
      expect(rules[1].parkingDiskRequired).toBe(false);
    });
  });
});
