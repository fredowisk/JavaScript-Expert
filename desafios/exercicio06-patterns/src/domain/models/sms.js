export default class SMS {
  constructor({accountId, contactNumber, text}) {
    this.accountId = accountId;
    this.contactNumber = contactNumber;
    this.text = text;
    this.createdAt = new Date().toISOString()
  }
}