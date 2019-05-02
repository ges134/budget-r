import React, { Component } from 'react';
import { NeedsAuthentication } from '../../../../components/needsAuthenticaton';
import { InProgress } from '../../../../components/InProgress';
import { ProgressBar } from '../../../../components';
import { LedgerForm } from '../../../../forms';
import { IAsync, AxiosWrapper, verbs } from '../../../../lib';
import { RouteComponentProps } from 'react-router';
import { Ledger as Readonly } from '../../../../lib/models/presentations/readonly';
import { Fetching, ErrorAlert } from '../../../../components/Async';

interface IParams {
  budgetID: string;
}

interface IState extends IAsync {
  ledgers: Readonly[];
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

  public componentAccordingToState = () => {
    return this.state.isFetching ? (
      <Fetching />
    ) : this.state.errorMessage.length > 0 ? (
      <ErrorAlert message={this.state.errorMessage} />
    ) : (
      <LedgerForm budgetID={this.budgetID()} ledgers={this.state.ledgers} />
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
