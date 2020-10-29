import generate from './tools/generate';

describe('skip', () => {

  test('should skip files without shebang', () => {
    return expect(generate('no-shebang.js')).resolves.not.toThrow();
  });

  test('should skip files using "include" option', () => {
    return expect(generate('with-node-shebang.js', { include: /anything\.js/ })).rejects.toThrow();
  });

  test('should skip files using "exclude" option', async () => {
    return expect(generate('with-node-shebang.js', { exclude: /with-node-shebang\.js/ })).rejects.toThrow();
  });

});
