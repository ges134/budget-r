import React, { Component, MouseEventHandler } from 'react';
import CardWrapper from '../../CardWrapper/CardWrapper';
import { Form, Button } from 'reactstrap';
import InputControl from '../../InputControl/InputControl';
import { Signup as Presentation } from '../../../../../models';
import {
  IInputInformation,
  Valid,
  FormHelper
} from '../../../lib/Form/FormHelper';
import _cloneDeep from 'lodash/cloneDeep';
import Formik from 'formik';

interface ISignUpFormState {
  username: IInputInformation;
  email: IInputInformation;
  password: IInputInformation;
  passwordConfirm: IInputInformation;
  [key: string]: IInputInformation;
}

export default class SignUpForm extends Component<any, ISignUpFormState> {
  constructor(props: any) {
    super(props);

    const valid = Valid.invariant;
    const value = '';
    const validationMessage = '';

    const emptyInputInformation = {
      valid,
      value,
      validationMessage
    };

    this.state = {
      username: _cloneDeep(emptyInputInformation),
      email: _cloneDeep(emptyInputInformation),
      password: _cloneDeep(emptyInputInformation),
      passwordConfirm: _cloneDeep(emptyInputInformation)
    };
  }

  onChange = (value: string, name: string) => {
    const input = this.state[name];
    input.value = value;
    this.setState({
      [name]: input
    });
  };

  onPasswordConfirmChange = (value: string, name: string) => {
    const passwordMatches = this.state.password.value === value;
    const input = {
      valid: passwordMatches ? Valid.valid : Valid.invalid,
      value,
      validationMessage: passwordMatches ? '' : 'Passwords does not match'
    };

    this.setState({
      [name]: input
    });
  };

  onSubmit = () => {
    axios.post('');
  };

  public render() {
    const usernameFeedback = FormHelper.feedbackFromInputInformation(
      this.state.username
    );
    const emailFeedback = FormHelper.feedbackFromInputInformation(
      this.state.email
    );
    const passwordFeedback = FormHelper.feedbackFromInputInformation(
      this.state.password
    );
    const passwordConfirmFeedback = FormHelper.feedbackFromInputInformation(
      this.state.passwordConfirm
    );

    const presentation = new Presentation('', '', '', '');

    return (
      <Formik
        initialValues={presentation}
        validationSchema={presentation.validationSchema}
        onSubmit={this.onSubmit}
      >
        <Form>
          <CardWrapper header="Sign up">
            <InputControl
              name="username"
              labelText="Username"
              inputType="text"
              placeholder="Username"
              onChange={this.onChange}
              feedback={usernameFeedback}
              value={this.state.username.value}
            />
            <InputControl
              name="email"
              labelText="Email"
              inputType="email"
              placeholder="Email"
              onChange={this.onChange}
              feedback={emailFeedback}
              value={this.state.email.value}
            />
            <InputControl
              name="password"
              labelText="Password"
              inputType="password"
              placeholder="Password"
              onChange={this.onChange}
              feedback={passwordFeedback}
              value={this.state.password.value}
            />
            <InputControl
              name="passwordConfirm"
              labelText="Password confirmation"
              inputType="password"
              placeholder="Confirm your password"
              onChange={this.onPasswordConfirmChange}
              feedback={passwordConfirmFeedback}
              value={this.state.passwordConfirm.value}
            />
            <Button color="primary" onClick={this.onSubmit}>
              Submit
            </Button>
          </CardWrapper>
        </Form>
      </Formik>
    );
  }
}
