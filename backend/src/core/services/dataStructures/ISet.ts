export interface ISet<K, V> {
  add(key: K, value: V): void;
  remove(key: K): V | undefined;
  get(key: K): V | undefined;
  includes(key: K): boolean;
  toArray(): V[];
  count(): number;
}
