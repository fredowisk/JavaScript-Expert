import { expect } from "chai";
import sinon from "sinon";
import { describe, it, beforeEach, afterEach, after } from "mocha";
import { fileURLToPath } from "url";
import Repository from "../src/repository.js";

import App from "../src/index.js";
import { writeFile } from "fs/promises";

describe("Index", () => {
  let sandbox = {};
  let mockDatabasePath = "";

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  after(async () => {
    await writeFile(mockDatabasePath, JSON.stringify([]));
  });

  it("should initialize loop and stop when call init and type the stop term", async () => {
    const terminalSpy = sandbox.spy(App.terminalController, "closeTerminal");

    const STOP_TERM = ":q";

    sandbox.stub(App.terminalController, "question").resolves(STOP_TERM);

    await App.init();

    expect(terminalSpy.calledOnce).to.be.ok;
  });

  it("should return status Success when call init and provide correct input", async () => {
    const mockPerson = "2 Moto,Carro,Aviao 20000 2020-01-02 2022-02-01";

    mockDatabasePath = fileURLToPath(
      new URL("./mocks/database.json", import.meta.url)
    );

    sandbox.stub(App.terminalController, "question").resolves(mockPerson);
    sandbox.stub(Repository, "databaseFile").get(() => mockDatabasePath);

    const loopSpy = sandbox.spy(App, App.mainLoop.name);

    await App.init();

    expect(await loopSpy.returnValues[0]).to.be.deep.equal({
      status: "Success",
    });
  });

  it("should return status Failed if the loop throw an Error", async () => {
    sandbox.stub(App.terminalController, "question").resolves(new Error());

    const loopSpy = sandbox.spy(App, App.mainLoop.name);

    await App.init();

    expect(await loopSpy.returnValues[0]).to.be.deep.equal({
      status: "Failed",
    });
  });
});
