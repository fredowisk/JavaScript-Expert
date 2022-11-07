export default class InvalidParamError extends Error {
  constructor(fieldName) {
    super(`Invalid Param: ${fieldName}`);
    this.name = "InvalidParamError";
  }
}
