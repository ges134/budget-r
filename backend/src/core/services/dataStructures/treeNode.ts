export class TreeNode<K, V> {
  public children: Array<TreeNode<K, V>>;
  constructor(public key: K, public value: V, public parent?: K) {
    this.children = [];
  }
}
