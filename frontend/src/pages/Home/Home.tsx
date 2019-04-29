import React, { Component, Fragment } from 'react';
import { TreeSet } from '../../components';

const Home = () => (
  <Fragment>
    <div>Welcome to budget-R! the app is still being built.</div>
    <p>You're now on the soon to be Home page.</p>
    <p>Here's a test tree view just because.</p>
    <TreeSet
      items={[
        { key: 0, display: 'item 1', depth: 1 },
        { key: 1, display: 'item 2', depth: 1 },
        { key: 2, display: 'item 3', depth: 2 },
        { key: 3, display: 'item 4', depth: 3 },
        { key: 4, display: 'item 5', depth: 1 },
        { key: 5, display: 'item 6', depth: 2 },
        { key: 6, display: 'item 7', depth: 2 },
        { key: 7, display: 'item 8', depth: 3 },
        { key: 8, display: 'item 9', depth: 3 },
        { key: 9, display: 'item 10', depth: 1 },
        { key: 10, display: 'item 11', depth: 2 },
        { key: 11, display: 'item 12', depth: 3 },
        { key: 12, display: 'item 13', depth: 3 },
        { key: 13, display: 'item 14', depth: 2 }
      ]}
    />
  </Fragment>
);

export default Home;
