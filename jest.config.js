module.exports = {

  testEnvironment: "node",

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: [
    process.env.CIRCLECI ? "json" : "lcov",
    "text",
  ],
  collectCoverageFrom: [
    "dist/**",
  ],

  verbose: true,

};
