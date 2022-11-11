import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.ts"],
};

export default config;

