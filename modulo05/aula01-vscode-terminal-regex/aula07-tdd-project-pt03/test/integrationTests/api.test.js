'use strict';
const { describe, it } = require("mocha");
const request = require("supertest");
const { expect } = require("chai");
const app = require("../../src/server/api");

describe("API Suite test", () => {
  describe("/car", () => {
    it("should request the car page and return HTTP 200", async () => {
      await request(app).get("/car").expect(200);
    });
  });
  describe("/calculate", () => {
    it("should request the calculate page and return HTTP 200", async () => {
      await request(app).get("/calculate").expect(200);
    })
  })
  describe("/rent", () => {
    it("should request the rent page and return HTTP 200", async () => {
      await request(app).get("/rent").expect(200);
    })
  })
  describe("/default", () => {
    it("should request a non existing page and return HTTP 404", async () => {
      const response = await request(app).get("/random").expect(404);
      expect(response.text).to.be.deep.equal("Page not found!")
    })
  })
});
