import { stripShebang } from '../src';
import { generate } from './tools/generate';
import { mockCWD } from './tools/mock-cwd';

describe('skip', () => {

  test('should skip files without shebang', () => {
    const promise = mockCWD(() => generate('no-shebang.js', [
      stripShebang(),
    ]));
    return expect(promise).resolves.toBeInstanceOf(Object);
  });

  test('should skip files using "include" option', () => {
    const promise = mockCWD(() => generate('with-user-shebang.js', [
      stripShebang({ include: /anything\.js/ }),
    ]));
    return expect(promise).resolves.toBeInstanceOf(Object);
  });

  test('should skip files using "include" option', () => {
    const promise = mockCWD(() => generate('with-node-shebang.js', [
      stripShebang({ include: /anything\.js/ }),
    ]));
    return expect(promise).resolves.toBeInstanceOf(Object);
  });

  test('should skip files using "exclude" option', async () => {
    const promise = mockCWD(() => generate('with-node-shebang.js', [
      stripShebang({ exclude: /with-node-shebang\.js/ }),
    ]));
    return expect(promise).resolves.toBeInstanceOf(Object);
  });

});
