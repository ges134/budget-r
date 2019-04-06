import React from 'react';
import { FormikFormWrapper } from './FormikFormWrapper';
import BaseCase from '../../lib/Tests/BaseCase';
import { FormikInput } from '../Input';
import { object } from 'yup';
import { mount } from 'enzyme';

let shouldRedirect: boolean;
const onSubmit = () => {};
const name = 'name';
const label = 'The input label';
const type = 'text';
let helper: string;

const getComponent = (withInput?: boolean) => (
  <FormikFormWrapper
    shouldRedirect={shouldRedirect}
    initialValues={{}}
    validationSchema={object().shape({})}
    onSubmit={onSubmit}
    submitText="Submit"
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
  });

  it('should run basic tests', () => {
    BaseCase.run(getComponent());
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
