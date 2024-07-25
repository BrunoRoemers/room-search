import typescript from "@rollup/plugin-typescript";

const config = {
  input: "src/bookmarklet/entry.ts",
  output: {
    format: "iife",
    file: "public/bookmarklet.js",
  },
  plugins: [typescript()],
};

export default config;
