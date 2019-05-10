import { Helper } from './helper';
import { Ledger } from '../models/presentations/readonly';

const reference = [1, 1, 2, 3, 1, 2, 2, 3, 3, 1, 2, 3, 3, 2];

const getParent = (index: number): number | undefined => {
  switch (index) {
    case 2:
      return 2;
    case 3:
      return 3;
    case 5:
    case 6:
      return 4;
    case 7:
    case 8:
      return 6;
    case 10:
    case 13:
      return 9;
    case 11:
    case 12:
      return 10;
    default:
      return undefined;
  }
};

const generateItems = (): Ledger[] => {
  return reference.map(
    (ref, index) =>
      new Ledger(index, `ledger ${index}`, 1, ref, getParent(index))
  );
};

const numberOfSlashes = (item: string): number => {
  const result = item.match(/\//g);
  if (result === null) {
    return 0;
  }

  return result.length;
};

describe('helper', () => {
  describe('parent ledger options', () => {
    it('should return options accord to child-parent relationship', () => {
      // Act
      const result = Helper.parentLedgerOptions(generateItems());

      // Assert
      expect(result).toHaveLength(14);
      expect(numberOfSlashes(result[0])).toBe(0);
      expect(numberOfSlashes(result[1])).toBe(0);
      expect(numberOfSlashes(result[2])).toBe(1);
      expect(numberOfSlashes(result[3])).toBe(2);
      expect(numberOfSlashes(result[4])).toBe(0);
      expect(numberOfSlashes(result[5])).toBe(1);
      expect(numberOfSlashes(result[6])).toBe(1);
      expect(numberOfSlashes(result[7])).toBe(2);
      expect(numberOfSlashes(result[8])).toBe(2);
      expect(numberOfSlashes(result[9])).toBe(0);
      expect(numberOfSlashes(result[10])).toBe(1);
      expect(numberOfSlashes(result[11])).toBe(2);
      expect(numberOfSlashes(result[12])).toBe(2);
      expect(numberOfSlashes(result[13])).toBe(1);
    });
  });
});
