import { expect, describe, it, jest, beforeEach } from "@jest/globals";

import fsPromises from "fs/promises";
import fs from "fs";
import { defaultLayers } from "../../src/constants.js";
import { createFiles } from "../../src/createFiles.js";
import templates from "../../src/templates/index.js";

describe("#Layers - files structure", () => {
  const config = {
    mainPath: "./",
    defaultMainFolder: "src",
    componentName: "heroes",
    layers: defaultLayers,
  };

  const repositoryLayer = `${config.componentName}Repository`;
  const serviceLayer = `${config.componentName}Service`;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should not create file structure on inexistent templates", async () => {
    const myConfig = {
      ...config,
      layers: ["inexistent"],
    };

    const expected = { error: "The chosen layer doesnt have a template" };

    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);
  });

  it("repository should not add any additionals dependencies", async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest
      .spyOn(templates, templates.repositoryTemplate.name)
      .mockReturnValue({ fileName: "", template: "" });

    const myConfig = {
      ...config,
      layers: ["repository"],
    };

    const expected = { success: true };

    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.repositoryTemplate).toHaveBeenCalledWith(myConfig.componentName);
  });

  it("service should have repository as dependency", async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest
      .spyOn(templates, templates.serviceTemplate.name)
      .mockReturnValue({ fileName: "", template: "" });

    const myConfig = {
      ...config,
      layers: ["repository", "service"],
    };

    const expected = { success: true };

    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.serviceTemplate).toHaveBeenCalledWith(myConfig.componentName, repositoryLayer);
  });

  it("factory should have repository and service as dependencies", async () => {
    jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
    jest
      .spyOn(templates, templates.factoryTemplate.name)
      .mockReturnValue({ fileName: "", template: "" });

    const myConfig = {
      ...config,
    };

    const expected = { success: true };

    const result = await createFiles(myConfig);

    expect(result).toStrictEqual(expected);
    expect(fsPromises.writeFile).toHaveBeenCalledTimes(myConfig.layers.length);
    expect(templates.factoryTemplate).toHaveBeenCalledWith(
      myConfig.componentName,
      repositoryLayer,
      serviceLayer
    );
  });
});
