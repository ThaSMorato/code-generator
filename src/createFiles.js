import fsPromises from "fs/promises";
import fs from "fs";
import templates from "./templates/index.js";
import { resolve } from "path";

const defaultDependencies = (layer, componentName) => {
  const dependencies = new Map([
    ["repository", []],
    ["service", [`${componentName}Repository`]],
    ["factory", [`${componentName}Repository`, `${componentName}Service`]],
  ]);

  return dependencies.get(layer);
};

const executeWrites = async (pendingFilesToWrite) => {
  return Promise.all(
    pendingFilesToWrite.map(({ fileName, txtFile }) =>
      fsPromises.writeFile(resolve(fileName), txtFile)
    )
  );
};
export async function createFiles({ mainPath, defaultMainFolder, layers, componentName }) {
  const keys = Object.keys(templates);

  const pendingFilesToWrite = [];

  for (const layer of layers) {
    const chosenTemplate = keys.find((key) => key.includes(layer));

    if (!chosenTemplate) return { error: "The chosen layer doesnt have a template" };

    const template = templates[chosenTemplate];

    const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`;

    const dependencies = defaultDependencies(layer, componentName);

    const { fileName, template: txtFile } = template(componentName, ...dependencies);

    const fileNameJs = `${targetFolder}/${fileName}.js`;

    pendingFilesToWrite.push({ fileName: fileNameJs, txtFile });
  }

  await executeWrites(pendingFilesToWrite);

  return { success: true };
}
