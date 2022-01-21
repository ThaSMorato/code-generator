import { Util } from "../util.js";

const componentNameAnchor = "$$componentName";

const template = `
export class $$componentNameRepository {
  constructor() {}

  create(repoCreateDTO) {
    return Promise.reject("Method not impleented!");
  }

  read(query) {
    return Promise.reject("Method not impleented!");
  }

  update(repoUpdateDTO) {
    return Promise.reject("Method not impleented!");
  }

  delete(id) {
    return Promise.reject("Method not impleented!");
  }
}
`;

export function repositoryTemplate(componentName) {
  return {
    fileName: `${Util.lowercaseFirstLetter(componentName)}Repository`,
    template: template.replaceAll(componentNameAnchor, Util.uppercaseFirstLetter(componentName)),
  };
}
