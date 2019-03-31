const generate = require("./generate");

describe("skip", () => {

  test("skip files without shebang", (done) => {

    generate("example2.js", () => {

      done();

    });

  });

  test("skip files using include", (done) => {

    generate("example2.js", () => {

      done();

    }, { include: /anyfile\.js/ });

  });

  test("skip files using exclude", (done) => {

    generate("example2.js", () => {

      done();

    }, { exclude: /example2\.js/ });

  });

});
