const generate = require("./generate");

const expectedShebang = "#!/usr/bin/env node";

describe("capture option", () => {

  test("should capture shebang using a function", (done) => {

    let shebang;
    const capture = (strippedShebang) => {
      shebang = strippedShebang;
    };

    generate("example1.js", () => {

      expect(shebang).toBe(expectedShebang);

      done();

    }, { capture });

  });

  test("should capture shebang using an object", (done) => {

    const capture = {};

    generate("example1.js", () => {

      expect(capture.shebang).toBe(expectedShebang);

      done();

    }, { capture });

  });

  test("should get a warning on invalid capture option", (done) => {

    // Invalid capture option, it should generate a warning
    const capture = 1;

    generate("example1.js", ({ warnings }) => {

      expect(warnings).toHaveLength(1);
      expect(warnings[0].plugin).toBe("strip-shebang");

      done();

    }, { capture });

  });


});
