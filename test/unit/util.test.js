import { expect, describe, it, jest, beforeEach } from "@jest/globals";
import { Util } from "../../src/util";

describe("#Util - Strings", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it("#UppercaseFirstLetter should transform first letter in uppercase", () => {
    const data = "hello";

    const expected = "Hello";

    const result = Util.uppercaseFirstLetter(data);

    expect(result).toStrictEqual(expected);
  });

  it("#LowerFirstLetter should transform first letter in lower", () => {
    const data = "Hello";

    const expected = "hello";

    const result = Util.lowercaseFirstLetter(data);

    expect(result).toStrictEqual(expected);
  });

  it("#LowerFirstLetter given an empty string it should return empty", () => {
    const data = "";

    const expected = "";

    const result = Util.lowercaseFirstLetter(data);

    expect(result).toStrictEqual(expected);
  });
  it("#UppercaseFirstLetter given an empty string it should return empty", () => {
    const data = "";

    const expected = "";

    const result = Util.lowercaseFirstLetter(data);

    expect(result).toStrictEqual(expected);
  });
});
