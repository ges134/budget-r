import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { FormikFormWrapper } from '../../components/Forms';
import { Budget } from '../../lib/models';
import { verbs } from '../../lib';
import { CardWrapper } from '../../components/CardWrapper';
import { FormikInput } from '../../components/Input';

interface IState {
  budgetID: number;
}

export class LoginForm extends Component<any, IState> {
  public constructor() {
    super({});

    this.state = {
      budgetID: 0
    };
  }

  public onCreationSuccess = (budgetID: number) => {
    this.setState({ budgetID });
  };

  public render() {
    const today = new Date();
    const budget = new Budget('January', today.getFullYear(), '', '');

    return this.state.budgetID ? (
      <Redirect to={`/budgets/create/step2/${this.state.budgetID}`} push />
    ) : (
      <FormikFormWrapper
        initialValues={budget}
        validationSchema={budget.validationSchema}
        submitText="Create your budgetting project"
        submitUrl="/budgets"
        verb={verbs.put}
      >
        <CardWrapper header="Let's start creating your budgeting project">
          <FormikInput
            name="name"
            label="Name of the budgeting project"
            type="text"
          />
          <FormikInput
            name="description"
            label="descriptive information about the budgeting project"
            type="textarea"
          />
          <FormikInput
            name="startMonth"
            label="At what month should this project start?"
            type="select"
          >
            {Budget.months.map(month => (
              <option value={month}>{month}</option>
            ))}
          </FormikInput>
          <FormikInput
            name="startYear"
            label="At what year should this project start?"
            type="number"
          />
        </CardWrapper>
      </FormikFormWrapper>
    );
  }
}
