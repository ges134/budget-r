import React from 'react';
import { FormikFormWrapper } from './FormikFormWrapper';
import BaseCase from '../../lib/Tests/BaseCase';
import { FormikInput } from '../Input';
import { object } from 'yup';
import { mount, shallow } from 'enzyme';

let helper: string;

// Input related.
const name = 'name';
const label = 'The input label';
let type: string;

const getComponent = (withInput?: boolean) => (
  <FormikFormWrapper
    initialValues={{}}
    validationSchema={object().shape({})}
    submitText="Submit"
    submitUrl="/"
  >
    {withInput ? getInput() : <></>}
  </FormikFormWrapper>
);

const getInput = () => {
  if (type === 'select') {
    return (
      <FormikInput name={name} label={label} type={type} helper={helper}>
        <option value={1}>value</option>
      </FormikInput>
    );
  } else {
    return (
      <FormikInput name={name} label={label} type={type} helper={helper} />
    );
  }
};

describe('FormikFormWrapper', () => {
  it('should run basic tests', () => {
    BaseCase.run(getComponent());
  });

  it('should disable button if form is submitting', () => {
    // Arrange
    const rendered = shallow(getComponent());

    // Act
    rendered.setState({ isSubmitting: true });

    // Assert
    expect(rendered.find('Button').prop('disabled')).toBeTruthy();
  });

  describe('With FormikInput', () => {
    beforeEach(() => {
      helper = '';
      type = 'text';
    });

    it('should run basic tests', () => {
      BaseCase.run(getComponent(true));
    });

    it('should render an helper text if the property is specified', () => {
      // Arrange
      helper = 'An helper text';

      // Act
      const rendered = mount(getComponent(true));

      // Assert
      expect(rendered.find('.form-text').length).toBe(1);
    });

    it('should render <option> tags if it is a select input', () => {
      // Arrange
      type = 'select';

      // Act
      const rendered = mount(getComponent(true));

      // Assert
      expect(rendered.find('option').length).toBe(1);
    });
  });
});
