import { Redirect } from 'react-router';
import { Formik } from 'formik';
import { ObjectSchema } from 'yup';
import { Form, Button } from 'reactstrap';
import React, { ReactNode } from 'react';

interface IProps {
  shouldRedirect: boolean;
  redirectLink?: string;
  initialValues: any;
  validationSchema: ObjectSchema<any>;
  onSubmit: () => void;
  submitText: string;
  children: ReactNode;
}

export const FormikFormWrapper = (props: IProps) => {
  return props.redirectLink && props.shouldRedirect ? (
    <Redirect to={props.redirectLink} push />
  ) : (
    <Formik
      initialValues={props.initialValues}
      validationSchema={props.validationSchema}
      onSubmit={props.onSubmit}
    >
      <Form>
        {props.children}
        <Button color="primary">{props.submitText}</Button>
      </Form>
    </Formik>
  );
};
