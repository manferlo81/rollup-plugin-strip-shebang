const generate = require("./generate");

test("should strip shebang", (done) => {

  generate(({ code }) => {

    expect(code.substr(0, 2)).not.toBe("#!");
    expect(code).not.toMatch(/#!/);

    done();

  }, { sourcemap: false });

});
