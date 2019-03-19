const { rollup } = require("rollup");
const plugin = require("..");

function generateExample(callback, sourcemap) {

  let brokenSourcemap = false;

  rollup({
    input: require.resolve("./example.js"),
    plugins: [
      plugin({
        sourcemap,
      }),
    ],
    /**
     * disable warnings as we will get warnings
     * because we are trying to generate a sourcemap
     * for the bundle but we want the plugin not to
     * generate one if we pass sourcemap = false
     */
    onwarn(warning) {
      brokenSourcemap = warning.code === "SOURCEMAP_BROKEN";
    },
  }).then((build) => {
    build.generate({
      format: "cjs",
      sourcemap: true,
    }).then(({ output: [{ map }] }) => {
      callback(map, brokenSourcemap);
    });
  });

}

test("should respect sourcemap", (done) => {

  generateExample((map, brokenSourcemap) => {

    expect(map).toBeTruthy();
    expect(map.sourcesContent).toBeTruthy();
    expect(map.sourcesContent.length).toBe(0);
    expect(brokenSourcemap).toBe(true);

    done();

  }, false);


});

test("should sourcemap defaults to true", (done) => {

  generateExample((map, brokenSourcemap) => {

    expect(map).toBeTruthy();
    expect(map.sourcesContent).toBeTruthy();
    expect(map.sourcesContent.length).toBeGreaterThan(0);
    expect(brokenSourcemap).toBe(false);

    done();

  });


});
