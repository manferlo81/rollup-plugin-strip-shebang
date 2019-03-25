const generate = require("./generate");

describe("strip shebang from file content", () => {

  test("should strip shebang", (done) => {

    generate(({ code }) => {

      expect(code).not.toMatch(/#!/);

      done();

    });

  });

});
