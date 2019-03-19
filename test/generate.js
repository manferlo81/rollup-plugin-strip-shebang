const { rollup } = require("rollup");
const plugin = require("..");

module.exports = (callback, options = {}) => {

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
