import { main, module as pkgModule, dependencies, peerDependencies, types, typings } from "./package.json";
import typescript from "typescript";
import { builtinModules } from "module";

import ts from "rollup-plugin-typescript2";
import buble from "rollup-plugin-buble";

const sourcemap = true;

/** @type {string[]} */
const external = [...builtinModules];
if (dependencies) {
  external.push(...Object.keys(dependencies));
}
if (peerDependencies) {
  external.push(...Object.keys(peerDependencies));
}

const tsconfigOverride = {
  compilerOptions: {
    sourceMap: sourcemap,
  },
};
if (typings || types) {
  tsconfigOverride.compilerOptions.declarationDir = typings || types;
}

/** @type {import("rollup").RollupOptions} */
const config = {

  input: "src/index.ts",

  output: [
    { file: main, format: "cjs", sourcemap, interop: false },
    { file: pkgModule, format: "esm", sourcemap },
  ],

  external,

  plugins: [
    ts({
      typescript,
      cacheRoot: ".cache",
      useTsconfigDeclarationDir: true,
      tsconfigOverride,
    }),
    buble({
      exclude: "node_modules/**",
      target: {
        node: 0.12,
      },
    }),
  ],

};

export default config;
