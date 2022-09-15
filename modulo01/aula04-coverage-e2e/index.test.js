const { describe, it } = require("mocha");
const request = require("supertest");
const app = require("./src/api");
const { deepStrictEqual, ok } = require("assert");

describe("API Suite test", () => {
  describe("/contact", () => {
    it("should request the contact page and return HTTP Status 200", async () => {
      const response = await request(app).get("/contact").expect(200);

      deepStrictEqual(response.text, "contact us page");
    });
  });

  describe("/hello", () => {
    it("should request an inexistent route /hi and redirect to /hello", async () => {
      const response = await request(app).get("/hi").expect(200);

      deepStrictEqual(response.text, "Hello World!");
    });
  });

  describe("/login", () => {
    it("should login successfully on the login route and return HTTP Status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "Fred", password: "123" })
        .expect(200);

      deepStrictEqual(response.text, "Logged in!");
    });

    it("should unauthorize a request when send wrong credentials and return HTTP Status 401", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "dreF", password: "321" })
        .expect(401);

      ok(response.unauthorized);
      deepStrictEqual(response.text, "Failed to login!");
    });
  });
});
