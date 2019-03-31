import React, { Component, MouseEventHandler } from 'react';
import { CardWrapper } from '../../components/CardWrapper';
import { Form, Button } from 'reactstrap';
import { FormikInput } from '../../components/Input';
import { Signup as Presentation } from 'budget-r-models';
import { Formik } from 'formik';
import axios from 'axios';
import { IAsyncForm } from '../../lib/Form/IAsyncForm';
import { Redirect } from 'react-router';
import { FormikFormWrapper } from '../../components/Forms';

export default class SignUpForm extends Component<any, IAsyncForm> {
  constructor(props: any) {
    super(props);

    this.state = {
      isSubmitting: false,
      hasSucceeded: false
    };
  }

  public onSubmit = () => {
    axios
      .post('')
      .then(() => {
        this.setState({
          isSubmitting: false,
          hasSucceeded: true
        });
      })
      .catch(err => {
        // FIXME: actually handle the error.
        this.setState({
          isSubmitting: false
        });
      });

    this.setState({ isSubmitting: true });
  };

  public render() {
    const presentation = new Presentation('', '', '', '');

    return (
      <FormikFormWrapper
        shouldRedirect={this.state.hasSucceeded}
        redirectLink="/"
        initialValues={presentation}
        validationSchema={presentation.validationSchema}
        onSubmit={this.onSubmit}
        submitText="Create new account"
      >
        <CardWrapper header="Sign up">
          <FormikInput name="username" label="Username" type="text" />
          <FormikInput name="email" label="Email address" type="email" />
          <FormikInput name="password" label="Password" type="password" />
          <FormikInput
            name="passwordConfirm"
            label="Confirm your password"
            type="password"
          />
        </CardWrapper>
      </FormikFormWrapper>
    );
  }
}
