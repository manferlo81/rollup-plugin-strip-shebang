import { stripShebang } from '../src';
import { generate } from './tools/generate';
import { mockCWD } from './tools/mock-cwd';

const expectedShebang = '#!/usr/bin/env node';

describe('capture option', () => {

  test('should throw on invalid capture option', () => {
    const invalidCaptureOptions = [
      100,
      'string',
      true,
      false,
    ];
    invalidCaptureOptions.forEach((invalid) => {
      const createPlugin = () => stripShebang({ capture: invalid as never });
      expect(createPlugin).toThrow('is not a function nor an object');
    });
  });

  test('should capture shebang using a function', async () => {

    const shebang = await mockCWD(async () => {

      let shebang: string | undefined;

      const capture = (capturedShebang: string) => {
        shebang = capturedShebang;
      };

      await generate('with-node-shebang.js', [
        stripShebang({ capture }),
      ]);

      return shebang;

    });

    expect(shebang).toBe(expectedShebang);

  });

  test('should capture shebang using an object', async () => {

    const captured = await mockCWD(async () => {

      const capture: Record<string, string> = {};

      await generate('with-node-shebang.js', [
        stripShebang({ capture }),
      ]);

      return capture;

    });

    expect(captured.shebang).toBe(expectedShebang);

  });

});
