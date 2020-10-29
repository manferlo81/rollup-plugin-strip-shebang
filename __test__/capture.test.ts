import generate from './tools/generate';

const expectedShebang = '#!/usr/bin/env node';

describe('capture option', () => {

  test('should throw on invalid capture option', () => {

    const invalids = [
      100,
      'string',
      true,
      false,
    ];

    invalids.forEach((invalid) => {
      void expect(generate('with-node-shebang.js', { capture: invalid as never })).rejects.toThrow();
    });

  });

  test('should capture shebang using a function', async () => {

    let shebang;
    const capture = (capturedShebang: string) => {
      shebang = capturedShebang;
    };
    await generate('with-node-shebang.js', { capture });

    expect(shebang).toBe(expectedShebang);

  });

  test('should capture shebang using an object', async () => {

    const capture: Record<string, string> = {};
    await generate('with-node-shebang.js', { capture });

    expect(capture.shebang).toBe(expectedShebang);

  });

});
