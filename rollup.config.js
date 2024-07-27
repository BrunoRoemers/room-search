import nodeResolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import dotenv from "dotenv";

// load env vars from file
dotenv.config({ path: ".env.local" });

// turn public env vars into a map of replacements
const publicEnvVarReplacements = Object.fromEntries(
  Object.entries(process.env)
    .filter(([key, value]) => key.startsWith("NEXT_PUBLIC_"))
    .map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
);

const config = {
  input: "src/bookmarklet/entry.ts",
  output: {
    format: "iife",
    file: "public/bookmarklet.js",
  },
  plugins: [
    nodeResolve(),
    typescript({
      outputToFilesystem: false,
      include: ["src/bookmarklet/**.ts", "src/models/**.ts"],
    }),
    replace({
      preventAssignment: true,
      values: publicEnvVarReplacements,
    }),
  ],
};

export default config;
