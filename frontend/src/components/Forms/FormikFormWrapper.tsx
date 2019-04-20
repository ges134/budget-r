import { Redirect } from 'react-router';
import { Formik, FormikActions, Form } from 'formik';
import { ObjectSchema } from 'yup';
import { Button, Row, Col } from 'reactstrap';
import React, { ReactNode, Component, Fragment } from 'react';
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
  onSuccess?: (res: any) => void;
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
      .then(res => {
        actions.setSubmitting(false);

        if (this.props.onSuccess) {
          this.props.onSuccess(res.data);
        }

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

  public bottomRow = () => {
    const button = (
      <Button color="primary" disabled={this.state.isSubmitting} type="submit">
        {this.props.submitText}
      </Button>
    );

    const rowNoErrors = (
      <Col md={{ size: 3, offset: 9 }} className="text-right">
        {button}
      </Col>
    );
    const rowErrors = (
      <>
        <Col md={9}>
          <GlobalErrors errors={this.state.errors} />
        </Col>
        <Col md={3} className="text-right">
          {button}
        </Col>
      </>
    );

    const hasErrors: boolean = this.state.errors.length !== 0;

    return <Row>{hasErrors ? rowErrors : rowNoErrors}</Row>;
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
          {this.bottomRow()}
        </Form>
      </Formik>
    );
  }
}
