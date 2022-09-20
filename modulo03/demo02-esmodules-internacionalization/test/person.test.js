import { expect } from "chai";
import { describe, it } from "mocha";

import Person from "./../src/person.js";

describe("Person", () => {
  it("should return a person instance from a string", () => {
    const person = Person.generateInstanceFromString(
      "1 Bike,Carro 20000 2020-01-01 2022-02-01"
    );

    const expected = {
      id: "1",
      vehicles: ["Bike", "Carro"],
      kmTraveled: "20000",
      from: "2020-01-01",
      to: "2022-02-01",
    };

    expect(person).to.be.deep.equal(expected);
  });

  it("should format values", () => {
    const DEFAULT_LANG = "pt-BR";
    const person = new Person({
      id: "1",
      vehicles: ["Bike", "Carro"],
      kmTraveled: "20000",
      from: "2020-01-01",
      to: "2022-02-01",
    });
    const result = person.formatted(DEFAULT_LANG);
    const expected = {
      id: 1,
      vehicles: "Bike e Carro",
      kmTraveled: "20.000 km",
      from: "01 de janeiro de 2020",
      to: "01 de fevereiro de 2022",
    };

    expect(result).to.be.deep.equal(expected);
  });
});
