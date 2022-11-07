import CellphoneValidator from '../infra/validators/cellphoneValidator.js';
import InvalidParamError from '../presentation/errors/invalidParamError.js';

export default class CellphoneValidation {
  constructor(phoneField = 'cellphone') {
    this.phoneField = phoneField;
  }

  validate(inputData) {
    const isValid = CellphoneValidator.isValid(inputData[this.phoneField]);

    if(!isValid) return new InvalidParamError(this.phoneField);
  }
}