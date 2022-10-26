import { describe, test, expect } from "@jest/globals";
import evaluateRegex from "../src/util.js";

describe("#Util Test Suite", () => {
  test("should throw an error when call evaluateRegex with an unsafe regex", () => {
    const invalidRegex = /(a+){10}/;

    expect(() => evaluateRegex(invalidRegex)).toThrow();
  });

  test("should not throw an error when call evaluateRegex with an safe regex", () => {
    const validRegex = /(beep|boop)*/;

    expect(() => evaluateRegex(validRegex)).not.toThrow();
  });
});
