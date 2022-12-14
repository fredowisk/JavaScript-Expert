/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  coverageDirectory: "coverage",
  clearMocks: true,
  coverageProvider: "v8",
  coverageReporters: ["json", "text", "lcov", "clover"],
  //força um coverage para todos os arquivos
  collectCoverageFrom: ["src/**/*.js", "!src/index.js"],
  coverageThreshold: {
    global: {
      branches: 100,
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
