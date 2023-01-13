export const FEE = 'avgift';
export const PERMIT = 'tillstånd';
export const PARKING_DISK = ['p-skiva', 'pskiva', 'parkeringsskiva'];
export const PREREQUISITES = [FEE, PERMIT, ...PARKING_DISK];

export const getPrerequisite = (str: string) => {
  if (!PREREQUISITES.includes(str)) return undefined;

  switch (str) {
    case FEE:
      return 'paidParking';

    case PERMIT:
      return 'permitParking';

    default:
      return 'parkingDiskRequired';
  }
};
