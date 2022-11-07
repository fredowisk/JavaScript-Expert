export default class Account {
  constructor({name, email, cellphone, creditPlan, credits}) {
    this.name = name;
    this.email = email;
    this.cellphone = cellphone;
    this.creditPlan = creditPlan;
    this.credits = credits;
    this.createdAt = new Date().toISOString()
  }
}