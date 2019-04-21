import React from 'react';
import { App } from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseCase from '../lib/Tests/BaseCase';

describe('App', () => {
  const getComponent = () => (
    <Router>
      <App />
    </Router>
  );

  it('should run base cases', () => {
    // Act
    BaseCase.run(getComponent());
  });
});
