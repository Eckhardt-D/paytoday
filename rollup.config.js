import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: "src/index.ts",
    output: {
      format: "esm",
      file: "dist/index.esm.js",
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
      format: "esm",
      file: "examples/app/src/assets/index.esm.js",
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
