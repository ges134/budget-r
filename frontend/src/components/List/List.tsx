import React, { Component, ReactNode } from 'react';
import { AxiosWrapper, verbs, IAsync } from '../../lib';
import { Fetching, ErrorAlert } from '../Async';
import { IProps as EmptyListProps, EmptyList } from './EmptyList';
import { ListGroup } from 'reactstrap';
import { Link } from 'react-router-dom';

interface IProps extends EmptyListProps {
  fetchURL: string;
  renderContent: (data: any[]) => ReactNode;
  newText: string;
  newLink: string;
  /**
   * It's only used in order to avoid axios calls in tests.
   */
  shouldFetch?: boolean;
}

interface IState extends IAsync {
  data: any[];
}

export class List extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const baseState = {
      hasResults: false,
      errorMessage: '',
      data: []
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
          isFetching: false,
          data
        });
      })
      .catch(err => {
        this.setState({
          errorMessage: err,
          isFetching: false
        });
      });
  };

  public render() {
    return this.state.isFetching ? (
      <Fetching />
    ) : this.state.errorMessage.length > 0 ? (
      <ErrorAlert message={this.state.errorMessage} />
    ) : this.state.data.length > 0 ? (
      <>
        <Link to={this.props.newLink} className="btn btn-primary">
          {this.props.newText}
        </Link>
        <ListGroup flush className="mt-3">
          {this.props.renderContent(this.state.data)}
        </ListGroup>
      </>
    ) : (
      <EmptyList
        emptyMessage={this.props.emptyMessage}
        createLink={this.props.createLink}
        icon={this.props.icon}
      />
    );
  }
}
