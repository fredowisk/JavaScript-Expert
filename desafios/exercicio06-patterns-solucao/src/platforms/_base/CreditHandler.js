export default class CreditHandler {
  constructor({ userRepository, user }) {
    this.userId = user;
    this.userRepository = userRepository;
  }

  verifyIfUserHasCredit() {
    throw new NotImplementedException(this.verifyIfUserHasCredit.name);
  }

  updateCredit() {
    throw new NotImplementedException(this.updateCredit.name);
  }

  addCredit() {
    throw new NotImplementedException(this.addCredit.name);
  }
}
