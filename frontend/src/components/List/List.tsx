import React, { Component, ReactNode } from 'react';
import { AxiosWrapper, verbs } from '../../lib';
import { Fetching } from './Fetching';
import { ErrorAlert } from './ErrorAlert';
import { IProps as EmptyListProps, EmptyList } from './EmptyList';
import { ListGroup } from 'reactstrap';

interface IProps extends EmptyListProps {
  children: ReactNode;
  fetchURL: string;
  onItemsFetched: (data: any[]) => void;
  /**
   * It's only used in order to avoid axios calls in tests.
   */
  shouldFetch?: boolean;
}

interface IState {
  isFetching: boolean;
  hasResults: boolean;
  errorMessage: string;
}

export class List extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const baseState = {
      hasResults: false,
      errorMessage: ''
    };

    if (props.shouldFetch) {
      this.fetch();
      this.state = {
        isFetching: true,
        ...baseState
      };
    } else {
      this.state = {
        isFetching: false,
        ...baseState
      };
    }
  }

  public fetch = () => {
    AxiosWrapper.getInstance()
      .request(verbs.get, this.props.fetchURL)
      .then(res => {
        const { data } = res;

        this.setState({
          hasResults: data.length > 0
        });

        this.props.onItemsFetched(data);
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

  public render() {
    return this.state.isFetching ? (
      <Fetching />
    ) : this.state.errorMessage.length > 0 ? (
      <ErrorAlert message={this.state.errorMessage} />
    ) : this.state.hasResults ? (
      <ListGroup flush>{this.props.children}</ListGroup>
    ) : (
      <EmptyList
        emptyMessage={this.props.emptyMessage}
        createLink={this.props.createLink}
        icon={this.props.icon}
      />
    );
  }
}
