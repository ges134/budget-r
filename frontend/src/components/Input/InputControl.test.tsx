import React from 'react';
import { InputControl } from './InputControl';
import BaseCase from '../../lib/Tests/BaseCase';
import { shallow } from 'enzyme';

const field = {
  name: 'name',
  type: 'text'
};

const touched: { [key: string]: boolean } = {};
const errors: { [key: string]: string } = {};

let form: any = {};

const getComponent = () => <InputControl form={form} field={field} />;

describe('InputControl', () => {
  beforeEach(() => {
    touched[field.name] = false;
    errors[field.name] = '';

    form = {
      touched,
      errors
    };
  });

  it('should run basic tests', () => {
    BaseCase.run(getComponent());
  });

  it('should show errors if errors are present', () => {
    // Arrange
    form.touched[field.name] = true;
    form.errors[field.name] = 'an error message';

    // Act
    const rendered = shallow(getComponent());

    // Assert
    expect(rendered.find('FormFeedback').length).toBe(1);
  });
});
