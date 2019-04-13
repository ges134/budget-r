import React from 'react';
import { FormikFormWrapper } from './FormikFormWrapper';
import BaseCase from '../../lib/Tests/BaseCase';
import { FormikInput } from '../Input';
import { object } from 'yup';
import { mount, shallow } from 'enzyme';

let shouldRedirect: boolean;
const onSubmit = () => {};
const name = 'name';
const label = 'The input label';
const type = 'text';
let helper: string;
let isSubmitting: boolean;

const getComponent = (withInput?: boolean) => (
  <FormikFormWrapper
    shouldRedirect={shouldRedirect}
    initialValues={{}}
    validationSchema={object().shape({})}
    onSubmit={onSubmit}
    submitText="Submit"
    isSubmitting={isSubmitting}
  >
    {withInput ? (
      <FormikInput name={name} label={label} type={type} helper={helper} />
    ) : (
      <></>
    )}
  </FormikFormWrapper>
);

describe('FormikFormWrapper', () => {
  beforeEach(() => {
    shouldRedirect = false;
    isSubmitting = false;
  });

  it('should run basic tests', () => {
    BaseCase.run(getComponent());
  });

  it('should disable button if form is submitting', () => {
    // Arrange
    isSubmitting = true;

    // Act
    const rendered = shallow(getComponent());

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
