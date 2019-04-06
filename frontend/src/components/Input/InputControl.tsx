import React, { Component } from 'react';
import { Input, FormFeedback } from 'reactstrap';

export const InputControl = (props: any) => (
  <div>
    <Input
      invalid={
        !!(
          props.form.touched[props.field.name] &&
          props.form.errors[props.field.name]
        )
      }
      {...props.field}
      {...props}
    >
      {props.children}
    </Input>
    {props.form.touched[props.field.name] &&
      props.form.errors[props.field.name] && (
        <FormFeedback>{props.form.errors[props.field.name]}</FormFeedback>
      )}
  </div>
);
