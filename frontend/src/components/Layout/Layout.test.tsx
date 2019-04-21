import React from 'react';
import { Layout } from './Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseCase from '../../lib/Tests/BaseCase';
import { mount } from 'enzyme';

let username: string;

const getComponent = () => (
  <Router>
    <Layout username={username}>bleh</Layout>
  </Router>
);

describe('Layout', () => {
  beforeEach(() => {
    username = 'anUsername';
  });

  it('should run base cases', () => {
    BaseCase.run(getComponent());
  });

  it('should show the sidebar if the user is logged in', () => {
    // Act
    const rendered = mount(getComponent());

    // Assert
    expect(rendered.find('.sidebar-sticky').length).toBe(1);
  });

  it('should hide the sidebar if the user is not logged in', () => {
    // Arrange
    username = '';

    // Act
    const rendered = mount(getComponent());

    // Assert
    expect(rendered.find('.sidebar-sticky').length).toBe(0);
  });
});
