import React, { Component } from 'react';
import { NeedsAuthentication } from '../../components/needsAuthenticaton';
import { InProgress } from '../../components/InProgress';
import { Budget } from '../../lib/models';
import { List } from '../../components/List';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import {
  ListGroupItem,
  Row,
  Col,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';

interface IState {
  budgets: Budget[];
}

export class Budgets extends Component<any, IState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      budgets: []
    };
  }

  public onItemsFetched(data: any[]) {
    const budgets = (data as unknown) as Budget[];
    this.setState({
      budgets
    });
  }

  public render() {
    return (
      <NeedsAuthentication>
        <div className="mt-2" />
        <InProgress />
        <List
          fetchURL="/budgets"
          onItemsFetched={this.onItemsFetched}
          emptyMessage="Oh no! Seems like you have no budgeting project!"
          createLink="/project/create/budget"
          icon={faFileInvoiceDollar}
        >
          {this.state.budgets.map(budget => (
            // TODO: make a link to get to the budget details page.
            <ListGroupItem>
              <Row>
                <Col md={10}>
                  <ListGroupItemHeading>{budget.name}</ListGroupItemHeading>
                  <ListGroupItemText>{budget.description}</ListGroupItemText>
                </Col>
                <Col md={2}>more to come!</Col>
              </Row>
            </ListGroupItem>
          ))}
        </List>
      </NeedsAuthentication>
    );
  }
}
