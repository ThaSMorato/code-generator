import { Util } from "../util.js";

const componentNameAnchor = "$$componentName";

const currentContextAnchor = "$$currentContext";

const repositoryAnchor = "$$repositoryName";

const template = `
export class $$componentNameService {
  constructor({ repository: $$repositoryName}) {
    $$currentContext = $$repositoryName;
  }

  create(repoCreateDTO) {
    return $$currentContext.create(repoCreateDTO)
  }

  read(query) {
    return $$currentContext.read(query)
  }

  update(repoUpdateDTO) {
    return $$currentContext.update(repoUpdateDTO)
  }

  delete(id) {
    return $$currentContext.delete(id)
  }
}
`;

export function serviceTemplate(componentName, repositoryName) {
  const currentContext = `this.${Util.lowercaseFirstLetter(repositoryName)}`;

  const txtFile = template
    .replaceAll(componentNameAnchor, Util.uppercaseFirstLetter(componentName))
    .replaceAll(currentContextAnchor, currentContext)
    .replaceAll(repositoryAnchor, Util.uppercaseFirstLetter(repositoryName));

  return {
    fileName: `${Util.lowercaseFirstLetter(componentName)}Service`,
    template: txtFile,
  };
}
