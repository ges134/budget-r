import 'mocha';
import { expect } from 'chai';
import { TreeSet } from '../../../../core/services/dataStructures';

let sut: TreeSet<number, string>;
let keys: number;

const key = () => {
  keys++;
  return keys;
};

describe('treeset', () => {
  beforeEach(() => {
    keys = 0;
    sut = new TreeSet<number, string>(key(), `item ${keys}`);
  });

  describe('add', () => {
    beforeEach(() => {
      const aKey = key();
      sut.add(aKey, `pre-added item ${aKey}`);
    });

    it('should add an item to the root if parent is unspecified', () => {
      // Act
      const aKey = key();
      sut.add(aKey, `added item ${aKey}`);

      // Assert
      const array = sut.toArray();
      expect(sut.count()).to.equal(3);
      expect(array[0]).to.equal('item 1');
      expect(array[1]).to.equal('pre-added item 2');
      expect(array[2]).to.equal('added item 3');
    });

    it('should add an item to a specific node if parent is specified', () => {
      // Act
      const aKey = key();
      sut.add(aKey, `added item ${aKey}`, 2);

      // Assert
      const array = sut.toArray();
      expect(sut.count()).to.equal(3);
      expect(array[0]).to.equal('item 1');
      expect(array[1]).to.equal('pre-added item 2');
      expect(array[2]).to.equal('added item 3');
    });
  });

  describe('describe remove', () => {
    it('should remove the node and return the value', () => {
      // Arrange
      const aKey = key();
      sut.add(aKey, `to remove ${aKey}`);

      // Act
      const result = sut.remove(2);

      // Assert
      expect(result).to.equal('to remove 2');
      expect(sut.count()).to.equal(1);
      expect(sut.toArray()[0]).to.equal('item 1');
    });

    it('should return undefined if there is no key', () => {
      // Act
      const result = sut.remove(2);

      // Assert
      expect(result).to.be.undefined; //tslint:disable-line
      expect(sut.count()).to.equal(1);
      expect(sut.toArray()[0]).to.equal('item 1');
    });
  });

  describe('get', () => {
    it('should return the node if it exists', () => {
      // Act
      const result = sut.get(1);

      // Assert
      expect(result).to.equal('item 1');
    });

    it('should return undefined if it does not exists', () => {
      // Act
      const result = sut.get(2);

      // Assert
      expect(result).to.be.undefined; //tslint:disable-line
    });
  });

  describe('includes', () => {
    it('should return true if the key is in the tree', () => {
      // Act
      const result = sut.includes(1);

      // Assert
      expect(result).to.be.true; //tslint:disable-line
    });

    it('should return false otherwise', () => {
      // Act
      const result = sut.includes(2);

      // Assert
      expect(result).to.be.false; //tslint:disable-line
    });
  });

  describe('toArray', () => {
    it('should return an array of descending children', () => {
      // Arrange
      const key1 = key();
      const key2 = key();
      const key3 = key();
      const key4 = key();
      sut.add(key1, `addeditem ${key1}`);
      sut.add(key2, `addeditem ${key2}`);
      sut.add(key3, `addeditem ${key3}`, 2);
      sut.add(key4, `addeditem ${key4}`, 2);

      // Act
      const result = sut.toArray();

      // Assert
      expect(result.length).to.equal(5);
      expect(result[0]).to.equal('item 1');
      expect(result[1]).to.equal('addeditem 2');
      expect(result[2]).to.equal('addeditem 4');
      expect(result[3]).to.equal('addeditem 5');
      expect(result[4]).to.equal('addeditem 3');
    });
  });

  describe('count', () => {
    it('should return the count', () => {
      // Arrange
      const key1 = key();
      const key2 = key();
      const key3 = key();
      const key4 = key();
      sut.add(key1, `addeditem ${key1}`);
      sut.add(key2, `addeditem ${key2}`);
      sut.add(key3, `addeditem ${key3}`, 2);
      sut.add(key4, `addeditem ${key4}`, 2);

      // Act
      const result = sut.count();

      // Assert
      expect(result).to.equal(5);
    });
  });
});
