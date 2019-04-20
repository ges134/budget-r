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
const type = 'text';

const getComponent = (withInput?: boolean) => (
  <FormikFormWrapper
    initialValues={{}}
    validationSchema={object().shape({})}
    submitText="Submit"
    submitUrl="/"
  >
    {withInput ? (
      <FormikInput name={name} label={label} type={type} helper={helper} />
    ) : (
      <></>
    )}
  </FormikFormWrapper>
);

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
  });
});
