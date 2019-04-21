import React from 'react';
import { CardWrapper } from '../../components/CardWrapper';
import { FormikInput } from '../../components/Input';
import { Signup as Presentation, verbs } from '../../lib';
import { FormikFormWrapper } from '../../components/Forms';

export const SignUpForm = () => {
  const presentation = new Presentation('', '', '', '');

  return (
    <FormikFormWrapper
      redirectLink="/login"
      initialValues={presentation}
      validationSchema={presentation.validationSchema}
      submitText="Create account"
      submitUrl="/signup"
      verb={verbs.put}
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
};
