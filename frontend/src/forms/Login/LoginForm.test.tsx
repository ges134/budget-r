import React from 'react';
import { LoginForm } from './LoginForm';
import BaseCase from '../../lib/Tests/BaseCase';

const getComponent = () => <LoginForm />;

describe('Login form', () => {
  it('should pass basic test cases', () => {
    BaseCase.run(getComponent());
  });
});
