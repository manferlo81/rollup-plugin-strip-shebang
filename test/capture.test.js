const generate = require("./generate");

const expectedShebang = "#!/usr/bin/env node";

describe("capture option", () => {

  test('should throw on invalid capture option', () => {

    expect(
      generate("example1.js", {
        capture: 100
      })
    ).rejects.toThrow();

  })

  test("should capture shebang using a function", async () => {

    let shebang;
    const capture = (strippedShebang) => {
      shebang = strippedShebang;
    };

    await generate("example1.js", { capture });

    expect(shebang).toBe(expectedShebang);

  });

  test("should capture shebang using an object", async () => {

    const capture = {};

    await generate("example1.js", { capture });

    expect(capture.shebang).toBe(expectedShebang);

  });

});
