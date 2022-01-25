import { expect, describe, it, jest, beforeEach, beforeAll, afterAll } from "@jest/globals";

import { tmpdir } from "os";
import fsPromises from "fs/promises";
import { join } from "path";
import { defaultLayers } from "../../src/constants.js";
import { createLayersIfNotExists } from "../../src/createLayers.js";
import { createFiles } from "../../src/createFiles.js";
import { Util } from "../../src/util.js";

function generateFilePath({ mainPath, defaultMainFolder, layers, componentName }) {
  return layers.map((layer) => {
    const fileName = `${Util.lowercaseFirstLetter(componentName)}${Util.uppercaseFirstLetter(
      layer
    )}`;
    return join(mainPath, defaultMainFolder, layer, `${fileName}.js`);
  });
}

function getAllFunctionsFromInstance(instance) {
  return Reflect.ownKeys(Reflect.getPrototypeOf(instance)).filter(
    (method) => method !== "constructor"
  );
}

describe("#Intergation - Files - files structure", () => {
  const config = {
    defaultMainFolder: "src",
    mainPath: "",
    layers: defaultLayers.sort(),
    componentName: "heroes",
  };

  const packageJson = "package.json";
  const packageJsonLocation = join(`./test/integration/mocks/${packageJson}`);

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), "layers-"));
    await fsPromises.copyFile(packageJsonLocation, join(config.mainPath, packageJson));
    await createLayersIfNotExists(config);
  });

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true });
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("Repository class should have create, read, update and delte methods", async () => {
    const myConfig = {
      ...config,
      layers: ["repository"],
    };

    await createFiles(myConfig);

    const [repositoryFile] = generateFilePath(myConfig);

    const { HeroesRepository } = await import(repositoryFile);

    const expectNotImplemented = (fn) =>
      expect(() => fn.call()).rejects.toEqual("Method not impleented!");

    const instance = new HeroesRepository();

    expectNotImplemented(instance.create);
    expectNotImplemented(instance.create);
    expectNotImplemented(instance.read);
    expectNotImplemented(instance.delete);
  });

  it("Service class should have create, read, update and delte methods and call repository methods", async () => {
    const myConfig = {
      ...config,
      layers: ["repository", "service"],
    };

    await createFiles(myConfig);

    const [repositoryFile, serviceFile] = generateFilePath(myConfig);

    const { HeroesRepository } = await import(repositoryFile);
    const { HeroesService } = await import(serviceFile);

    const repository = new HeroesRepository();
    const service = new HeroesService({ repository });

    const allRepositoryMethods = getAllFunctionsFromInstance(repository);

    allRepositoryMethods.forEach((method) => jest.spyOn(repository, method).mockResolvedValue());

    const allServiceMethods = getAllFunctionsFromInstance(service);

    allServiceMethods.forEach((method) => service[method].call(service, []));

    allRepositoryMethods.forEach((method) => expect(repository[method]).toHaveBeenCalled());
  });

  it("Factory instance should match layers", async () => {
    const myConfig = {
      ...config,
    };

    await createFiles(myConfig);

    const [factoryFile, repositoryFile, serviceFile] = generateFilePath(myConfig);

    const { HeroesRepository } = await import(repositoryFile);
    const { HeroesService } = await import(serviceFile);
    const { HeroesFactory } = await import(factoryFile);

    const expectedInstance = new HeroesService({ repository: new HeroesRepository() });
    const instance = HeroesFactory.getInstance();

    expect(instance).toMatchObject(expectedInstance);
    expect(instance).toBeInstanceOf(HeroesService);
  });
});
