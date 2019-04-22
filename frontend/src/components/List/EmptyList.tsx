import React from 'react';
import { Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IProps {
  emptyMessage: string;
  createLink: string;
  icon: IconProp;
}

export const EmptyList = (props: IProps) => (
  <Alert color="primary">
    <div className="text-centered">
      <FontAwesomeIcon size="7x" icon={props.icon} />
    </div>
    <p>{props.emptyMessage}</p>
    <Link to={props.createLink}>Create your first one now!</Link>
  </Alert>
);
