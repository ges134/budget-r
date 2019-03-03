import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><Layout>bleh</Layout></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
