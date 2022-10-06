import Util from "../util.js";

const serviceNameAnchor = "$$serviceName";
const serviceNameDepAnchor = "$$serviceNameDep";

const repositoryNameAnchor = "$$repositoryName";
const repositoryNameDepAnchor = "$$repositoryNameDep";

const componentNameAnchor = "$$componentName";

const template = `
  import $$serviceName from '../service/$$serviceNameDep.js'
  import $$repositoryName from '../repository/$$repositoryNameDep.js'

  export default class $$componentNameFactory {
    static getInstance() {
      const repository = new $$repositoryName();
      return new $$serviceName({repository});
    }
  }
`;

export function factoryTemplate(componentName, repositoryName, serviceName) {
  const txtFile = template
    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    .replaceAll(serviceNameDepAnchor, Util.lowerCaseFirstLetter(serviceName))
    .replaceAll(
      repositoryNameDepAnchor,
      Util.lowerCaseFirstLetter(repositoryName)
    )
    .replaceAll(repositoryNameAnchor, Util.upperCaseFirstLetter(repositoryName))
    .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName));

  return {
    fileName: `${componentName}Factory`,
    template: txtFile,
  };
}
