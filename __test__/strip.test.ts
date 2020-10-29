import generate from './tools/generate';

describe('strip shebang from file content', () => {

  test('should strip shebang', async () => {
    const { code } = await generate('with-node-shebang.js');
    expect(code).not.toMatch(/#!/);
  });

});
