const generate = require("./generate");

describe("sourcemap option", () => {

  test("should respect sourcemap and give a warning", (done) => {

    generate("example1.js", ({ map, warnings }) => {

      expect(map).toBeTruthy();
      expect(map.sourcesContent).toHaveLength(0);

      expect(warnings).toHaveLength(1);
      expect(warnings[0].code).toBe("SOURCEMAP_BROKEN");

      done();

    }, { sourcemap: false });

  });

  test("should sourcemap default to true and generate sourcemap", (done) => {

    generate("example1.js", ({ map, warnings }) => {

      expect(map).toBeTruthy();
      expect(map.sourcesContent).toBeTruthy();
      expect(map.sourcesContent.length).toBeGreaterThan(0);

      expect(warnings).toHaveLength(0);

      done();

    });

  });

});
