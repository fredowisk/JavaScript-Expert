import { expect, describe, it } from "@jest/globals";

import CreditHandler from "./../../../../src/platforms/_base/CreditHandler.js";

describe("Platform [Base] CreditHandler Suite Test", () => {
  it("verifyIfUserHasCredit should throw a NonImplementedException if called", () => {
    const creditHandler = new CreditHandler({ userRepository: {}, user: {} });

    expect(() => creditHandler.verifyIfUserHasCredit()).toThrow();
  });

  it("updateCredit should throw a NonImplementedException if called", () => {
    const creditHandler = new CreditHandler({ userRepository: {}, user: {} });

    expect(() => creditHandler.updateCredit()).toThrow();
  });

  it("addCredit should throw a NonImplementedException if called", () => {
    const creditHandler = new CreditHandler({ userRepository: {}, user: {} });

    expect(() => creditHandler.addCredit(10)).toThrow();
  });
});
