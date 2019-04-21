import React, { Component, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { cookieName } from '../../lib/constants';
import { Redirect } from 'react-router';

interface IProps {
  children: ReactNode;
}

interface IState {
  hasAccess: boolean;
}

/**
 * Since we check the validity of the token at the startup of the app.
 * We only need to know if the cookie is still alive when user hits a route
 * that needs authentication.
 */
export class NeedsAuthentication extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const token = Cookies.get(cookieName);
    let hasAccess: boolean = false;
    if (token) {
      hasAccess = token.length > 0;
    }

    this.state = {
      hasAccess
    };
  }

  public render() {
    return this.state.hasAccess ? (
      this.props.children
    ) : (
      <Redirect to="/login" />
    );
  }
}
