const { rollup } = require("rollup");
const plugin = require("..");

/**
 * @param {(result: { warnings: Array<string | import("rollup").RollupWarning>, code: string, map: import("magic-string").SourceMap }) => void} callback
 * @param {{ include, exclude, capture, sourcemap }} [options]
 */
const generate = (callback, options) => {

  const result = {
    warnings: [],
  };

  rollup({
    input: require.resolve("./example.js"),
    plugins: [
      plugin(options),
    ],
    onwarn(warning) {
      result.warnings.push(warning);
    },
  }).then((build) => {
    build.generate({
      format: "cjs",
      sourcemap: true,
    }).then(({ output: [{ code, map }] }) => {
      result.code = code;
      result.map = map;
      callback(result);
    });
  });

};

module.exports = generate;
