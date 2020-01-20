module.exports = {
  verbose: true,
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/run.ts'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  preset: 'ts-jest',
  testMatch: [
    '<rootDir>/src/**/*.test.{js,ts,tsx}'
  ],
  watchPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/coverage/',
  ]
}
