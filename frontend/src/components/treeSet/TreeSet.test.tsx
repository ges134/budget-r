import React from 'react';
import { ITreeItem, TreeSet } from './TreeSet';
import { mount } from 'enzyme';

const reference = [1, 1, 2, 3, 1, 2, 2, 3, 3, 1, 2, 3, 3, 2];
let depths: number[];

const generateItems = (): ITreeItem[] => {
  return depths.map((depth, index) => ({
    key: index,
    display: `item ${index + 1}`,
    depth
  }));
};

const getComponent = () => <TreeSet items={generateItems()} />;

describe('Tree set', () => {
  beforeEach(() => {
    depths = reference;
  });

  describe('with only one item', () => {
    it('should render properly', () => {
      // Arrange
      depths = reference.slice(0, 1);

      // Act
      const rendered = mount(getComponent());

      // Assert
      expect(rendered.find('li.list-group-item').length).toBe(1);
      expect(rendered.find('li.offset-1').length).toBe(1);
      expect(rendered.find('li.offset-2').length).toBe(0);
      expect(rendered.find('li.offset-3').length).toBe(0);
    });
  });

  describe('with a chain of single child', () => {
    it('should render properly', () => {
      // Arrange
      depths = reference.slice(1, 4);

      // Act
      const rendered = mount(getComponent());

      // Assert
      expect(rendered.find('.list-group-item').length).toBe(3);
      expect(rendered.find('li.offset-1').length).toBe(1);
      expect(rendered.find('li.offset-2').length).toBe(1);
      expect(rendered.find('li.offset-3').length).toBe(1);
    });
  });

  describe('with multiple children on a [1, 2, 2, 3, 3] structure', () => {
    it('should render properly', () => {
      // Arrange
      depths = reference.slice(4, 9);

      // Act
      const rendered = mount(getComponent());

      // Assert
      expect(rendered.find('.list-group-item').length).toBe(5);
      expect(rendered.find('li.offset-1').length).toBe(1);
      expect(rendered.find('li.offset-2').length).toBe(2);
      expect(rendered.find('li.offset-3').length).toBe(2);
    });
  });

  describe('with multiple roots on a [1, 2, 3, 3, 2] structure', () => {
    it('should render properly', () => {
      // Arrange
      depths = reference.slice(9, 14);

      // Act
      const rendered = mount(getComponent());

      // Assert
      expect(rendered.find('.list-group-item').length).toBe(5);
      expect(rendered.find('li.offset-1').length).toBe(1);
      expect(rendered.find('li.offset-2').length).toBe(2);
      expect(rendered.find('li.offset-3').length).toBe(2);
    });
  });

  describe('with multiple children on a [1, 1, 2, 3, 1, 2, 2, 3, 3, 1, 2, 3, 3, 2] structure', () => {
    it('should render properly', () => {
      // Act
      const rendered = mount(getComponent());

      // Assert
      expect(rendered.find('.list-group-item').length).toBe(14);
      expect(rendered.find('li.offset-1').length).toBe(4);
      expect(rendered.find('li.offset-2').length).toBe(5);
      expect(rendered.find('li.offset-3').length).toBe(5);
    });
  });
});
