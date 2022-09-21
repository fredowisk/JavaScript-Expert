"use strict";

const assert = require("assert");

// garantir semantica e segurança em objetos

// --- apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue;
  },
};

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130);

// um problema que pode acontecer (raro)
// Function.prototype.apply = () => { throw new TypeError('Eita!') }

// esse aqui pode acontecer!
myObj.add.apply = function () {
  throw new TypeError("Vixxx");
};

assert.throws(() => myObj.add.apply({}, []), {
  name: "TypeError",
  message: "Vixxx",
});

// usando reflect:
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200]);
assert.deepStrictEqual(result, 260);
// --- apply

// --- defineProperty

// questoes semânticas
function MyDate() {}

// feio pra Kct, Object tá modificando uma função, tudo é Object
// mas Object adicionando prop para uma function?
Object.defineProperty(MyDate, "withObject", { value: () => "Hey there" });

// Agora faz mais sentido
Reflect.defineProperty(MyDate, "withReflection", { value: () => "Hey dude" });

assert.deepStrictEqual(MyDate.withObject(), "Hey there");
assert.deepStrictEqual(MyDate.withReflection(), "Hey dude");
// --- defineProperty

// --- deleteProperty
const withDelete = { user: "Fredowisk" };
// imperformático, evitar ao máximo
delete withDelete.user;
assert.deepStrictEqual(withDelete.hasOwnProperty("user"), false);

// performático, respeitando o ciclo de vida do JavaScript
const withReflect = { user: "Xuxa da Silva" };
Reflect.deleteProperty(withReflect, "user");
assert.deepStrictEqual(withReflect.hasOwnProperty("user"), false);

// --- delete property

// --- get

// Deveriamos fazer um get somente em instâncias de referência
assert.deepStrictEqual((1)["userName"], undefined);

//com reflection, uma exceção é lançada!
assert.throws(() => Reflect.get(1, "userName"), TypeError);
// --- get

// --- has
assert.ok("superman" in { superman: "" });
assert.ok(Reflect.has({ batman: "" }, "batman"));
// --- has

// --- ownKeys
const user = Symbol("user");
const myObj2 = {
  id: 1,
  [Symbol.for("password")]: 123,
  [user]: "fredowisk",
};

// Com os métodos de object, temos que fazer 2 requisições
const objectKeys = [
  ...Object.getOwnPropertyNames(myObj2),
  ...Object.getOwnPropertySymbols(myObj2),
];
assert.deepStrictEqual(objectKeys, ["id", Symbol.for("password"), user]);

// Com reflection, só um método
assert.deepStrictEqual(Reflect.ownKeys(myObj2), [
  "id",
  Symbol.for("password"),
  user,
]);
