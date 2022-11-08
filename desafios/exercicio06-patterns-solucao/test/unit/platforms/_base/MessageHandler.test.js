import { expect, describe, it } from "@jest/globals";

import MessageHandler from "./../../../../src/platforms/_base/MessageHandler.js";

describe("Platform [Base] MessageHandler Suite Test", () => {
  it("send should throw a NonImplementedException if called", () => {
    const messageHandler = new MessageHandler({ message: {} });

    expect(() => messageHandler.send()).toThrow();
  });
});
