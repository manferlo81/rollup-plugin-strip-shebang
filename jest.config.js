const CIRCLECI = !!process.env.CIRCLECI;

module.exports = {

  testEnvironment: "node",

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: [
    CIRCLECI ? "json" : "lcov",
    "text",
    "text-summary",
  ],
  collectCoverageFrom: [
    "dist/**",
  ],

  verbose: true,

};
