import React from 'react';
import { SignUpForm } from './SignUpForm';
import BaseCase from '../../lib/Tests/BaseCase';

const getComponent = () => <SignUpForm />;

describe('Sign up form', () => {
  it('should pass basic test cases', () => {
    BaseCase.run(getComponent());
  });
});
