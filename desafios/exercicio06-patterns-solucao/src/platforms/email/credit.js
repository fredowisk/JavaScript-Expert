import CreditHandler from "../_base/CreditHandler.js";

export default class EmailCreditHandler extends CreditHandler {
  verifyIfUserHasCredit() {
    return this.userRepository.find(this.userId, "email") > 0;
  }

  updateCredit() {
    this.userRepository.remove(this.userId, "email");
  }

  addCredit(amount) {
    this.userRepository.add(this.userId, "email", amount);
  }
}
