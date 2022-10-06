import {
  expect,
  describe,
  test,
  jest,
  beforeEach,
  beforeAll,
  afterAll,
} from "@jest/globals";

import { tmpdir } from "os";
import fsPromises from "fs/promises";
import { join } from "path";
import { createLayersIfNotExists } from "../../src/createLayers.js";

describe("#Integration - Folders Structure Test Suite", () => {
  const config = {
    defaultMainFolder: "src",
    mainPath: "",
    //colocando em ordem porque o sistema retorna em ordem alfabetica
    layers: ["factory", "repository", "service"],
  };

  const getFolders = async ({ mainPath, defaultMainFolder }) => {
    return fsPromises.readdir(join(mainPath, defaultMainFolder));
  };

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), "skeleton-"));
  });

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true });
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("should create folders if it doesn't exists", async () => {
    const beforeRun = await fsPromises.readdir(config.mainPath);

    await createLayersIfNotExists(config);
    const afterRun = await getFolders(config);

    expect(beforeRun).not.toStrictEqual(afterRun);
    expect(afterRun).toEqual(config.layers);
  });

  test("should not create folder if it exists", async () => {
    const beforeRun = await getFolders(config);

    await createLayersIfNotExists(config);

    const afterRun = await getFolders(config);

    expect(beforeRun).toEqual(afterRun)
  });
});
