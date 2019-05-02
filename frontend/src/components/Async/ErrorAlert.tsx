import React from 'react';
import { Alert } from 'reactstrap';

interface IProps {
  message: string;
}

export const ErrorAlert = (props: IProps) => (
  <Alert color="danger">{props.message}</Alert>
);
