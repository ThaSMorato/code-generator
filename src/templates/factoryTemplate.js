import { Util } from "../util.js";

const serviceNameAnchor = "$$serviceName";
const repositoryNameAnchor = "$$repositoryName";

const serviceNameDepAnchor = "$$serviceNameDep";
const repositoryNameDepAnchor = "$$repositoryNameDep";

const componentNameAnchor = "$$componentName";

const template = `
import { $$serviceName } from '../service/$$serviceNameDep.js';
import { $$repositoryName } from '../repository/$$repositoryNameDep.js';

export class $$componentNameFactory {
  static getInstance() {
    const repository = new $$repositoryName();
    const service = new $$serviceName({ repository });
    return service;
  }
}
`;

export function factoryTemplate(componentName, repositoryName, serviceName) {
  const txtFile = template
    .replaceAll(componentNameAnchor, Util.uppercaseFirstLetter(componentName))
    .replaceAll(serviceNameDepAnchor, Util.lowercaseFirstLetter(serviceName))
    .replaceAll(repositoryNameDepAnchor, Util.lowercaseFirstLetter(repositoryName))
    .replaceAll(serviceNameAnchor, Util.uppercaseFirstLetter(serviceName))
    .replaceAll(repositoryNameAnchor, Util.uppercaseFirstLetter(repositoryName));

  return {
    fileName: `${Util.lowercaseFirstLetter(componentName)}Factory`,
    template: txtFile,
  };
}
