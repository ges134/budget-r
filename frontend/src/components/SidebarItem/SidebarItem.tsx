import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { NavItem } from 'reactstrap';

interface ISidebarItemProps {
  icon: IconProp,
  link: string,
  children: string,
}

const SidebarItem = (props: ISidebarItemProps) => (
  <NavItem>
    <Link to={props.link} className="nav-link">
      <FontAwesomeIcon icon={props.icon} /> &nbsp;
      {props.children}
    </Link>
  </NavItem>
);

export default SidebarItem;