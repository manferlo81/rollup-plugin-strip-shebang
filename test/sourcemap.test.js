const generate = require("./generate");

test("should respect sourcemap and give a warning", (done) => {

  generate(({ map, warnings }) => {

    expect(map).toBeTruthy();
    expect(map.sourcesContent).toBeTruthy();
    expect(map.sourcesContent.length).toBe(0);

    expect(warnings.length).toBe(1);
    expect(warnings[0].code).toBe("SOURCEMAP_BROKEN");

    done();

  }, { sourcemap: false });

});

test("should sourcemap default to true", (done) => {

  generate(({ map, warnings }) => {

    expect(map).toBeTruthy();
    expect(map.sourcesContent).toBeTruthy();
    expect(map.sourcesContent.length).toBeGreaterThan(0);

    expect(warnings.length).toBe(0);

    done();

  });

});
