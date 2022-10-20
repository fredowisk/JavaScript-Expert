export default class User {
  constructor({ id }) {
    this.id = id;
  }

  // Não chega a ser usado na aplicação

  get [Symbol.toStringTag]() {
    return "USER";
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== "string") throw new TypeError();

    return `[id=${this.id}]`;
  }
}
