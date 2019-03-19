const generate = require("./generate");

test("should get a warning on invalid capture option", (done) => {

  // Invalid capture option
  const capture = 1;

  generate(({ warnings }) => {

    expect(warnings.length).toBe(1);
    expect(warnings[0].plugin).toBe("strip-shebang");

    done();

  }, { capture });

});
