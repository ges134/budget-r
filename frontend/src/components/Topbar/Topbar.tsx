import React, { Component, Fragment } from 'react';
import {
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { cookieName } from '../../lib/constants';
import Cookies from 'js-cookie';

interface IProps {
  username?: string;
}

interface IState {
  isOpen: boolean;
}

export class Topbar extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  public toggle = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  };

  public logout = () => {
    Cookies.remove(cookieName);
    window.location.replace('/');
  };

  public render = () => {
    const loggedIn = (
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {this.props.username}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>My account</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={this.logout}>Logout</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    );

    const noLoggedIn = (
      <Link to="/login" className="nav-link">
        Login
      </Link>
    );

    return (
      <Fragment>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Budget-R</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavbarToggler onClick={this.toggle} />
            {this.props.username ? loggedIn : noLoggedIn}
          </Nav>
        </Navbar>
      </Fragment>
    );
  };
}
