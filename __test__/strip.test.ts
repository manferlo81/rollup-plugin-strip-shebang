import { stripShebang } from '../src';
import { generate } from './tools/generate';
import { mockCWD } from './tools/mock-cwd';

describe('strip shebang from file content', () => {

  test('should strip shebang', async () => {
    const { code } = await mockCWD(() => generate('with-node-shebang.js', [
      stripShebang(),
    ]));
    expect(code).not.toMatch(/#!/);
  });

});
