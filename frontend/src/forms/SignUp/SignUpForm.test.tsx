import React from 'react';
import SignupForm from './SignUpForm';
import BaseCase from '../../lib/Tests/BaseCase';

const getComponent = () => <SignupForm />;

describe('Sign up form', () => {
  it('should pass basic test cases', () => {
    BaseCase.run(getComponent());
  });
});
