import { expect, describe, test, jest, beforeEach } from "@jest/globals";
import * as templates from "./../../src/templates/index.js";
import {
  factoryTemplateMock,
  repositoryTemplateMock,
  serviceTemplateMock,
} from "./mocks/index.js";

const { repositoryTemplate, serviceTemplate, factoryTemplate } = templates;

describe("#Codegen 3-layers arch Test Suite", () => {
  const componentName = "product";
  const repositoryName = `${componentName}Repository`;
  const serviceName = `${componentName}Service`;
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("#should generate repository template", () => {
    const expected = {
      fileName: repositoryName,
      template: repositoryTemplateMock.default,
    };

    const result = repositoryTemplate(componentName);
    expect(result).toStrictEqual(expected);
  });

  test("#should generate service template", () => {
    const expected = {
      fileName: serviceName,
      template: serviceTemplateMock.default,
    };

    const result = serviceTemplate(componentName, repositoryName);
    expect(result).toStrictEqual(expected);
  });

  test("#should generate factory template", () => {
    const factoryName = `${componentName}Factory`;

    const expected = {
      fileName: factoryName,
      template: factoryTemplateMock.default,
    };

    const result = factoryTemplate(componentName, repositoryName, serviceName);
    expect(result).toStrictEqual(expected);
  });
});
