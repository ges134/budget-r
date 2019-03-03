import React from 'react';
import ReactDOM from 'react-dom';
import SidebarItem from './SidebarItem';
import { faAd } from '@fortawesome/free-solid-svg-icons';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SidebarItem link="#" icon={faAd}>bleh</SidebarItem>, div);
  ReactDOM.unmountComponentAtNode(div);
});
