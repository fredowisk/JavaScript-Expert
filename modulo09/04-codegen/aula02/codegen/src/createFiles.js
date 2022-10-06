import fsPromises from "fs/promises";
import fs from "fs";
import templates from "./templates/index.js";
import Util from "./util.js";

const defaultDependencies = (layer, componentName) => {
  const dependencies = {
    repository: [],
    service: [`${componentName}Repository`],
    factory: [`${componentName}Repository`, `${componentName}Service`],
  };

  return dependencies[layer].map(Util.lowerCaseFirstLetter);
};

async function executeWrites(pendingFilesToWrite) {
  return Promise.all(
    pendingFilesToWrite.map(({ fileName, template }) =>
      fsPromises.writeFile(fileName, template)
    )
  );
}

export async function createFiles({
  mainPath,
  defaultMainFolder,
  layers,
  componentName,
}) {
  const keys = Object.keys(templates);
  const pendingFilesToWrite = [];

  for (const layer of layers) {
    const chosenTemplate = keys.find((key) => key === `${layer}Template`);

    if (!chosenTemplate)
      return { error: "the chosen layer doesn't have a template" };

    const templateFunction = templates[chosenTemplate];
    // Users/Document/jsexpert/codegen/src/factory
    const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`;

    const dependencies = defaultDependencies(layer, componentName);
    const { fileName, template } = templateFunction(
      componentName,
      ...dependencies
    );

    // Users/Document/jsexpert/codegen/src/factory/heroesFactory.js
    const filePath = `${targetFolder}/${Util.lowerCaseFirstLetter(
      fileName
    )}.js`;

    pendingFilesToWrite.push({ filePath, template });
  }

  await executeWrites(pendingFilesToWrite);

  return { success: true };
}
