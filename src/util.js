export class Util {
  static #transform({ string: [first, ...rest] }, isUpperCase = true) {
    if (!first) return "";
    const firstLetter = isUpperCase ? first.toUpperCase() : first.toLowerCase();

    return [firstLetter, ...rest].join("");
  }

  static uppercaseFirstLetter(string) {
    return Util.#transform({ string });
  }

  static lowercaseFirstLetter(string) {
    return Util.#transform({ string }, false);
  }
}
