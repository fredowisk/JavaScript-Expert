import Message from "../../../src/entity/Message.js";

export default class MessageDataBuilder {
  constructor() {
    this.message = {};
  }

  static aMessage() {
    return new MessageDataBuilder();
  }

  withValidFrom() {
    this.message.from = "Fred";
    return this;
  }

  withValidTo() {
    this.message.to = "Gabi";
    return this;
  }

  withValidSubject() {
    this.message.subject = "Important tests to be done";
    return this;
  }

  withValidText() {
    this.message.text = "Hello there! Testing out some texts";
    return this;
  }

  build() {
    return new Message({
      from: this.message.from,
      to: this.message.to,
      subject: this.message.subject,
      text: this.message.text,
    });
  }
}
