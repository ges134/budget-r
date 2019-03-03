import { faBook,
  faCashRegister,
  faFileInvoiceDollar,
  faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react';
import { Nav } from 'reactstrap';
import SidebarItem from '../SidebarItem/SidebarItem';

export default class Sidebar extends Component {
  public render() {
    return (
      <div className="bg-dark sticky-top flex-grow-1">
        <Nav vertical={true} className="flex-sm-column">
          <SidebarItem link="/budgets" icon={faFileInvoiceDollar}>
            Budgets
          </SidebarItem>
          <SidebarItem link="/transactions" icon={faCashRegister}>
            Transactions
          </SidebarItem>
          <SidebarItem link="/accounts" icon={faPiggyBank}>
            Accounts
          </SidebarItem>
          <SidebarItem link="/ledgers" icon={faBook}>
            Ledgers
          </SidebarItem>
        </Nav>
      </div>
    );
  }
}