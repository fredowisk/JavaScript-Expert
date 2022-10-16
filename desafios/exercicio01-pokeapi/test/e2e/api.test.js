import { describe, test, jest, expect, beforeEach } from "@jest/globals";
import request from "supertest";

import app from "../../src/api.js";

describe("#Api Service Test Suite", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    app.close();
  });

  describe("/team", () => {
    test("should return HTTP status 200 when /team is called", async () => {
      const response = await request(app).get("/team").expect(200);

      expect(response.statusCode).toStrictEqual(200);
    });

    test("should return exactly 3 pokemons in the team", async () => {
      const response = await request(app).get("/team").expect(200);

      expect(response.body).toHaveLength(3);
    });

    test("should return 3 moves for each pokemon in the team", async () => {
      const response = await request(app).get("/team").expect(200);
      const team = response.body;

      team.forEach((pokemon) => {
        expect(pokemon.moves).toHaveLength(3);
      });
    });
  });

  describe("/", () => {
    test("should redirect to route / when user try to access a inexistent route", async () => {
      const response = await request(app).get("/inexistent-route").expect(204);

      expect(response.statusCode).toStrictEqual(204)
      expect(response.text).toStrictEqual("");
      expect(response.body).toStrictEqual({})
    });
  });
});
