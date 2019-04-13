import { Redirect } from 'react-router';
import { Formik, FormikActions, Form } from 'formik';
import { ObjectSchema } from 'yup';
import { Button, Row, Col } from 'reactstrap';
import React, { ReactNode, Component, FormEvent } from 'react';
import { GlobalErrors } from './GlobalErrors';

interface IProps {
  shouldRedirect: boolean;
  redirectLink?: string;
  initialValues: any;
  validationSchema: ObjectSchema<any>;
  onSubmit: (values: any, actions: FormikActions<any>) => void;
  submitText: string;
  children: ReactNode;
  errors?: string[];
  isSubmitting: boolean;
}

export class FormikFormWrapper extends Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    return this.props.redirectLink && this.props.shouldRedirect ? (
      <Redirect to={this.props.redirectLink} push />
    ) : (
      <Formik
        initialValues={this.props.initialValues}
        validationSchema={this.props.validationSchema}
        onSubmit={this.props.onSubmit}
      >
        <Form>
          {this.props.children}
          <Row>
            <Col md={9}>
              <GlobalErrors errors={this.props.errors} />
            </Col>
            <Col md={3}>
              <Button
                color="primary"
                disabled={this.props.isSubmitting}
                type="submit"
              >
                {this.props.submitText}
              </Button>
            </Col>
          </Row>
        </Form>
      </Formik>
    );
  }
}
