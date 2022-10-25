import { describe, test } from "@jest/globals";
import User from "../../../src/entity/user.js";
import Users from "../../../src/entity/users.js";

describe("#Users Test Suite", () => {
  test("should set a new user when call add", () => {
    const users = new Users();
    const userRaw = { id: 1 };
    users.add(userRaw);

    const kUsers = Object.getOwnPropertySymbols(users)[0];
    expect(users[kUsers].size).toStrictEqual(1);
    expect(users[kUsers].get(userRaw.id)).toBeInstanceOf(User);
  });

  test("should return the number of users when call hasUsers", () => {
    const users = new Users();
    const userRaw = { id: 1 };
    users.add(userRaw);

    expect(users.hasUsers()).toStrictEqual(1);
  });
  test("should delete a user when call remove", () => {
    const users = new Users();
    const userRaw = { id: 1 };
    users.add(userRaw);

    expect(users.hasUsers()).toStrictEqual(1);

    users.remove(userRaw.id);
    expect(users.hasUsers()).toStrictEqual(0);
  });

  test("should call the iterator and return a list of user ids", () => {
    const users = new Users();
    const userRaw = { id: 1 };
    users.add(userRaw);

    const result = [...users];

    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual(userRaw.id);
  });
});
