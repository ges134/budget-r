import React, { Component, Fragment } from 'react';
import Layout from '../components/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Budgets from '../pages/Budgets/Budgets';
import Transactions from '../pages/Transactions/Transactions';
import Accounts from '../pages/Accounts/Accounts';
import Ledgers from '../pages/Ledgers/Ledgers';
import NotFound from '../pages/NotFound/NotFound';
import SignUp from '../pages/SignUp/SignUp';

/**
 * Acts as a placeholder for a onepage app.
 */
class App extends Component {
  public render() {
    return (
      <Fragment>
        <Layout>
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route path="/budgets" component={Budgets} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/accounts" component={Accounts} />
            <Route path="/ledgers" component={Ledgers} />
            <Route path="/signup" component={SignUp} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Layout>
      </Fragment>
    );
  }
}

export default App;
