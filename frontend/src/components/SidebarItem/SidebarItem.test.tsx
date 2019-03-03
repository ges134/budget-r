import React from 'react';
import ReactDOM from 'react-dom';
import SidebarItem from './SidebarItem';
import { faAd } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders without crashing', () => {
  const component = (
    <Router>
      <SidebarItem link="#" icon={faAd}>bleh</SidebarItem>
    </Router>
  );
  const div = document.createElement('div');
  ReactDOM.render(component, div);
  ReactDOM.unmountComponentAtNode(div);
});
