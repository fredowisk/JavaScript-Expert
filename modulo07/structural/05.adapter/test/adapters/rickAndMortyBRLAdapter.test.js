import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import RickAndMortyBRLAdapter from "../../src/business/adapters/rickAndMortyBRLAdapter.js";
import RickAndMortyBRL from "../../src/business/integration/rickAndMortyBRL.js";

describe("#RickAndMortyBRLAdapter Test Suite", () => {
  beforeEach(() => jest.clearAllMocks());

  test("#getCharacters should be an adapter for RickAndMortyBRL.getCharactersFromJSON", async () => {
    const adapterSpy = jest
      .spyOn(RickAndMortyBRL, "getCharactersFromJSON")
      .mockResolvedValue([]);

    const result = await RickAndMortyBRLAdapter.getCharacters();

    expect(adapterSpy).toHaveBeenCalled();
    expect(result).toStrictEqual([]);
  });
});
