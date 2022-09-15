//==================

9999999999999999; //16 9 viram 10

true + 2; //3

"21" + true; //'21true'

"21" - true; //20

"21" - -1; //22

0.1 + 0.2; //0.3000004

3 > 2 > 1; //false

3 > 2 >= 1; //true

//===================

console.assert(String(123) === "123", "explicit conversion to string");
console.assert(123 + "" === "123", "implicit conversion to string");

console.assert(
  ("hello" || 123) === "hello",
  "|| always returns the first element when both are true"
);
console.assert(
  ("hello" && 123) === 123,
  "&& always returns the last element when both are true"
);

//====================

const item = {
  name: "Fred",
  age: 23,
  //string: 1° se não for primitivo, chama o valueOf
  toString() {
    return `Name: ${this.name}, Age: ${this.age}`;
  },
  //number: 1° se não for primitivo, chama o toString
  valueOf() {
    return { hey: "dude" };
    // return 007;
  },
  //ele tem prioridade na parada!
  [Symbol.toPrimitive](coercionType) {
    console.log("trying to convert to", coercionType);
    const types = {
      string: JSON.stringify(this),
      number: "0007",
    };

    return types[coercionType] || types.string;
  },
};

// console.log("toString", String(item));
// //Vai retornar NaN pois o toString retornou a string
// console.log("valueOf", Number(item));

//depois de adicionar o toPrimitive
// console.log("String", String(item));
// console.log("Number", Number(item));
// //chama a conversão default
// console.log("Date", new Date(item));

console.assert(item + 0 === '{"name":"Fred","age":23}0');
// console.log('!!item is true?', !!item)
console.assert(!!item);

// console.log("string.concat", "Ae".concat(item));
console.assert("Ae".concat(item) === 'Ae{"name":"Fred","age":23}');

// console.log('implicit + explicit coercion (using ==)', item == String(item))
console.assert(item == String(item));

const item2 = { ...item, name: "Zézin", age: 20 };

console.assert(item2.name === "Zézin" && item2.age === 20);
