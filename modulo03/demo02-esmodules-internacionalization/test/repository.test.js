import { stub } from "sinon";
import { expect } from "chai";
import { describe, it, after, before } from "mocha";
import { fileURLToPath } from "url";
import { writeFile, readFile } from "fs/promises";

import Repository from "../src/repository.js";

describe("Repository", () => {
  let mockDatabasePath = "";

  after(async () => {
    await writeFile(mockDatabasePath, JSON.stringify([]));
  });

  it("should return the database path when call get databaseFile", () => {
    const filePath = Repository.databaseFile;

    const expectedFilePath = fileURLToPath(
      new URL("../database.json", import.meta.url)
    );
    expect(filePath).to.be.deep.equal(expectedFilePath);
  });

  it("should write data when call save with correct param", async () => {
    mockDatabasePath = fileURLToPath(
      new URL("./mocks/database.json", import.meta.url)
    );

    stub(Repository, "databaseFile").get(() => mockDatabasePath);

    const data = {
      id: "2",
      vehicles: ["Moto", "Carro", "Aviao"],
      kmTraveled: 20000,
      from: "2020-01-02",
      to: "2022-02-01",
    };

    const mockDatabase = async () =>
      JSON.parse(await readFile(mockDatabasePath));

    expect(await mockDatabase()).to.have.length(0);

    await Repository.save(data);

    expect(await mockDatabase()).to.have.length(1);
  });
});
