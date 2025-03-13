/** @type { import("ts-jest").JestConfigWithTsJest } */
const config = {
  preset: 'ts-jest',

  collectCoverage: !process.env.SKIP_COVERAGE,
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: process.env.CI
    ? ['text', 'json', 'clover', 'cobertura']
    : ['text', 'html'],

  cacheDirectory: 'node_modules/.cache/jest',
  verbose: true,
};

export default config;
