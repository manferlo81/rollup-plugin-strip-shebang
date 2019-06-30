import generate from "./tools/generate";

describe("skip", () => {

  test("skip files without shebang", async () => {

    await generate("example2.js");

  });

  test("skip files using include", async () => {

    await generate("example2.js", { include: /anyfile\.js/ });

  });

  test("skip files using exclude", async () => {

    await generate("example2.js", { exclude: /example2\.js/ });

  });

});
