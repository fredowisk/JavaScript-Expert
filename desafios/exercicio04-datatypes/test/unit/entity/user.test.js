import { describe, test, expect } from "@jest/globals";
import User from "../../../src/entity/user.js";

describe("#User Test Suite", () => {
  const fakeId = { id: 1 };
  const user = new User(fakeId);

  test("should call Symbol.toStringTag when pass user to toString method", () => {
    const expected = "[object USER]";
    const result = Object.prototype.toString.call(user);
    expect(result).toStrictEqual(expected);
  });

  test("should throw an Error when try to convert User to a non-string type", () => {
    expect(() => Number(user)).toThrow(TypeError);
    expect(() => BigInt(user)).toThrow(TypeError);
    expect(() => new Symbol(user)).toThrow(TypeError);
    expect(() => new Date(user)).toThrow(TypeError);
  });

  test("should convert user to a string successfully", () => {
    const expected = `[id=${fakeId.id}]`;
    const result = String(user);

    expect(result).toStrictEqual(expected);
  });
});
