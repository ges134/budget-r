import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Budgets from '../pages/Budgets/Budgets';
import Transactions from '../pages/Transactions/Transactions';
import Accounts from '../pages/Accounts/Accounts';
import Ledgers from '../pages/Ledgers/Ledgers';
import User from '../pages/User/User';
import NotFound from '../pages/NotFound/NotFound';

const Routes = () => (
  <Switch>
    <Route exact={true} path="/" Component={Home} />
    <Route path="/budgets" Component={Budgets} />
    <Route path="/transactions" Component={Transactions} />
    <Route path="/accounts" Component={Accounts} />
    <Route path="/ledgers" Component={Ledgers} />
    <Route path="/user" Component={User} />
    <Route path='*' Component={NotFound} />
  </Switch>
);

export default Routes;