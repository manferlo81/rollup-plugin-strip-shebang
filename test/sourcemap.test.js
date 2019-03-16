const { rollup } = require("rollup");
const plugin = require("..");

function generateExample(callback, sourcemap) {

  let shebang;

  rollup({
    input: require.resolve("./example.js"),
    plugins: [
      plugin({
        capture(strippedShebang) {
          shebang = strippedShebang;
        },
        sourcemap,
      }),
    ],
    /**
     * disable warnings as we will get warnings
     * because we are trying to generate a sourcemap
     * for the bundle but we want the plugin not to
     * generate one if we pass sourcemap = false
     */
    onwarn() { },
  }).then((build) => {
    build.generate({
      format: "cjs",
      sourcemap: true,
    }).then(({ output: [{ code, map }] }) => {
      callback({ code, map, shebang });
    });
  });

}

test("should respect sourcemap", (done) => {

  generateExample(({ map }) => {

    expect(map).toBeTruthy();
    expect(map.sourcesContent).toBeTruthy();
    expect(map.sourcesContent.length).toBe(0);

    done();

  }, false);


});

test("should sourcemap defaults to true", (done) => {

  generateExample(({ map }) => {

    expect(map).toBeTruthy();
    expect(map.sourcesContent).toBeTruthy();
    expect(map.sourcesContent.length).toBeGreaterThan(0);

    done();

  });


});
