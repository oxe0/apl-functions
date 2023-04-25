export default {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@functions/(.*)$': '<rootDir>src/functions/*',
    '^@use-cases/(.*)$': '<rootDir>src/use-cases/*',
    '^@repositories/(.*)$': '<rootDir>src/repositories/*',
    '^@models/(.*)$': '<rootDir>src/models/*',
    '^@libs/(.*)$': '<rootDir>src/libs/*',
  },
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
