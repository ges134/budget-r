import React, { Component } from 'react';
import { CardWrapper } from '../../components/CardWrapper';
import { FormikInput } from '../../components/Input';
import { Signup as Presentation } from '../../lib/models';
import { FormikActions } from 'formik';
import { IAsyncForm } from '../../lib/Form/IAsyncForm';
import { FormikFormWrapper } from '../../components/Forms';
import { AxiosWrapper } from '../../lib/axios/AxiosWrapper';

export default class SignUpForm extends Component<any, IAsyncForm> {
  constructor(props: any) {
    super(props);

    this.state = {
      isSubmitting: false,
      hasSucceeded: false,
      errors: []
    };
  }

  public onSubmit = (values: any, actions: FormikActions<any>) => {
    AxiosWrapper.getInstance()
      .put('/signup', values)
      .then(() => {
        actions.setSubmitting(false);
        this.setState({
          isSubmitting: false,
          hasSucceeded: true
        });
      })
      .catch(err => {
        this.setState({
          isSubmitting: false,
          errors: err
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
        submitText="Create account"
        isSubmitting={this.state.isSubmitting}
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
