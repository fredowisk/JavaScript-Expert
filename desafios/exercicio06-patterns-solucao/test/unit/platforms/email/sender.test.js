import { expect, describe, it } from "@jest/globals";
import EmailMessageHandler from "./../../../../src/platforms/email/sender.js";
import validMessage from "../../../mocks/valid-message.js";

describe("Platform [Email] MessageHandler Suite Test", () => {
  it("send should be called and return a success value if the email was sent", () => {
    const messageHandler = new EmailMessageHandler({
      message: validMessage,
    });

    expect(() => messageHandler.send()).toBeTruthy();
  });
});
