import generate from "./tools/generate";

describe("strip shebang from file content", () => {

  test("should strip shebang", async () => {

    const { code } = await generate("example1.js");

    expect(code).not.toMatch(/#!/);

  });

});
