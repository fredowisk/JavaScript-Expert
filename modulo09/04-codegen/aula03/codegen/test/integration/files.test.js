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
import { join } from "path";
import fsPromises from "fs/promises";

import { createLayersIfNotExists } from "../../src/createLayers.js";
import { createFiles } from "../../src/createFiles.js";
import Util from "../../src/util.js";

function getAllFunctionsFromInstance(instance) {
  const [constructor, ...methods] = Reflect.ownKeys(
    Reflect.getPrototypeOf(instance)
  );
  return methods;
}

function generateFilePath({
  mainPath,
  defaultMainFolder,
  layers,
  componentName,
}) {
  return layers.map((layer) => {
    // heroesFactory.js
    const fileName = `${componentName}${Util.upperCaseFirstLetter(layer)}.js`;

    // mainPath: /Documents/project/jsexpert
    // defaultMainFolder: src
    // layer: factory
    // fileName: heroesFactory.js
    return join(mainPath, defaultMainFolder, layer, fileName);
  });
}

describe("#Integration - Files Structure Test Suite", () => {
  const config = {
    defaultMainFolder: "src",
    mainPath: "",
    //colocando em ordem porque o sistema retorna em ordem alfabetica
    layers: ["factory", "repository", "service"],
    componentName: "heroes",
  };

  const packageJSON = "package.json";
  const packageJSONLocation = join("./test/integration/mocks", packageJSON);

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), "layers-"));
    await fsPromises.copyFile(
      packageJSONLocation,
      join(config.mainPath, packageJSON)
    );

    await createLayersIfNotExists(config);
  });

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true });
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("repository class should have create, read, update and delete methods", async () => {
    const myConfig = {
      ...config,
      layers: ["repository"],
    };

    await createFiles(myConfig);
    const [repositoryFile] = generateFilePath(myConfig);
    const { default: Repository } = await import(repositoryFile);
    const instance = new Repository();

    const expectNotImplemented = (fn) =>
      expect(() => fn.call()).rejects.toEqual("method not implemented!");

    expectNotImplemented(instance.create);
    expectNotImplemented(instance.read);
    expectNotImplemented(instance.update);
    expectNotImplemented(instance.delete);
  });

  test("service should have the same signature of repository and call all its methods", async () => {
    const myConfig = { ...config, layers: ["repository", "service"] };

    await createFiles(myConfig);
    const [repositoryFile, serviceFile] = generateFilePath(myConfig);
    const { default: Repository } = await import(repositoryFile);
    const { default: Service } = await import(serviceFile);
    const repositoryInstance = new Repository();
    const serviceInstance = new Service({ repository: repositoryInstance });

    const allRepositoryMethods =
      getAllFunctionsFromInstance(repositoryInstance);

    allRepositoryMethods.forEach((method) =>
      jest.spyOn(repositoryInstance, method).mockReturnValue()
    );

    //executa todos os métodos da service
    getAllFunctionsFromInstance(serviceInstance).forEach((method) =>
      serviceInstance[method].call(serviceInstance, [])
    );

    allRepositoryMethods.forEach((method) =>
      expect(repositoryInstance[method]).toHaveBeenCalled()
    );
  });

  test("factory instance should match layers", async () => {
    const myConfig = {
      ...config,
      layers: ["repository", "service", "factory"],
    };

    await createFiles(myConfig);
    const [repositoryFile, serviceFile, factoryFile] =
      generateFilePath(myConfig);

    const { default: Repository } = await import(repositoryFile);
    const { default: Service } = await import(serviceFile);
    const { default: Factory } = await import(factoryFile);

    const expectedInstance = new Service({ repository: new Repository() });

    const serviceInstance = Factory.getInstance();
    expect(serviceInstance).toMatchObject(expectedInstance);
    expect(serviceInstance).toBeInstanceOf(Service);
  });
});
