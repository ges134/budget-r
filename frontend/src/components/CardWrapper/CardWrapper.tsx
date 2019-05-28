import React, { ReactNode } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';

interface IProps {
  header: string;
  children: ReactNode;
  className?: string;
}

export const CardWrapper = (props: IProps) => (
  <Card className={`my-2 w-100 ${props.className}`}>
    <CardHeader>{props.header}</CardHeader>
    <CardBody>{props.children}</CardBody>
  </Card>
);
