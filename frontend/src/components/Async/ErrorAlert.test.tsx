import React from 'react';
import { ErrorAlert } from './ErrorAlert';
import BaseCase from '../../lib/Tests/BaseCase';

const getComponent = () => <ErrorAlert message="It's an error" />;

describe('Error Alert', () => {
  it('should run base cases', () => {
    BaseCase.run(getComponent());
  });
});
