import React from 'react';
import { CardWrapper } from '../../components/CardWrapper';
import { FormikInput } from '../../components/Input';
import { Login as Presentation } from '../../lib/models';
import { FormikFormWrapper } from '../../components/Forms';

export const LoginForm = () => {
  const presentation = new Presentation('', '');

  return (
    <FormikFormWrapper
      redirectLink="/"
      initialValues={presentation}
      validationSchema={presentation.validationSchema}
      submitText="Login"
      submitUrl="/login"
    >
      <CardWrapper header="Login">
        <FormikInput name="username" label="Username" type="text" />
        <FormikInput name="password" label="Password" type="password" />
      </CardWrapper>
    </FormikFormWrapper>
  );
};
