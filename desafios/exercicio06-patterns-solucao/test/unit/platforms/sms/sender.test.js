import { expect, describe, it } from "@jest/globals";
import SMSMessageHandler from "./../../../../src/platforms/sms/sender.js";
import validMessage from "../../../mocks/valid-message.js";

describe("Platform [SMS] MessageHandler Suite Test", () => {
  it("send should be called and return a success value if the sms was sent", () => {
    const messageHandler = new SMSMessageHandler({
      message: validMessage,
    });

    expect(() => messageHandler.send()).toBeTruthy();
  });
});
