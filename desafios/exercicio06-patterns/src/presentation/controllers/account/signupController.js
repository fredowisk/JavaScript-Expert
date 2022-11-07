import {
  accountCreated,
  failedToRegister,
} from "../../../util/responseHelper.js";

export default class SignupController {
  constructor(addAccount, validation) {
    this.addAccount = addAccount;
    this.validation = validation;
  }
  async handle(accountData) {
    try {
      const error = this.validation.validate(accountData);

      if (error) {
        return error.message;
      }

      const isCreated = await this.addAccount.save(accountData);

      if (!isCreated) {
        return failedToRegister;
      }

      return accountCreated;
    } catch (error) {
      console.error("Internal App Error");
    }
  }
}
