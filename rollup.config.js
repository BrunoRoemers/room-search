import { nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";

const config = {
  input: "src/bookmarklet.tsx",
  output: {
    format: "iife",
    file: "public/bookmarklet.js",
  },
  plugins: [
    nodeResolve({
      extensions: [".js", ".ts", ".tsx"],
      browser: true,
    }),
    commonjs(),
    replace({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    babel({
      babelHelpers: "bundled",
      extensions: [".js", ".ts", ".tsx"],
      presets: ["@babel/preset-react", "@babel/preset-typescript"],
    }),
  ],
};

export default config;
