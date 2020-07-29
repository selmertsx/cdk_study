module.exports = {
  "roots": [
    "<rootDir>/tests"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
