import React from 'react';
import InputControl from './InputControl';
import BaseCase from '../../lib/Tests/BaseCase';
import { mount, shallow } from 'enzyme';
import { Valid } from '../../lib/Form/FormHelper';
import { IFormFeedbackProps } from '../InputFeedback/InputFeedback';

let resultName = '';
let resultValue = '';

let labelText : string;
let placeholder : string;
let helperText : string;
let onChange = jest.fn();
let feedback: IFormFeedbackProps;
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
    feedback={feedback}
  />
);

describe('InputControl', () => {
  beforeEach(() => {
    const labelAndPlaceholder = "Some text"
    labelText = labelAndPlaceholder;
    placeholder = labelAndPlaceholder;
    feedback= {
      valid: Valid.invariant,
      message: '',
    }
  });

  it('should run basic tests', () => {
    BaseCase.run(getComponent())
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
    // Arrange
    feedback = {
      valid: Valid.invalid,
      message: 'an error message',
    };

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
    rendered.find('input').first().simulate('change', { target: { value: textToFill } });

    // Assert
    expect(onChange).toHaveBeenCalled();
  });
});
