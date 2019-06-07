import React, { Component, MouseEvent } from 'react';
import { Fetching, ErrorAlert } from '../Async';
import { Row, Col } from 'reactstrap';
import { LedgerForm } from '../../forms';
import { CardWrapper } from '../CardWrapper';
import { TreeSet } from '..';
import { Ledger } from '../../lib/models/presentations/readonly';
import {
  IAsync,
  AxiosWrapper,
  verbs,
  LedgerHelper,
  Ledger as Presentation
} from '../../lib';

interface IProps {
  budgetID: number;
  onLedgerUpdate?: (info: IManagerExchange) => void;
}

interface IState extends IAsync {
  isFetching: boolean;
  errorMessage: string;
  ledgers: Ledger[];
  selectedLedger?: Ledger;
}

export interface IManagerExchange {
  hasLedgers: boolean;
  isEditing: boolean;
}

export class Manager extends Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);

    this.state = {
      hasResults: false,
      errorMessage: '',
      isFetching: true,
      ledgers: []
    };
  }

  public onSuccess = () => {
    this.fetch();
  };

  public fetch = () => {
    AxiosWrapper.getInstance()
      .request(verbs.get, '/ledgers', { budgetID: this.props.budgetID })
      .then(res => {
        const ledgers = (res.data as unknown) as Ledger[];
        this.setState({
          ledgers
        });
        if (this.props.onLedgerUpdate) {
          const info: IManagerExchange = {
            hasLedgers: this.state.ledgers.length > 0,
            isEditing:
              this.state.selectedLedger !== undefined &&
              this.state.selectedLedger !== null
          };
          this.props.onLedgerUpdate(info);
        }
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
    if (!this.state.selectedLedger) {
      const selectedLedger = this.state.ledgers.filter(
        ledger => ledger.id === key
      )[0];
      this.setState({
        selectedLedger
      });
    }
  };

  public componentDidMount() {
    this.fetch();
  }

  public componentWillUnmount() {
    AxiosWrapper.getInstance().cancel();
  }

  public render() {
    let ledger: Presentation | undefined;
    if (this.state.selectedLedger) {
      const { name, parentLedgerID, budgetID } = this.state.selectedLedger;
      ledger = new Presentation(name, budgetID, parentLedgerID);
    }
    return this.state.isFetching ? (
      <Fetching />
    ) : this.state.errorMessage.length > 0 ? (
      <ErrorAlert message={this.state.errorMessage} />
    ) : (
      <>
        <Row>
          <Col md={8}>
            <LedgerForm
              budgetID={this.props.budgetID}
              ledgers={this.state.ledgers}
              onSuccess={this.onSuccess}
              initialLedger={ledger}
            />
          </Col>
          <Col md={4} className="d-flex align-item-stretch card-button">
            <CardWrapper header="your ledgers" className="ledgers">
              {this.state.ledgers.length ? (
                <TreeSet
                  items={LedgerHelper.toTree(this.state.ledgers)}
                  onClick={this.onLedgersClick}
                />
              ) : (
                <p>Once created, your ledgers will appear here</p>
              )}
            </CardWrapper>
          </Col>
        </Row>
      </>
    );
  }
}
