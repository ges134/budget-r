import { TreeSet } from './treeSet';

export interface ITreeSetItemBase {
  key: number;
  display: string;
  parent?: number;
}

export class TreeSetHelper {
  /**
   * Takes an unordered list of items and populates the tree set.
   * @param items the items to populate the tree set.
   */
  public static buildTree(
    items: ITreeSetItemBase[]
  ): Array<TreeSet<number, string>> {
    const returnValue: Array<TreeSet<number, string>> = [];
    const roots = items.filter(item => !item.parent);

    for (const root of roots) {
      returnValue.push(new TreeSet(root.key, root.display));
      const children = items.filter(item => item.parent === root.key);
    }

    const remaining = items.filter(item => item.parent);

    let index = 0;
    while (remaining) {
      const current = remaining[index];
      if (current.parent) {
        const pos = TreeSetHelper.index(returnValue, current.parent);
        if (pos !== -1) {
          returnValue[pos].add(current.key, current.display, current.parent);
          remaining.slice(index, index + 1);
        } else {
          index++;
        }
      }

      if (index >= remaining.length) {
        index = 0;
      }
    }

    return returnValue;
  }

  private static index(
    trees: Array<TreeSet<number, string>>,
    key: number
  ): number {
    for (const tree of trees) {
      if (tree.includes(key)) {
        return trees.indexOf(tree);
      }
    }

    return -1;
  }
}
