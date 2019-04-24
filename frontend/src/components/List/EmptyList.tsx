import React from 'react';
import { Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import './EmptyList.scss';

export interface IProps {
  emptyMessage: string;
  createLink: string;
  icon: IconProp;
}

export const EmptyList = (props: IProps) => (
  <Alert color="primary">
    <div className="d-flex justify-content-center">
      <FontAwesomeIcon size="3x" icon={props.icon} />
    </div>
    <div className="d-flex justify-content-center mt-1">
      <p>{props.emptyMessage}</p>
    </div>
    <div className="d-flex justify-content-center link">
      <Link to={props.createLink}>Create your first one now!</Link>
    </div>
  </Alert>
);
