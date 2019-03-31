const { rollup } = require("rollup");
const plugin = require("..");

/**
 * @param {string} input
 * @param {(result: { warnings: Array<string | import("rollup").RollupWarning>, code: string, map: import("magic-string").SourceMap }) => void} callback
 * @param {{ include, exclude, capture, sourcemap }} [options]
 */
const generate = (input, callback, options) => {

  const result = {
    warnings: [],
  };

  rollup({
    input: require.resolve(`./${input}`),
    plugins: [
      plugin(options),
    ],
    onwarn(warning) {
      result.warnings.push(warning);
    },
  }).then((build) => {
    build.generate({
      format: "esm",
      sourcemap: true,
    }).then(({ output: [{ code, map }] }) => {
      result.code = code;
      result.map = map;
      callback(result);
    });
  });

};

module.exports = generate;
