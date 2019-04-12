import React from 'react';

import { GlobalErrors } from './GlobalErrors';
import BaseCase from '../../lib/Tests/BaseCase';
import { mount } from 'enzyme';

let errors: string[];

const getComponent = () => <GlobalErrors errors={errors} />;

describe('GlobalErrors', () => {
  beforeEach(() => {
    errors = [];
  });

  it('should run base cases', () => {
    BaseCase.run(getComponent());
  });

  it('should display nothing when there is no error', () => {
    // Act
    const rendered = mount(getComponent());

    // Assert
    expect(rendered.find('ul').length).toBe(0);
  });

  it('should display an error list when given errors', () => {
    // Arrange
    errors = ['error #1', 'error #2'];

    // Act
    const rendered = mount(getComponent());

    // Assert
    expect(rendered.find('ul').length).toBe(1);
    expect(rendered.find('li').length).toBe(2);
  });
});
