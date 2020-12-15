import stripShebang from '../src';
import { generate } from './tools/generate';
import { mockCWD } from './tools/mock-cwd';

const expectedShebang = '#!/usr/bin/env node';

describe('capture option', () => {

  test('should throw on invalid capture option', () => {
    expect(() => stripShebang({ capture: 100 as never })).toThrow();
    expect(() => stripShebang({ capture: 'string' as never })).toThrow();
    expect(() => stripShebang({ capture: true as never })).toThrow();
    expect(() => stripShebang({ capture: false as never })).toThrow();
  });

  test('should capture shebang using a function', async () => {

    const shebang = await mockCWD(async () => {

      let shebang;
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

    const capture = await mockCWD(async () => {

      const capture: Record<string, string> = {};

      await generate('with-node-shebang.js', [
        stripShebang({ capture }),
      ]);

      return capture;

    });

    expect(capture.shebang).toBe(expectedShebang);

  });

});
