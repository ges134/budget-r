export class TreeNode<K, V> {
  public children: Array<TreeNode<K, V>>;
  constructor(public key: K, public value: V) {
    this.children = [];
  }
}
