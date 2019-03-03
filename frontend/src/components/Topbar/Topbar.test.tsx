import React from 'react';
import ReactDOM from 'react-dom';
import Topbar from './Topbar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Topbar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
