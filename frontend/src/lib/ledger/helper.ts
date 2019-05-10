import { Ledger as Readonly } from '../models/presentations/readonly';
import { ITreeItem } from '../../components';

export class Helper {
  public static parentLedgerOptions(ledgers: Readonly[]): string[] {
    const results: string[] = [];
    for (let i = 0; i < ledgers.length; i++) {
      const current = ledgers[i];
      if (current.depth === 1 || i === 0) {
        results.push(current.name);
      } else {
        let backwardIndex = i;
        let previous = current;
        let display = current.name;
        const depths = [current.depth];

        while (previous.depth !== 1) {
          backwardIndex--;
          previous = ledgers[backwardIndex];
          if (
            previous.depth < current.depth &&
            !depths.includes(previous.depth)
          ) {
            display = `${previous.name}/${display}`;
            depths.push(previous.depth);
          }
        }

        results.push(display);
      }
    }

    return results;
  }

  public static toTree(ledgers: Readonly[]): ITreeItem[] {
    return ledgers.map(ledger => ({
      key: ledger.id,
      display: ledger.name,
      depth: ledger.depth
    }));
  }
}
