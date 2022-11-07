import EmailValidator from '../infra/validators/emailValidator.js';
import InvalidParamError from '../presentation/errors/invalidParamError.js';

export default class EmailValidation {

  constructor(emailField = 'email') {
    this.emailField = emailField
  }

  validate(dataInput) {
    const isValid = EmailValidator.isValid(dataInput[this.emailField]);

    if(!isValid) return new InvalidParamError(this.emailField);
  }
}