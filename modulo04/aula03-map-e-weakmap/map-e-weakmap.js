const assert = require("assert");

const myMap = new Map();

//podem ter qualquer coisa como chave
myMap
  .set(1, "one")
  .set("Fred", { text: "two" })
  .set(true, () => "hello");

//usando um constructor
const myMapWithConstructor = new Map([
  ["1", "str1"],
  [1, "num1"],
  [true, "bool1"],
]);

// console.log("myMap", myMap);
// console.log("myMap.get(1)", myMap.get(1));

assert.deepStrictEqual(myMap.get(1), "one");
assert.deepStrictEqual(myMap.get("Fred"), { text: "two" });
assert.deepStrictEqual(myMap.get(true)(), "hello");

// Em Objects a chave só pode ser string ou symbol (number é coergido a string)
const obj = { id: 1 };
//Só funciona por referência de memória e não por objetos iguais
myMap.set(obj, { name: "Fredowisk" });

// console.log("get undefined", myMap.get({ id: 1 }));
// console.log("get", myMap.get(obj));

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(obj), { name: "Fredowisk" });

// utilitários

// - No Object seria Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 4);

// para verificar se um item existe no objeto
// item.key = se não existe = undefined
// if() = coerção implicita para boolean e retorna false
// O jeito certo em Object é ({ name: 'Fred}).hasOwnProperty('name');
assert.ok(myMap.has(obj));

// para remover um item do objeto
// delete item.id
// imperformático para o JavaScript
assert.ok(myMap.delete(obj));

// Não dá pra iterar em Objects diretamente
// tem que transformar com o Object.entries(item)
const expected = '[[1,"one"],["Fred",{"text":"two"}],[true,null]]';
assert.deepStrictEqual(JSON.stringify([...myMap]), expected);

// for (const [key, value] of myMap) {
//   console.log({ key, value });
// }

// Object é inseguro, pois dependendo do nome da chave,
// o usuário pode substituir algum comportamento padrão
// ({ }).toString() => '[object Object]'
// ({ toString: () => 'Hey' }).toString() === 'Hey'

// Qualquer chave pode colidir, com as propriedades herdadas do objeto,
// como constructor, toString, valueOf e etc.

const actor = {
  name: "Xuxa da Silva",
  toString: "Queen: Xuxa da Silva",
};

// Não tem restrição de nome de chave
myMap.set(actor);

assert.ok(myMap.has(actor));
assert.throws(() => myMap.get(actor).toString, TypeError);

// Não da pra limpar um Object sem reassina-lo
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

// ---- WeakMaps

// Pode ser coletado após perder as referências
// usado em casos beem específicos

// Tem a maioria dos benefícios do Map
// MAS: não é interável
// Só chaves de referência e que você já conheça
// mais leve e preve leak de memória, pq depois que as instâncias saem da memória
// tudo é limpo pelo garbage colector

const weakMap = new WeakMap();
const hero = { name: "Flash" };

// weakMap.set(hero);
// weakMap.get(hero);
// weakMap.delete(hero);
// weakMap.has(hero);
