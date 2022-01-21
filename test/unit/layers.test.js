import { expect, describe, it, jest, beforeEach } from "@jest/globals";

import { createLayersIfNotExists } from "../../src/createLayers.js";
import fsPromises from "fs/promises";
import fs from "fs";
import { defaultLayers } from "../../src/constants.js";

describe("#Layers - folder structure", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("should create folders if it doesnt exist", async () => {
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue();
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false);

    await createLayersIfNotExists({ mainPath: "", layers: defaultLayers });

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
    expect(fsPromises.mkdir).toHaveBeenCalledTimes(defaultLayers.length);
  });

  it("should not create folders if it does exist", async () => {
    jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue();
    jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true);

    await createLayersIfNotExists({ mainPath: "", layers: defaultLayers });

    expect(fs.existsSync).toHaveBeenCalledTimes(defaultLayers.length);
    expect(fsPromises.mkdir).not.toHaveBeenCalled();
  });
});
