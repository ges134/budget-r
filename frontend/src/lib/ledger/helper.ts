import { Ledger as Readonly } from '../models/presentations/readonly';
import { ITreeItem } from '../../components';

export class Helper {
  public static parentLedgerOptions(ledgers: Readonly[]): string[] {
    const results: string[] = [];
    for (let i = 0; i < ledgers.length; i++) {
      const current = ledgers[0];
      if (current.depth === 1 || i === 0) {
        results.push(current.name);
      } else {
        let backwardIndex = i;
        let previous = current;
        let display = current.name;

        while (previous.depth !== 1) {
          backwardIndex--;
          previous = ledgers[backwardIndex];
          display = `${previous.name}/${display}`;
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
