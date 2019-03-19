const generate = require("./generate");

test("should capture shebang using an object", (done) => {

  const capture = {};

  generate(() => {

    expect(capture).toHaveProperty("shebang");
    expect(capture.shebang).toBe("#!/usr/bin/env node");

    done();

  }, { capture });

});
