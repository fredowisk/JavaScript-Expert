export default {
  clearMocks: true,

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  coverageReporters: ["json", "text", "lcov", "clover"],

  //força um coverage para todos os arquivos
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/index.js",
    "!src/producer-server.js",
  ],

  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },

  moduleNameMapper: {
    "#(.*)": "<rootDir>/node_modules/$1",
  },

  maxWorkers: "50%",
  testEnvironment: "node",
  watchPathIgnorePatterns: ["node_modules"],
  transformIgnorePatterns: ["node_modules"],
};
