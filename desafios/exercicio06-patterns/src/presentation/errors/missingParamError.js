export default class MissingParamError extends Error {
  constructor(fieldName) {
    super(`Missing Param: ${fieldName}`);
    this.name = "MissingParamError";
  }
}
