import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/index.ts",
    output: {
      format: "cjs",
      file: "dist/index.js",
    },
    plugins: [typescript()],
  },
  {
    input: "src/index.ts",
    output: {
      format: "iife",
      file: "examples/browser/index.umd.js",
      name: "PaytodaySDK",
    },
    plugins: [typescript()],
  },
  {
    input: "src/index.ts",
    output: {
      format: "cjs",
      file: "examples/app/src/assets/index.js",
    },
    plugins: [typescript()],
  },
  {
    input: "src/index.ts",
    output: {
      format: "iife",
      file: "dist/index.umd.js",
      name: "PaytodaySDK",
    },
    plugins: [typescript()],
  },
];
