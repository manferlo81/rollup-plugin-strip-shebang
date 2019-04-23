const CI = !!process.env.CI;

module.exports = {

  testEnvironment: "node",

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: [
    CI ? "json" : "lcov",
    "text",
    "text-summary",
  ],
  collectCoverageFrom: [
    "dist/**",
  ],

  verbose: true,

};
