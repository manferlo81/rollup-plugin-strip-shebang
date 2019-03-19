const generate = require("./generate");

test("should capture shebang using a function", (done) => {

  let shebang;
  const capture = (strippedShebang) => {
    shebang = strippedShebang;
  };

  generate(() => {

    expect(shebang).toBe("#!/usr/bin/env node");

    done();

  }, { capture });

});
