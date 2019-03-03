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

interface ItopbarProps {}

interface ItopbarState {
  isOpen: boolean,
}

export default class Layout extends Component<ItopbarProps, ItopbarState> {
  constructor(props: ItopbarProps) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  public toggle = () => {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  }

  public render = () => {
    return (
      <Fragment>
        <Navbar color="light" light={true} expand="md">
          <NavbarBrand href="/">Budget-R</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar={true}>
            <Nav className="ml-auto" navbar={true}>
              <UncontrolledDropdown nav={true} inNavbar={true}>
                <DropdownToggle nav={true} caret={true}>
                  Jessy Anglehart-Nunes
                </DropdownToggle>
                <DropdownMenu right={true}>
                  <DropdownItem>
                    My account
                  </DropdownItem>
                  <DropdownItem divider={true} />
                  <DropdownItem>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </Fragment>
    );
  }
}