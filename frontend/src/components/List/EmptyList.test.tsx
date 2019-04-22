import React from 'react';
import { EmptyList } from './EmptyList';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import BaseCase from '../../lib/Tests/BaseCase';
import { BrowserRouter as Router } from 'react-router-dom';

const getComponent = () => (
  <Router>
    <EmptyList createLink="/" emptyMessage="It's empty" icon={faBook} />
  </Router>
);

describe('EmptyList', () => {
  it('should run base cases', () => {
    BaseCase.run(getComponent());
  });
});
