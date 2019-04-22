import React from 'react';
import { InProgress } from './InProgress';
import BaseCase from '../../lib/Tests/BaseCase';

const getComponent = () => <InProgress />;

describe('InProgress', () => {
  it('should run base cases', () => {
    BaseCase.run(getComponent());
  });
});
