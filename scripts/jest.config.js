/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/bin/"],
  collectCoverageFrom: ["**/*.{ts,tsx}", "!**/node_modules/**"],
};
