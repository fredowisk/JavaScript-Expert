import Account from "../../domain/models/account.js";
import CREDIT_PLANS from "../../util/creditPlans.js";

export default class AccountBuilder {
  setName(name) {
    this.name = name;

    return this;
  }

  setEmail(email) {
    this.email = email;

    return this;
  }

  setCellphone(cellphone) {
    this.cellphone = cellphone;

    return this;
  }

  setCreditPlan(plan) {
    this.creditPlan = CREDIT_PLANS[plan];

    if (!this.creditPlan) this.creditPlan = CREDIT_PLANS["free"];

    return this;
  }

  setCredits() {
    const creditsAmount = this.creditPlan.credits;

    this.credits = {
      emailCredits: creditsAmount,
      smsCredits: creditsAmount,
      whatsappCredits: creditsAmount,
    };

    return this;
  }

  build() {
    return new Account({
      name: this.name,
      email: this.email,
      cellphone: this.cellphone,
      creditPlan: this.creditPlan,
      credits: this.credits,
    });
  }
}
