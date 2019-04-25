import React from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { Budgets, Step1 } from '../pages';

/**
 * /budget routes.
 */
export const Budget = (props: RouteComponentProps) => (
  <>
    <Route exact path={props.match.path} component={Budgets} />
    <Route exact path={`${props.match.path}/create/step1`} component={Step1} />
  </>
);
