import generate from './tools/generate';

describe('skip', () => {

  test('should skip files without shebang', async () => {

    await generate('example2.js');

  });

  test('should skip files using include', async () => {

    await generate('example2.js', { include: /anyfile\.js/ });

  });

  test('should skip files using exclude', async () => {

    await generate('example2.js', { exclude: /example2\.js/ });

  });

});
