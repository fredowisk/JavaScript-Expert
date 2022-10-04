import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import BaseBusiness from "../src/business/base/baseBusiness.js";
import { NotImplementedException } from "../src/util/exceptions.js";

describe("#Base Business Test Suite", () => {

  beforeEach(() => {
    jest.restoreAllMocks();
  })

  test("should throw an error when child class doesn't implement _validateRequiredFields function", () => {
    class Concrete extends BaseBusiness {
      _create() {
        return false;
      }
    }

    const concrete = new Concrete();

    expect(() => concrete._validateRequiredFields({})).toThrow(
      NotImplementedException
    );
  });

  test("should throw an error when _validateRequiredFields returns false", () => {
    class Concrete extends BaseBusiness {
      _validateRequiredFields() {
        return false;
      }
    }

    const concrete = new Concrete();

    expect(() => concrete.create({})).toThrow(`invalid data!`);
  });

  test("should throw an error when child class doesn't implement _create function", () => {
    class Concrete extends BaseBusiness {
      _validateRequiredFields() {
        return true;
      }
    }

    const concrete = new Concrete();

    expect(() => concrete._create({})).toThrow(NotImplementedException);
  });

  test("should call _create and _validateRequiredFields on create", () => {
    class Concrete extends BaseBusiness {
      _validateRequiredFields() {
        return true;
      }

      _create() {
        return true;
      }
    }

    const concrete = new Concrete();

    const baseBusinessCreateSpy = jest.spyOn(
      BaseBusiness.prototype,
      BaseBusiness.prototype.create.name
    );
    const concreteCreateSpy = jest.spyOn(concrete, "_create");
    const concreteValidateRequiredFieldsSpy = jest.spyOn(
      concrete,
      "_validateRequiredFields"
    );

    const data = { userName: "fredowisk", id: Date.now() };

    const result = concrete.create(data);

    expect(result).toBeTruthy();
    expect(baseBusinessCreateSpy).toBeCalledWith(data);
    expect(concreteCreateSpy).toBeCalledWith(data);
    expect(concreteValidateRequiredFieldsSpy).toBeCalledWith(data);
  });
});
