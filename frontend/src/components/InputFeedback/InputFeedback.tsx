import React, { Fragment } from 'react';
import { FormFeedback } from 'reactstrap';
import { Valid, FormHelper } from '../../lib/Form/FormHelper';

/**
 * A message should always be passed if a Valid.valid or Valid.invalid option is passed as a property.
 * On other cases, the message could be empty since nothing will be rendered.
 */
export interface IFormFeedbackProps {
  valid: Valid,
  message: string,
}

/**
 * Creates an input feedback based on validity if required. @see {@link Valid}
 * When a Valid.invariant option is passed as a property, nothing is rendered
 * since we're still waiting for validation.
 * @param props 
 */
const InputFeedback = (props: IFormFeedbackProps) => {
  const { valid, invalid } = FormHelper.reactstrapValidity(props);

  if(props.valid === Valid.invariant) {
    return (<Fragment />)
  } else {
    return (
      <FormFeedback
        valid={valid}
        invalid={invalid}
      >
        {props.message}
      </FormFeedback>
    );
  }
}

export default InputFeedback;
