import { expect, describe, it } from "@jest/globals";
import UserCreditRepository from "../../../src/repository/userCreditRepository.js";

const db = {
  1: {
    email: 5,
    sms: 2,
    whatsapp: 10,
  },
};

const repository = new UserCreditRepository({ db });

describe("UserCreditRepository Suite Test", () => {
  it("find should return the current credit for the specified platform", () => {
    expect(repository.find(1, "email")).toBe(5);
  });

  it("add should add credits for the user on the specified platform", () => {
    expect(repository.add(1, "sms", 10)).toBe(12);
  });

  it("remove should remove credits from the user on the specified platform", () => {
    expect(repository.remove(1, "whatsapp")).toBe(9);
  });
});
