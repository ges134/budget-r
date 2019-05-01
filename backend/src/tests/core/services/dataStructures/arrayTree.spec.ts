import 'mocha';
import { expect } from 'chai';
import { ArrayTree } from '../../../../core/services/dataStructures';

let sut: ArrayTree<number, string>;
let keys: number;

describe('arrayTree', () => {
  beforeEach(() => {
    keys = 0;
    sut = new ArrayTree<number, string>();
    for (keys = 1; keys <= 3; keys++) {
      sut.add(keys, `pre-added item ${keys}`);
    }
  });

  describe('add', () => {
    it('should add an item when parent is not specified', () => {
      // Arrange

      // Act
      sut.add(++keys, `added item ${keys}`);

      // Assert
      const table = sut.toArray();
      expect(table.length).to.equal(4);
    });

    it('should add an item when is specified', () => {
      // Arrange

      // Act
      sut.add(++keys, `added item ${keys}`, 1);

      // Assert
      const table = sut.toArray();
      expect(table.length).to.equal(4);
    });
  });

  describe('remove', () => {
    it('should remove the node and return the value', () => {
      // Arrange
      sut.add(keys, `to remove ${keys}`, 1);

      // Act
      const result = sut.remove(4);

      // Assert
      expect(result).to.equal('to remove 4');
      expect(sut.count()).to.equal(3);
      expect(sut.toArray()[0]).to.equal('pre-added item 1');
      expect(sut.toArray()[1]).to.equal('pre-added item 2');
      expect(sut.toArray()[2]).to.equal('pre-added item 3');
    });

    it('should return undefined if there is no key', () => {
      // Act
      const result = sut.remove(4);

      // Assert
      expect(result).to.be.undefined; //tslint:disable-line
      expect(sut.count()).to.equal(3);
      expect(sut.toArray()[0]).to.equal('pre-added item 1');
      expect(sut.toArray()[1]).to.equal('pre-added item 2');
      expect(sut.toArray()[2]).to.equal('pre-added item 3');
    });
  });

  describe('get', () => {
    it('should return the node if it exists', () => {
      // Act
      const result = sut.get(1);

      // Assert
      expect(result).to.equal('pre-added item 1');
    });

    it('should return undefined if it does not exists', () => {
      // Act
      const result = sut.get(4);

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
      const result = sut.includes(4);

      // Assert
      expect(result).to.be.false; //tslint:disable-line
    });
  });

  describe('toArray', () => {
    it('should return an array of descending childs', () => {
      // Arrange
      keys--;
      sut.add(++keys, `addeditem ${keys}`, 1);
      sut.add(++keys, `addeditem ${keys}`, 1);
      sut.add(++keys, `addeditem ${keys}`, 5);
      sut.add(++keys, `addeditem ${keys}`, 2);
      sut.add(++keys, `addeditem ${keys}`, 7);
      sut.add(++keys, `addeditem ${keys}`, 2);
      sut.add(++keys, `addeditem ${keys}`, 9);
      sut.add(++keys, `addeditem ${keys}`, 3);
      sut.add(++keys, `addeditem ${keys}`, 11);

      // Act
      const result = sut.toArray();

      // Assert
      expect(result.length).to.equal(12);
      expect(result[0]).to.equal('pre-added item 1');
      expect(result[1]).to.equal('addeditem 4');
      expect(result[2]).to.equal('addeditem 5');
      expect(result[3]).to.equal('addeditem 6');
      expect(result[4]).to.equal('pre-added item 2');
      expect(result[5]).to.equal('addeditem 7');
      expect(result[6]).to.equal('addeditem 8');
      expect(result[7]).to.equal('addeditem 9');
      expect(result[8]).to.equal('addeditem 10');
      expect(result[9]).to.equal('pre-added item 3');
      expect(result[10]).to.equal('addeditem 11');
      expect(result[11]).to.equal('addeditem 12');
    });
  });

  describe('count', () => {
    it('should return the count', () => {
      // Act
      const result = sut.count();

      // Assert
      expect(result).to.equal(3);
    });
  });
});
