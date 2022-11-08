import { expect, describe, it } from "@jest/globals";
import WhatsappMessageHandler from "./../../../../src/platforms/whatsapp/sender.js";
import validMessage from "../../../mocks/valid-message.js";

describe("Platform [Whatsapp] MessageHandler Suite Test", () => {
  it("send should be called and return a success value if the whatsapp was sent", () => {
    const messageHandler = new WhatsappMessageHandler({
      message: validMessage,
    });

    expect(() => messageHandler.send()).toBeTruthy();
  });
});
