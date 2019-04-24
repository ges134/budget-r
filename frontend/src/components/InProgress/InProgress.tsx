import React from 'react';
import { Alert } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

export const InProgress = () => (
  <Alert color="info">
    <FontAwesomeIcon icon={faInfoCircle} />
    &nbsp;This page is still under active developpement. You might see things
    moving around!
  </Alert>
);
