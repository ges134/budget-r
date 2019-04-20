import React, { Component } from 'react';
import { CardWrapper } from '../../components/CardWrapper';
import { FormikInput } from '../../components/Input';
import { Login as Presentation } from '../../lib/models';
import { FormikFormWrapper } from '../../components/Forms';
import Cookies from 'js-cookie';
import { cookieName } from '../../lib/constants';

export class LoginForm extends Component {
  public onLoginSuccess = (token: string) => {
    Cookies.set(cookieName, token);
  };

  public render() {
    const presentation = new Presentation('', '');

    return (
      <FormikFormWrapper
        redirectLink="/"
        initialValues={presentation}
        validationSchema={presentation.validationSchema}
        submitText="Login"
        submitUrl="/login"
        onSuccess={this.onLoginSuccess}
      >
        <CardWrapper header="Login">
          <FormikInput name="identifier" label="Username" type="text" />
          <FormikInput name="password" label="Password" type="password" />
        </CardWrapper>
      </FormikFormWrapper>
    );
  }
}
