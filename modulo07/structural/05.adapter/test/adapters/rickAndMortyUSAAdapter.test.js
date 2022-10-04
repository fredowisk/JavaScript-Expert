import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import RickAndMortyUSAAdapter from "../../src/business/adapters/rickAndMortyUSAAdapter.js";
import RickAndMortyUSA from "../../src/business/integration/rickAndMortyUSA.js";

describe("#RickAndMortyUSAAdapter Test Suite", () => {
  beforeEach(() => jest.clearAllMocks());

  test("#getCharacters should be an adapter for RickAndMortyUSA.getCharactersFromJSON", async () => {
    const adapterSpy = jest
      .spyOn(RickAndMortyUSA, "getCharactersFromXML")
      .mockResolvedValue([]);

    const result = await RickAndMortyUSAAdapter.getCharacters();
    expect(adapterSpy).toHaveBeenCalled();
    expect(result).toStrictEqual([]);
  });
});
