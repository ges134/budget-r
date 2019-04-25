import React from 'react';
import { Col, Row, Progress } from 'reactstrap';

interface IProps {
  value: number;
  /**
   * a descriptive text we want to show in order to tell users at what step they are.
   * @example
   * ["Budget information", "ledger creation", "ledger estimates"]
   */
  stepText: string;
}

export const ProgressBar = (props: IProps) => (
  <>
    <Row className="mt-2">
      <Col md={9} className="pt-1">
        <Progress value={props.value} />
      </Col>
      <Col md={3}>
        <p>{props.stepText}</p>
      </Col>
    </Row>
  </>
);
