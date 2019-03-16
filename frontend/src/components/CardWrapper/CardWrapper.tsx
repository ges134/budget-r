import React, { ReactNode } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';

export interface ICardWrapperProps {
  header: string,
  children: ReactNode,
}

const CardWrapper = (props: ICardWrapperProps) => (
  <Card>
    <CardHeader>{props.header}</CardHeader>
    <CardBody>{props.children}</CardBody>
  </Card>
);

export default CardWrapper;