import MissingParamError from "../presentation/errors/missingParamError.js";

export default class RequiredFieldValidation {
  constructor(fieldName) {
    this.fieldName = fieldName;
  }

  validate(inputData) {
    if (!inputData[this.fieldName]) return new MissingParamError(this.fieldName)
  }
}
