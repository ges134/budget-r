import { IFormFeedbackProps } from "../../components/InputFeedback/InputFeedback";

/**
 * When validating the input, this enums allows to qualify the validity of the input 
 * in order to show the proper feedback in a form. A valid feedback will generate a valid class
 * while an invalid one will generate an invalid class. However, when accessing form for the first time
 * or when waiting for a validation, an invariant option will allow a "don't do anything behaviour".
 */
export enum Valid {
  valid,
  invalid,
  invariant
}

/**
 * Collects the basic information needed to be held elsewhere for a form input.
 * These should be stored in a state.
 */
export interface IInputInformation {
  value: string,
  valid: Valid,
  validationMessage: string,
}

/**
 * Displays the basic information in order to work with Reactstrap.
 * Reactstrap functions mainly with valid and invalid, which are represented
 * by this intefarce. When those properties are set to false, this means an
 * invariant condition.
 */
export interface IValidInput {
  valid: boolean,
  invalid: boolean,
}

export class FormHelper {
  public static feedbackFromInputInformation(input : IInputInformation) : IFormFeedbackProps {
    return {
      message: input.validationMessage,
      valid: input.valid,
    }
  }

  /**
   * Returns if the feedback is valid. Throws an exception if invariant is passed
   * @param feedback the feedback we want to validate.
   */
  public static isValid(feedback : IFormFeedbackProps) : boolean {
    if (feedback.valid === Valid.invariant) {
      throw new Error("Should only have valid or invalid");
    }
    return feedback.valid === Valid.valid;
  }

  /**
   * Binds the Form feedback to reactstrap's interface.
   * @param feedback The feedback we want to bind to.
   */
  public static reactstrapValidity(feedback : IFormFeedbackProps) : IValidInput {
    return {
      invalid: feedback.valid === Valid.invalid,
      valid: feedback.valid === Valid.valid,
    };
  }
}