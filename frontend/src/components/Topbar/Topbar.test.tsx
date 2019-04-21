import React from 'react';
import { Topbar } from './Topbar';
import BaseCase from '../../lib/Tests/BaseCase';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

const getComponent = () => (
  <Router>
    <Topbar username={username} />
  </Router>
);

let username: string;

describe('Topbar', () => {
  beforeEach(() => {
    username = 'anUsername';
  });

  it('should run base cases', () => {
    BaseCase.run(getComponent());
  });

  it('should show only a log in button if the user is not logged in', () => {
    // Arrange
    username = '';

    // Act
    const rendered = mount(getComponent());

    // Assert
    expect(rendered.find('a.nav-link').length).toBe(1);
  });

  it('should show the user options if the user is logged in', () => {
    // Act
    const rendered = mount(getComponent());

    // Assert
    expect(rendered.find('a.dropdown-toggle.nav-link').length).toBe(1);
  });
});
