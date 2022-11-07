export default class ValidationComposite {
  constructor(validations) {
    this.validations = validations;
  }

  validate(inputData) {
    for (const validation of this.validations) {
      const error = validation.validate(inputData);
      if (error) return error;
    }
  }
}
