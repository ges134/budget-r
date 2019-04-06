import React from 'react';
import { FormGroup, Label, FormText } from 'reactstrap';
import { Field } from 'formik';
import { InputControl } from './InputControl';

interface IProps {
  name: string;
  label: string;
  type: string;
  helper?: string;
}

export const FormikInput = (props: IProps) => (
  <FormGroup>
    <Label for={props.name}>{props.label}</Label>
    <Field name={props.name} type={props.type} component={InputControl} />
    {props.helper && <FormText>{props.helper}</FormText>}
  </FormGroup>
);
