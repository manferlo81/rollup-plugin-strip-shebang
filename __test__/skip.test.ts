import stripShebang from '../src';
import { generate } from './tools/generate';
import { mockCWD } from './tools/mock-cwd';

describe('skip', () => {

  test('should skip files without shebang', () => {
    return expect(mockCWD(() => generate('no-shebang.js', [
      stripShebang(),
    ]))).resolves.not.toThrow();
  });

  test('should skip files using "include" option', () => {
    return expect(mockCWD(() => generate('with-node-shebang.js', [
      stripShebang({ include: /anything\.js/ }),
    ]))).rejects.toThrow();
  });

  test('should skip files using "exclude" option', async () => {
    return expect(generate('with-node-shebang.js', [
      stripShebang({ exclude: /with-node-shebang\.js/ }),
    ])).rejects.toThrow();
  });

});
