import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/src/prisma/singleton.ts"],
  testMatch: ["<rootDir>/src/**/?(*.)+(spec|test).[jt]s?(x)"],
};

export default config;

