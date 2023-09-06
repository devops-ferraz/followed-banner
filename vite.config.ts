import path from "node:path";
import { defineConfig } from "vitest/config";
import typescript from "@rollup/plugin-typescript";
import swc from "rollup-plugin-swc";

export default defineConfig({
  test: {
    setupFiles: [path.resolve(__dirname, "./vite.setup.ts")],
  },
  plugins: [
    swc({
      jsc: {
        parser: {
          syntax: "typescript",
          // tsx: true, // If you use react
          dynamicImport: true,
          decorators: true,
        },
        target: "es2021",
        transform: {
          decoratorMetadata: true,
        },
      },
    }),
  ],
  esbuild: false,
});
