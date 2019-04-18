import { Redirect } from 'react-router';
import { Formik, FormikActions, Form } from 'formik';
import { ObjectSchema } from 'yup';
import { Button, Row, Col } from 'reactstrap';
import React, { ReactNode, Component } from 'react';
import { GlobalErrors } from './GlobalErrors';
import { AxiosWrapper, verbs } from '../../lib/axios/AxiosWrapper';
import { IAsyncForm } from '../../lib/Form';

interface IProps {
  redirectLink?: string;
  initialValues: any;
  validationSchema: ObjectSchema<any>;
  submitText: string;
  children: ReactNode;
  errors?: string[];
  submitUrl: string;
  verb?: verbs;
}

export class FormikFormWrapper extends Component<IProps, IAsyncForm> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isSubmitting: false,
      hasSucceeded: false,
      errors: []
    };
  }

  public onSubmit = (values: any, actions: FormikActions<any>) => {
    const verb = this.props.verb || verbs.post;

    AxiosWrapper.getInstance()
      .request(verb, this.props.submitUrl, values)
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
    return this.props.redirectLink && this.state.hasSucceeded ? (
      <Redirect to={this.props.redirectLink} push />
    ) : (
      <Formik
        initialValues={this.props.initialValues}
        validationSchema={this.props.validationSchema}
        onSubmit={this.onSubmit}
      >
        <Form>
          {this.props.children}
          <Row>
            <Col md={9}>
              <GlobalErrors errors={this.state.errors} />
            </Col>
            <Col md={3}>
              <Button
                color="primary"
                disabled={this.state.isSubmitting}
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
