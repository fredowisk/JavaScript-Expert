import { describe, test, jest, expect, beforeEach } from "@jest/globals";
import TeamService from "../../src/service/teamService";

describe("#Team Service Test Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("should return 3 random pokemon's", async () => {
    const teamService = new TeamService();
    const expected = ["bulbasaur", "ivysaur", "venusaur"];

    teamService.totalNumberOfPokemons = expected.length;

    const result = await teamService.getRandomPokemons();

    const isEqual = result.every(({ pokemonName }) =>
      expected.includes(pokemonName)
    );

    expect(result).toHaveLength(3);
    expect(isEqual).toBeTruthy();
  });

  test("should format pokemon moves to only 3 in the same array", () => {
    const fakeMoves = [
      {
        move: {
          name: "swords-dance",
        },
      },
      {
        move: {
          name: "cut",
        },
      },
      {
        move: {
          name: "bind",
        },
      },
      {
        move: {
          name: "vine-whip",
        },
      },
      {
        move: {
          name: "headbutt",
        },
      },
    ];

    const expected = ["swords-dance", "cut", "bind"];

    const teamService = new TeamService();

    const moves = teamService.formatPokemonMoves(fakeMoves);

    expect(moves).toHaveLength(3);
    expect(moves).toStrictEqual(expected);
  });
});
