import React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { Budgets } from '../pages';

/**
 * /budget routes.
 */
export const Budget = (props: RouteComponentProps) => (
  <>
    <Route exact path={props.match.path} component={Budgets} />
  </>
);
