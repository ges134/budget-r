import React from 'react';

interface IProps {
  errors?: string[];
}

export const GlobalErrors = (props: IProps) => (
  <>
    {props.errors && props.errors.length && (
      <>
        <p>API returned these errors : </p>
        <ul>
          {props.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </>
    )}
  </>
);
