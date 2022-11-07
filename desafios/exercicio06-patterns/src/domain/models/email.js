export default class Email {
  constructor({accountId, to, subject, text}) {
    this.accountId = accountId;
    this.to = to;
    this.subject = subject;
    this.text = text;
    this.createdAt = new Date().toISOString()
  }
}
