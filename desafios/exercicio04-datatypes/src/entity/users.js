import User from "./user.js";

const kUsers = Symbol("kUsers");

export default class Users {
  constructor() {
    this[kUsers] = new Map();
  }

  add(userRaw) {
    const user = new User(userRaw);
    this[kUsers].set(user.id, user);
  }

  hasUsers() {
    return this[kUsers].size;
  }

  remove(id) {
    this[kUsers].delete(id);
  }

  *[Symbol.iterator]() {
    for (const [key] of this[kUsers]) {
      yield key;
    }
  }
}
