import React, { Component, MouseEvent } from 'react';
import { NeedsAuthentication } from '../../../../components/needsAuthenticaton';
import { InProgress } from '../../../../components/InProgress';
import { ProgressBar, TreeSet } from '../../../../components';
import { LedgerForm } from '../../../../forms';
import { IAsync, AxiosWrapper, verbs, LedgerHelper } from '../../../../lib';
import { RouteComponentProps } from 'react-router';
import { Ledger as Readonly } from '../../../../lib/models/presentations/readonly';
import { Fetching, ErrorAlert } from '../../../../components/Async';
import { Row, Col, Button } from 'reactstrap';
import { CardWrapper } from '../../../../components/CardWrapper';
import { Link } from 'react-router-dom';
import { LedgerManager } from '../../../../components/Ledger';

import './Ledgers.scss';

interface IParams {
  budgetID: string;
}

export const Ledgers = (props: RouteComponentProps<IParams>) => (
  <>
    <NeedsAuthentication>
      <div className="mt-2" />
      <InProgress />
      <Row>
        <Col md={8}>
          <ProgressBar value={33} stepText="Ledger creation" />
        </Col>
        <Col md={4} className="text-right">
          <Link
            to={`project/create/estimates/${props.match.params.budgetID}`}
            className="btn btn-primary"
          >
            Ready? Click here to give estimates
          </Link>
        </Col>
      </Row>
      <LedgerManager budgetID={parseInt(props.match.params.budgetID, 10)} />
    </NeedsAuthentication>
  </>
);
