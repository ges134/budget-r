import React from 'react';
import { Budget } from './Budget';
import BaseCase from '../../lib/Tests/BaseCase';

const getComponent = () => <Budget />;

describe('Budget form', () => {
  it('should pass basic test cases', () => {
    BaseCase.run(getComponent());
  });
});
