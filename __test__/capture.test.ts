import generate from './tools/generate';

const expectedShebang = '#!/usr/bin/env node';

describe('capture option', () => {

  test('should throw on invalid capture option', () => {

    expect(generate('example1.js', { capture: 100 as any })).rejects.toThrow();

  });

  test('should capture shebang using a function', async () => {

    let shebang;
    const capture = (strippedShebang: string) => {
      shebang = strippedShebang;
    };

    await generate('example1.js', { capture });

    expect(shebang).toBe(expectedShebang);

  });

  test('should capture shebang using an object', async () => {

    const capture: Record<string, string> = {};

    await generate('example1.js', { capture });

    expect(capture.shebang).toBe(expectedShebang);

  });

});
