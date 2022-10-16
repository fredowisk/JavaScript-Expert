import { describe, test, jest, beforeEach, expect } from "@jest/globals";
import TeamRepository from "../../src/repository/teamRepository";
import pokemonMock from "../mocks/valid-pokemon.json";

describe("#Team Repository Test Suite", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("should use the pokeApi to get information about the chosen pokemon", async () => {
    const teamRepository = new TeamRepository();

    const requestSpy = jest.spyOn(teamRepository, "makeRequest").mockResolvedValue(pokemonMock);

    const pokemonName = "bulbasaur";

    const { pokemonName: name, moves } = await teamRepository.getPokemon(
      pokemonName
    );

    const [move1, move2, move3] = moves;

    expect(moves.length).toBeGreaterThan(0);
    expect(move1.move.name).toStrictEqual("razor-wind");
    expect(move2.move.name).toStrictEqual("swords-dance");
    expect(move3.move.name).toStrictEqual("cut");
    expect(name).toStrictEqual(pokemonName);
    expect(requestSpy).toHaveBeenCalledWith(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
  });
});
