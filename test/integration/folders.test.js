import { expect, describe, it, jest, beforeEach, beforeAll, afterAll } from "@jest/globals";

import { tmpdir } from "os";
import fsPromises from "fs/promises";
import { join } from "path";
import { defaultLayers } from "../../src/constants.js";
import { createLayersIfNotExists } from "../../src/createLayers.js";

async function getFolders({ mainPath, defaultMainFolder }) {
  return await fsPromises.readdir(join(mainPath, defaultMainFolder));
}

describe("#Intergation -Layers - folders structure", () => {
  const config = {
    defaultMainFolder: "src",
    mainPath: "",
    layers: defaultLayers.sort(),
  };

  beforeAll(async () => {
    config.mainPath = await fsPromises.mkdtemp(join(tmpdir(), "skeleton-"));
  });

  afterAll(async () => {
    await fsPromises.rm(config.mainPath, { recursive: true });
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should create folders if it deast exists", async () => {
    const beforeRun = await fsPromises.readdir(config.mainPath);

    //run
    await createLayersIfNotExists(config);

    const afterRun = await getFolders(config);

    expect(beforeRun).not.toStrictEqual(afterRun);
    expect(afterRun).toEqual(config.layers);
  });

  it("should not create folders if it exists", async () => {
    const beforeRun = await getFolders(config);

    //run
    await createLayersIfNotExists(config);

    const afterRun = await getFolders(config);

    expect(beforeRun).toStrictEqual(afterRun);
    expect(afterRun).toEqual(beforeRun);
  });
});
