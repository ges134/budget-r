import React, { Component } from 'react';
import { NeedsAuthentication } from '../../components/needsAuthenticaton';
import { InProgress } from '../../components/InProgress';
import { Budget } from '../../lib/models';
import { List } from '../../components/List';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { ListGroupItem, Row, Col, ListGroupItemHeading } from 'reactstrap';
import ListGroupItemText from 'reactstrap/lib/ListGroupItemText';

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
        <InProgress />
        <List
          fetchURL="/budgets"
          onItemsFetched={this.onItemsFetched}
          emptyMessage="Oh noes! Seems like you have no budgetting projects!"
          createLink="/budgets/create"
          icon={faFileInvoiceDollar}
        >
          {this.state.budgets.map(budget => (
            <ListGroupItem>
              <Row>
                <Col md={10}>
                  <ListGroupItemHeading>budget name</ListGroupItemHeading>
                  <ListGroupItemText>Budget description</ListGroupItemText>
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </List>
      </NeedsAuthentication>
    );
  }
}
