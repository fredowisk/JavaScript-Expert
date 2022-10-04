import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import axios from "axios";
import fs from "fs/promises";

import RickAndMortyBRL from "../../src/business/integration/rickAndMortyBRL.js";
import Character from "../../src/entities/character.js";

describe("#RickAndMortyBRL Test Suite", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("#getCharactersFromJSON should return a list of Character Entity", async () => {
    const response = JSON.parse(
      await fs.readFile("./test/mocks/characters.json")
    );

    jest.spyOn(axios, "get").mockResolvedValue({ data: response });

    const expected = response.results.map((char) => new Character(char));
    const result = await RickAndMortyBRL.getCharactersFromJSON();
    expect(result).toStrictEqual(expected);
  });

  test("#getCharactersFromJSON should return an empty list if the API returns nothing", async () => {
    const response = JSON.parse(
      await fs.readFile("./test/mocks/characters-empty.json")
    );

    jest.spyOn(axios, "get").mockResolvedValue({ data: response });

    const result = await RickAndMortyBRL.getCharactersFromJSON();
    expect(result).toStrictEqual(response.results);
  });
});
