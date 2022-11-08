import CreditHandler from "../_base/CreditHandler.js";

export default class SMSCreditHandler extends CreditHandler {
  verifyIfUserHasCredit() {
    return this.userRepository.find(this.userId, "sms") > 0;
  }

  updateCredit() {
    this.userRepository.remove(this.userId, "sms");
  }

  addCredit(amount) {
    this.userRepository.add(this.userId, "sms", amount);
  }
}
