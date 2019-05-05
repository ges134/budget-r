import React from 'react';
import { List } from './List';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import BaseCase from '../../lib/Tests/BaseCase';
import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

const renderItems = () => <li>the content of the list</li>;

const getComponent = () => (
  <Router>
    <List
      fetchURL="/"
      emptyMessage="It's empty!"
      createLink="/create"
      icon={faBook}
      shouldFetch={false}
      newText="New"
      renderContent={renderItems}
    />
  </Router>
);

describe('List', () => {
  it('should run base cases', () => {
    BaseCase.run(getComponent());
  });

  it('should show a fetching component if it is still fetching for items', () => {
    // Arrange
    const rendered = shallow(getComponent())
      .dive()
      .dive();

    // Act
    rendered.setState({ isFetching: true });

    // Assert
    expect(rendered.find('Fetching').length).toBe(1);
  });

  it('should show an error component if it is has an error', async () => {
    // Arrange
    const rendered = shallow(getComponent())
      .dive()
      .dive();

    // Act
    rendered.setState({ errorMessage: 'an error message' });

    // Assert
    expect(rendered.find('ErrorAlert').length).toBe(1);
  });

  it('should show an empty list component if it has no items', async () => {
    // Arrange
    const rendered = shallow(getComponent())
      .dive()
      .dive();

    // Act
    rendered.setState({
      errorMessage: ''
    });

    // Assert
    expect(rendered.find('EmptyList').length).toBe(1);
  });

  it('should show a list group if the list has items', async () => {
    // Arrange
    const rendered = shallow(getComponent())
      .dive()
      .dive();

    // Act
    rendered.setState({
      errorMessage: '',
      data: ['hello']
    });

    // Assert
    expect(rendered.find('ListGroup').length).toBe(1);
  });
});
