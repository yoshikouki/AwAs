import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./src/tests/setup.ts"],
    globalSetup: ["./src/tests/global-setup.ts"],
    mockReset: true,
  },
});
