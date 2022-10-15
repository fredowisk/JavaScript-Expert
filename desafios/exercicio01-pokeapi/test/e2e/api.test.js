import { describe, test, jest, expect, beforeEach } from "@jest/globals";
import request from "supertest";

import app from "../../src/api.js";
import TeamRepository from "../../src/repository/teamRepository.js";
import pokemonMock from "../mocks/valid-pokemon.json";

describe("#Api Service Test Suite", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    app.close();
  });

  describe("/team", () => {
    test("should return a pokemon team and HTTP status 200", async () => {
      const expected = [
        {
          "pokemonName": "bulbasaur",
          "moves": ["razor-wind", "swords-dance", "cut"],
        },
        {
          "pokemonName": "bulbasaur",
          "moves": ["razor-wind", "swords-dance", "cut"],
        },
        {
          "pokemonName": "bulbasaur",
          "moves": ["razor-wind", "swords-dance", "cut"],
        },
      ];

      jest
        .spyOn(TeamRepository.prototype, "makeRequest")
        .mockResolvedValue(pokemonMock);

      const response = await request(app).get("/team").expect(200);

      expect(JSON.parse(response.text)).toStrictEqual(expected);
    });
  });

  describe("/", () => {
    test("should redirect to route / when user try to access a inexistent route", async () => {
      const response = await request(app).get("/").expect(204);

      expect(response.text).toStrictEqual("");
    });
  });
});
