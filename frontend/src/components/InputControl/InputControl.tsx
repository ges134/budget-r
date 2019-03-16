import React, { Component, FormEvent } from 'react';
import { FormGroup, Label, Input, Col, FormText } from 'reactstrap';
import InputFeedback, { IFormFeedbackProps } from '../InputFeedback/InputFeedback';
import { FormHelper } from '../../lib/Form/FormHelper';

/**
 * More restrictive list that says what kind of input is supported by this input control.
 * If all types are supported, this input type will be deprecated and deleted
 */
type InputType = 'email' | 'password' | 'text';

interface IInputControlProps {
  labelText: string,
  name: string,
  inputType: InputType,
  placeholder: string,
  feedback: IFormFeedbackProps,
  helperText?: string,
  onChange: (value: string, name: string) => void,
  value: string,
};

export default class InputControl extends Component<IInputControlProps, any> {
  constructor(props: IInputControlProps) {
    super(props);
  }

  onChange = (e: FormEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;

    this.props.onChange(value, name);
  }

  public render() {
    const { feedback } = this.props;
    const { valid, invalid } = FormHelper.reactstrapValidity(feedback);

    return(
      <FormGroup row={true}>
        <Label for={this.props.name} md={2}>
          {this.props.labelText}
        </Label>
        <Col md={10}>
          <Input
            name={this.props.name}
            type={this.props.inputType}
            placeholder={this.props.placeholder}
            onChange={this.onChange}
            value={this.props.value}
            valid={valid}
            invalid={invalid}
          />
          <InputFeedback {...feedback} />
          {this.props.helperText && (
            <FormText>{this.props.helperText}</FormText>
          )}
        </Col>
      </FormGroup>
    );
  }
}