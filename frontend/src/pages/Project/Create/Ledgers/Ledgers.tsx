import React, { Component } from 'react';
import { NeedsAuthentication } from '../../../../components/needsAuthenticaton';
import { InProgress } from '../../../../components/InProgress';
import { ProgressBar } from '../../../../components';
import { RouteComponentProps } from 'react-router';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LedgerManager } from '../../../../components/Ledger';

import './Ledgers.scss';
import { IManagerExchange } from '../../../../components/Ledger/Manager';

interface IParams {
  budgetID: string;
}

export class Ledgers extends Component<
  RouteComponentProps<IParams>,
  IManagerExchange
> {
  public constructor(props: RouteComponentProps<IParams>) {
    super(props);

    this.state = {
      hasLedgers: false,
      isEditing: false
    };
  }

  public onLedgerUpdate = (info: IManagerExchange) => {
    this.setState({
      ...info
    });
  };

  public render() {
    const extraClassName =
      this.state.hasLedgers && this.state.isEditing ? '' : 'disabled';
    return (
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
                to={`project/create/estimates/${
                  this.props.match.params.budgetID
                }`}
                className={`btn btn-primary ${extraClassName}`}
              >
                Ready? Click here to give estimates
              </Link>
            </Col>
          </Row>
          <LedgerManager
            budgetID={parseInt(this.props.match.params.budgetID, 10)}
          />
        </NeedsAuthentication>
      </>
    );
  }
}
