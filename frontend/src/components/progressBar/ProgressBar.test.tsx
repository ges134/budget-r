import React from 'react';
import BaseCase from '../../lib/Tests/BaseCase';
import { ProgressBar } from './ProgressBar';

const getComponent = () => <ProgressBar value={50} stepText="A step" />;

describe('ProgressBar', () => {
  it('should run base cases', () => {
    BaseCase.run(getComponent());
  });
});
