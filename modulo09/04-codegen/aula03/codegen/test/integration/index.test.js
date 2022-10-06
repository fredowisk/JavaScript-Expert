import {
  expect,
  describe,
  jest,
  test,
  beforeEach,
  afterAll,
} from "@jest/globals";
import { execSync } from "child_process";
import { existsSync, rmSync } from "fs";
import Util from "../../src/util";

describe("#App Index Structure Test Suite", () => {
  const tmpPath = "./test/tmp";
  const layers = ["repository", "service", "factory"];
  const componentName = "person";

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  afterAll(() => {
    rmSync(tmpPath, { recursive: true });
  });

  test("should create a project skeleton", () => {
    const beforeRun = existsSync(tmpPath);
    execSync(`set NODE_ENV=dev && codegen skeleton -c ${componentName}`, {
      cwd: `./test`,
    });

    const afterRun = existsSync(tmpPath);
    expect(beforeRun).toBeFalsy();
    expect(afterRun).toBeTruthy();

    layers.forEach((currentLayer) => {
      const isLayerCreated = existsSync(`${tmpPath}/${currentLayer}`);
      const isFileCreated = existsSync(
        `${tmpPath}/${currentLayer}/${componentName}${Util.upperCaseFirstLetter(
          currentLayer
        )}.js`
      );
      expect(isLayerCreated).toBeTruthy();
      expect(isFileCreated).toBeTruthy();
    });
  });
});
