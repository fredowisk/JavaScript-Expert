export default class NotImplementedException extends Error {
  constructor0(message) {
    super(`the "${message}" function was not implemented`);
    this.name = "NotImplementedException";
  }
}
