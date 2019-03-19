const { rollup } = require("rollup");
const plugin = require("..");

function generateExample(callback) {

  let capture = {};

  rollup({
    input: require.resolve("./example.js"),
    plugins: [
      plugin({
        capture,
      }),
    ],
  }).then((build) => {
    build.generate({
      format: "cjs",
    }).then(({ output: [{ code }] }) => {
      callback(code, capture.shebang);
    });
  });

}

test("should strip and capture shebang", (done) => {

  generateExample((code, shebang) => {

    expect(code.substr(0, 2)).not.toBe("#!");
    expect(shebang).toBe("#!/usr/bin/env node");

    done();

  });


});
