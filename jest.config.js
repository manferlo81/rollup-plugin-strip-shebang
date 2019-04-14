module.exports = {

  testEnvironment: "node",

  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: process.env.CIRCLECI ? ["json", "text"] : ["text"],
  collectCoverageFrom: [
    "dist/**",
  ],

  verbose: true,

};
