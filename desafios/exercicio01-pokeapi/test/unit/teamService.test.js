import { describe, test, jest, expect, beforeEach } from "@jest/globals";
import TeamService from "../../src/service/teamService";
import pokemonMock from "../mocks/valid-pokemon.json";

class TeamRepositoryStub {
  async getPokemon() {
    return Promise.resolve(pokemonMock);
  }
}

describe("#Team Service Test Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("should return a random id when call getRandomId", () => {
    const teamService = new TeamService(new TeamRepositoryStub());

    teamService.totalNumberOfPokemons = 3;

    const id = teamService.getRandomId();

    expect(id).toBeGreaterThan(0);
    expect(id).toBeLessThan(4);
  });

  test("should return 3 random pokemon's when call getRandomTeam", async () => {
    const teamService = new TeamService(new TeamRepositoryStub());
    const expected = ["bulbasaur", "bulbasaur", "bulbasaur"];

    teamService.totalNumberOfPokemons = expected.length;

    const result = await teamService.getRandomTeam();

    const isEqual = result.every(({ name }, index) => expected[index] === name);

    expect(result).toHaveLength(3);
    expect(isEqual).toBeTruthy();
  });

  test("should format pokemon moves to only 3 in the same array when call formatPokemonMoves", () => {
    const fakeMoves = pokemonMock.moves;

    const expected = ["razor-wind", "swords-dance", "cut"];

    const teamService = new TeamService(new TeamRepositoryStub());

    const moves = teamService.formatPokemonMoves(fakeMoves);

    expect(moves).toHaveLength(3);
    expect(moves).toStrictEqual(expected);
  });
});
