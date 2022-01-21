export default {
  coverageDirectory: "coverage",
  coverageProject: "v8",
  coverageReporters: ["json", "text", "lcov", "clover"],
  collectCoverageFrom: ["src/**/*.js", "!src/index.js", "!src/constants.js"],
  coverageThreshold: {
    global: {
      branch: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  maxWorkers: "50%",
  testEnvironment: "node",
  watchPathIgnorePatterns: ["node_modules"],
  transformIgnorePatterns: ["node_modules"],
};
