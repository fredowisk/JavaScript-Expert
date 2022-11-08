import MessageDataBuilder from "./MessageDataBuilder.js";

export default class MessageMotherObject {
  static valid() {
    return MessageDataBuilder.aMessage()
      .withValidFrom()
      .withValidTo()
      .withValidSubject()
      .withValidText()
      .build();
  }

  static withValidFrom() {
    return MessageDataBuilder.aMessage().withValidFrom.build();
  }

  static withValidTo() {
    return MessageDataBuilder.aMessage().withValidTo();
  }

  static withValidSubject() {
    return MessageDataBuilder.aMessage().withValidSubject();
  }

  static withValidText() {
    return MessageDataBuilder.aMessage().withValidText();
  }
}
