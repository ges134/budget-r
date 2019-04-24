import React from 'react';
import { Fetching } from './Fetching';
import BaseCase from '../../lib/Tests/BaseCase';

const getComponent = () => <Fetching />;

describe('Fetching', () => {
  it('should run base cases', () => {
    BaseCase.run(getComponent());
  });
});
