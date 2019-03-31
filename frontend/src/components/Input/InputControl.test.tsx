import React from 'react';
import { InputControl } from './InputControl';
import BaseCase from '../../lib/Tests/BaseCase';
import { mount, shallow } from 'enzyme';

let labelText: string;
let placeholder: string;
let helperText: string;
const onChange = jest.fn();
const name = 'TestInput';

const getComponent = () => (
  <InputControl
    labelText={labelText}
    name={name}
    inputType="text"
    placeholder={placeholder}
    helperText={helperText}
    onChange={onChange}
    value=""
  />
);

describe('InputControl', () => {
  beforeEach(() => {
    const labelAndPlaceholder = 'Some text';
    labelText = labelAndPlaceholder;
    placeholder = labelAndPlaceholder;
  });

  it('should run basic tests', () => {
    BaseCase.run(getComponent());
  });

  it('should render an helper text if the property is specified', () => {
    // Arrange
    helperText = 'An helper text';

    // Act
    const renderd = shallow(getComponent());

    // Assert
    expect(renderd.find('FormText').length).toBe(1);
  });

  it('should show errors if errors are present', () => {
    // FIXME: Errors

    // Act
    const rendered = mount(getComponent());

    // Assert
    expect(rendered.find('.invalid-feedback').length).toBe(1);
    expect(rendered.find('.is-invalid').length).toBe(1);
  });

  it('should call onChange of child component', () => {
    // Arrange
    const textToFill = 'An user input';
    const rendered = mount(getComponent());

    // Act
    rendered
      .find('input')
      .first()
      .simulate('change', { target: { value: textToFill } });

    // Assert
    expect(onChange).toHaveBeenCalled();
  });
});
