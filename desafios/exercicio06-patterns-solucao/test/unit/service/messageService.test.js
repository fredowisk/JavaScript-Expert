import { jest, expect, describe, it } from "@jest/globals";

import MessageService from "../../../src/service/messageService.js";
import MessageMotherObject from "../model/MessageMotherObject.js";

const messageSender = {
  sendMessage: jest.fn(),
};

const messageFactory = {
  createInstance: jest.fn(),
};

const messageService = new MessageService({ messageFactory });

describe("MessageService Suite Test", () => {
  it("sendMessage method should instantiate a messageFactory and call factory.sendMessage", async () => {
    messageFactory.createInstance.mockReturnValue(messageSender);

    await messageService.sendMessage({
      platform: "email",
      message: MessageMotherObject.valid(),
      user: "1",
    });

    expect(messageFactory.createInstance).toBeCalled();
    expect(messageSender.sendMessage).toBeCalled();
  });
});
