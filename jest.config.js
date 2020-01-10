module.exports = {
  verbose: true,
  collectCoverageFrom: [
    'src/**/*.{js,ts,tsx}',
    '!src/**/*.d.ts'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testMatch: [
    '<rootDir>/src/**/*.test.{js,ts,tsx}'
  ],
  transform: {
    '.(ts|tsx)': 'ts-jest'
  }
}
