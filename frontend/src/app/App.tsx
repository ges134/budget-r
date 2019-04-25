import React, { Component, Fragment } from 'react';
import { Layout } from '../components/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Transactions from '../pages/Transactions/Transactions';
import Accounts from '../pages/Accounts/Accounts';
import Ledgers from '../pages/Ledgers/Ledgers';
import NotFound from '../pages/NotFound/NotFound';
import SignUp from '../pages/SignUp/SignUp';
import { Login } from '../pages/Login/Login';
import { AxiosWrapper, verbs } from '../lib';
import { cookieName } from '../lib/constants';
import Cookies from 'js-cookie';
import { Budget } from '../routes';

interface IState {
  isFetchingUser: boolean;
  username: string;
}

/**
 * Acts as a placeholder for a onepage app.
 */
export class App extends Component<any, IState> {
  constructor(props: any) {
    super(props);

    let hasCookies = false;
    const token = Cookies.get(cookieName);

    if (token) {
      hasCookies = token.length > 0;
    }

    this.state = {
      isFetchingUser: hasCookies,
      username: ''
    };

    if (hasCookies) {
      this.fetchUser();
    }
  }

  public fetchUser = () => {
    AxiosWrapper.getInstance()
      .request(verbs.get, '/user')
      .then(res => {
        this.setState({
          username: res.data.username
        });
      })
      .catch(() => {
        Cookies.remove(cookieName);
      })
      .finally(() => {
        this.setState({
          isFetchingUser: false
        });
      });
  };

  public render() {
    return (
      <Fragment>
        {this.state.isFetchingUser ? (
          <p>starting the application...</p>
        ) : (
          <Layout username={this.state.username}>
            <Switch>
              <Route exact={true} path="/" component={Home} />
              <Route path="/budgets" component={Budget} />
              <Route path="/transactions" component={Transactions} />
              <Route path="/accounts" component={Accounts} />
              <Route path="/ledgers" component={Ledgers} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="*" component={NotFound} />
            </Switch>
          </Layout>
        )}
      </Fragment>
    );
  }
}
