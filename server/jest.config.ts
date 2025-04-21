import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  coverageDirectory: "./coverage",
  setupFiles: ["<rootDir>/jest.setup.ts"],
};

export default config;
