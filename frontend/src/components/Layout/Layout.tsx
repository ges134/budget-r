import React, { Component, Fragment, ReactNode } from 'react';
import Topbar from '../Topbar/Topbar';
import Sidebar from '../Sidebar/Sidebar';
import { Container, Row, Col } from 'reactstrap';

interface ILayoutProps {
  children: ReactNode,
}

const Layout = (props: ILayoutProps) => (
  <Fragment>
    <Topbar />
    <Container className="m-0 p-0">
      <Row className="h-100">
        <Col md={2}>
          <Sidebar />
        </Col>
        <Col>
          {props.children}
        </Col>
      </Row>
    </Container>
  </Fragment>
);

export default Layout;
