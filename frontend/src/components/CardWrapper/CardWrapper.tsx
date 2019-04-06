import React, { ReactNode } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';

interface IProps {
  header: string;
  children: ReactNode;
}

export const CardWrapper = (props: IProps) => (
  <Card>
    <CardHeader>{props.header}</CardHeader>
    <CardBody>{props.children}</CardBody>
  </Card>
);
