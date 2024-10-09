import { stripShebang } from '../src';
import { generate } from './tools/generate';
import { mockCWD } from './tools/mock-cwd';

describe('strip shebang from file content', () => {

  test('should strip shebang', async () => {
    const input = 'with-node-shebang.js';
    const plugins = [
      stripShebang(),
    ];
    const { code } = await mockCWD(() => generate(input, plugins));
    expect(code).not.toMatch(/#!/);
  });

});
