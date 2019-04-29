import { TreeSet } from './treeSet';

export class ArrayTree<K, V> {
  private trees: Array<TreeSet<K, V>>;

  public add(key: K, value: V, parent?: K) {
    if (parent) {
      for (const tree of this.trees) {
        if (tree.includes(parent)) {
          tree.add(key, value, parent);
        }
      }
    } else {
      this.trees.push(new TreeSet(key, value));
    }
  }

  public remove(key: K): V | undefined {
    for (const tree of this.trees) {
      if (tree.includes(key)) {
        return tree.remove(key);
      }
    }

    return undefined;
  }

  public get(key: K): V | undefined {
    for (const tree of this.trees) {
      const node = tree.get(key);
      if (node) {
        return node;
      }
    }

    return undefined;
  }

  public includes(key: K): boolean {
    for (const tree of this.trees) {
      if (tree.includes(key)) {
        return true;
      }
    }
    return false;
  }

  public toArray(): V[] {
    const result: V[] = [];
    for (const tree of this.trees) {
      result.push(...tree.toArray());
    }

    return result;
  }
}
