import { jest, expect, describe, it, beforeEach } from "@jest/globals";
import MessageSenderFacade from "../../../src/platforms/MessageSenderFacade.js";
import { SHIPPING_STATUSES } from "../../../src/shared/constants.js";

let facade = {};

const messageHandler = {
  send: jest.fn(),
};

const creditHandler = {
  verifyIfUserHasCredit: jest.fn(),
  updateCredit: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
  facade = new MessageSenderFacade({ messageHandler, creditHandler });
});

describe("Platforms Message Sender Facade Suite Test", () => {
  it("sendMessage should return NOT_ENOUGH_CREDIT if verifyIfUserHasCredit returns false", () => {
    creditHandler.verifyIfUserHasCredit.mockReturnValue(false);

    expect(facade.sendMessage()).toBe(SHIPPING_STATUSES.NOT_ENOUGH_CREDIT);
  });

  it("sendMessage should return FAILED if messageHandler.send fails more than 3 times", () => {
    creditHandler.verifyIfUserHasCredit.mockReturnValue(true);

    messageHandler.send.mockReturnValue(false);

    expect(facade.sendMessage()).toBe(SHIPPING_STATUSES.FAILED);
  });

  it("sendMessage should return SENT if messageHandler.send returns true", () => {
    creditHandler.verifyIfUserHasCredit.mockReturnValue(true);
    messageHandler.send.mockReturnValue(true);

    expect(facade.sendMessage()).toBe(SHIPPING_STATUSES.SENT);
    expect(creditHandler.updateCredit).toBeCalled();
  });
});
