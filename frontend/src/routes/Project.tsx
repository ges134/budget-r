import React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { Budget, Ledgers } from '../pages';

/**
 * budgeting project routes.
 */
export const Project = (props: RouteComponentProps) => (
  <>
    <Route exact path={props.match.path} component={Budget} />
    <Route
      exact
      path={`${props.match.path}/create/budget`}
      component={Budget}
    />
    <Route
      exact
      path={`${props.match.path}/create/ledgers/:budgetID`}
      component={Ledgers}
    />
  </>
);
