import React, { Component, ReactNode } from 'react';
import { NeedsAuthentication } from '../../components/needsAuthenticaton';
import { InProgress } from '../../components/InProgress';
import { Budget } from '../../lib/models/presentations/readonly';
import { List } from '../../components/List';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import {
  ListGroupItem,
  Row,
  Col,
  ListGroupItemHeading,
  ListGroupItemText,
  Progress
} from 'reactstrap';
import { Link } from 'react-router-dom';

import './Budgets.scss';

export class Budgets extends Component {
  public constructor(props: any) {
    super(props);
  }

  public buildLink = (budget: Budget): string => {
    const baseUrl = '/project/create';
    switch (budget.progress.step) {
      case 1:
        return `${baseUrl}/ledgers/${budget.id}`;
      case 2:
        return `${baseUrl}/estimates/${budget.id}`;
      default:
        // TODO: make a link to get to the budget details page.
        return 'to be determined';
    }
  };

  public budgetIsComplete = (budget: Budget): boolean =>
    this.budgetProgression(budget) === 1;

  public budgetProgression = (budget: Budget): number => {
    const { step, outOf } = budget.progress;
    return step / outOf;
  };

  public renderListItems = (data: any[]): ReactNode => {
    const budgets = data as Budget[];

    return (
      <>
        {budgets.map(budget => (
          <ListGroupItem key={budget.id}>
            <Row>
              <Col md={10}>
                <Link to={this.buildLink(budget)} className="link">
                  <ListGroupItemHeading>{budget.name}</ListGroupItemHeading>
                  <ListGroupItemText>{budget.description}</ListGroupItemText>
                </Link>
              </Col>
              <Col md={2}>
                {this.budgetIsComplete(budget) ? (
                  <p>The status will come soon!</p>
                ) : (
                  <Progress value={this.budgetProgression(budget) * 100} />
                )}
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </>
    );
  };

  public render() {
    return (
      <NeedsAuthentication>
        <div className="mt-2" />
        <InProgress />
        <List
          fetchURL="/budgets"
          renderContent={this.renderListItems}
          emptyMessage="Oh no! Seems like you have no budgeting project!"
          createLink="/project/create/budget"
          icon={faFileInvoiceDollar}
          shouldFetch
          newText="New budgetting project"
          newLink="project/create/budget"
        />
      </NeedsAuthentication>
    );
  }
}
