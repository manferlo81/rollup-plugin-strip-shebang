const { rollup } = require("rollup");
const plugin = require("..");

/**
 * @param { string } input
 * @param {{ include, exclude, capture, sourcemap }} [options]
 * @returns { Promise<{code, map, warnings}> }
 */
const generate = async (input, options) => {

  const warnings = [];

  const build = await rollup({
    input: require.resolve(`./${input}`),
    plugins: [
      plugin(options),
    ],
    onwarn(warning) {
      warnings.push(warning);
    },
  });

  const { output: [{ code, map }] } = await build.generate({
    format: "esm",
    sourcemap: true,
  });

  return {
    warnings,
    code,
    map
  }

};

module.exports = generate;
