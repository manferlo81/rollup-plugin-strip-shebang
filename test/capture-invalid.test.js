const { rollup } = require("rollup");
const plugin = require("..");

function generateExample(callback) {

  let invalidWarning = false;

  rollup({
    input: require.resolve("./example.js"),
    plugins: [
      plugin({
        // invalid capture option
        capture: 1,
      }),
    ],
    onwarn(warning) {
      invalidWarning = warning.plugin === "strip-shebang";
    },
  }).then((build) => {
    build.generate({
      format: "cjs",
    }).then(() => {
      callback(invalidWarning);
    });
  });

}

test("should strip and capture shebang", (done) => {

  generateExample((invalidWarning) => {

    expect(invalidWarning).toBe(true);

    done();

  });


});
