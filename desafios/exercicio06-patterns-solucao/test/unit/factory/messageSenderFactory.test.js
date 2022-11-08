import { expect, describe, it } from "@jest/globals";
import MessageSenderFactory from "../../../src/factory/messageSenderFactory.js";
import EmailCreditHandler from "../../../src/platforms/email/credit.js";
import EmailMessageHandler from "../../../src/platforms/email/sender.js";

import validMessage from "../../mocks/valid-message.js";

const params = { user: { id: 1 }, message: validMessage };

describe("MessageSenderFactory Suite Test", () => {
  it("should instantiate the MessageSenderFacade dependencies properly", async () => {
    const facade = await MessageSenderFactory.createInstance({
      ...params,
      platform: "email",
    });

    expect(facade.creditHandler).toBeInstanceOf(EmailCreditHandler);
    expect(facade.messageHandler).toBeInstanceOf(EmailMessageHandler);
  });
});
