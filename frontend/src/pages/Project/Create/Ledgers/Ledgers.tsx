import React, { Component, MouseEvent } from 'react';
import { NeedsAuthentication } from '../../../../components/needsAuthenticaton';
import { InProgress } from '../../../../components/InProgress';
import { ProgressBar, TreeSet } from '../../../../components';
import { LedgerForm } from '../../../../forms';
import { IAsync, AxiosWrapper, verbs, LedgerHelper } from '../../../../lib';
import { RouteComponentProps } from 'react-router';
import { Ledger as Readonly } from '../../../../lib/models/presentations/readonly';
import { Fetching, ErrorAlert } from '../../../../components/Async';
import { Row, Col } from 'reactstrap';

interface IParams {
  budgetID: string;
}

interface IState extends IAsync {
  ledgers: Readonly[];
  selectedLedger?: Readonly;
}

export class Ledgers extends Component<RouteComponentProps<IParams>, IState> {
  public constructor(props: RouteComponentProps<IParams>) {
    super(props);

    this.state = {
      hasResults: false,
      errorMessage: '',
      isFetching: true,
      ledgers: []
    };

    this.fetch();
  }

  public budgetID = () => {
    return parseInt(this.props.match.params.budgetID, 10);
  };

  public fetch = () => {
    AxiosWrapper.getInstance()
      .request(verbs.get, '/ledgers', { budgetID: this.budgetID() })
      .then(res => {
        const ledgers = (res.data as unknown) as Readonly[];
        this.setState({
          ledgers
        });
      })
      .catch(err => {
        this.setState({
          errorMessage: err
        });
      })
      .finally(() => {
        this.setState({ isFetching: false });
      });
  };

  public onLedgersClick = (event: MouseEvent<HTMLElement>, key: number) => {
    const selectedLedger = this.state.ledgers.filter(
      ledger => ledger.id === key
    )[0];
    this.setState({
      selectedLedger
    });
  };

  public componentAccordingToState = () => {
    return this.state.isFetching ? (
      <Fetching />
    ) : this.state.errorMessage.length > 0 ? (
      <ErrorAlert message={this.state.errorMessage} />
    ) : (
      <Row>
        <Col md={8}>
          <LedgerForm budgetID={this.budgetID()} ledgers={this.state.ledgers} />
        </Col>
        <Col md={4}>
          <TreeSet items={LedgerHelper.toTree(this.state.ledgers)} />
        </Col>
      </Row>
    );
  };

  public render() {
    return (
      <>
        <NeedsAuthentication>
          <div className="mt-2" />
          <InProgress />
          <ProgressBar value={33} stepText="Ledger creation" />
          {this.componentAccordingToState()}
        </NeedsAuthentication>
      </>
    );
  }
}
