import { TreeNode } from './treeNode';

/**
 * Represents a generic tree that can have multiple children
 */
export class TreeSet<K, V> {
  private root: TreeNode<K, V>;

  public constructor(key: K, value: V) {
    this.root = new TreeNode<K, V>(key, value);
  }

  public add(key: K, value: V, parent?: K): void {
    const node = new TreeNode<K, V>(key, value, parent);
    if (parent) {
      const parentNode = this.getNode(parent);
      if (parentNode) {
        parentNode.children.push(node);
      } else {
        this.root.children.push(node);
      }
    } else {
      this.root.children.push(node);
    }
  }

  public remove(key: K): V | undefined {
    const node = this.getNode(key);
    if (node) {
      const parentNode = this.getNode(node.parent);

      if (parentNode) {
        const index = parentNode.children.indexOf(node);
        if (index !== -1) {
          parentNode.children.splice(index, 1);
        }
      }

      return node.value;
    } else {
      return undefined;
    }
  }

  public get(key: K, root?: TreeNode<K, V>): V | undefined {
    const node = this.getNode(key, root);
    if (node) {
      return node.value;
    } else {
      return undefined;
    }
  }

  public includes(key: K): boolean {
    return this.get(key) !== undefined;
  }

  public toArray(start?: TreeNode<K, V>, elements?: V[]): V[] {
    if (start) {
      for (const children of start.children) {
        elements.push(...this.toArray(children, elements));
      }

      return elements;
    } else {
      return this.toArray(this.root, []);
    }
  }

  private getNode(key: K, root?: TreeNode<K, V>): TreeNode<K, V> | undefined {
    const actualRoot = root || this.root;
    if (actualRoot.key === key) {
      return actualRoot;
    } else {
      for (const node of actualRoot.children) {
        const value = this.getNode(key, node);
        if (value) {
          return value;
        }
      }

      return undefined;
    }
  }
}
