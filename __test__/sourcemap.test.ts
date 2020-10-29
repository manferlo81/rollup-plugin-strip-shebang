import { SourceMap } from 'rollup';
import generate from './tools/generate';

describe('sourcemap option', () => {

  test('should respect sourcemap and give a warning', async () => {

    const { map, warnings } = await generate('with-node-shebang.js', { sourcemap: false });

    expect(map).toBeTruthy();
    expect((map as SourceMap).sourcesContent).toHaveLength(0);
    expect(warnings).toHaveLength(1);
    expect(warnings[0].code).toBe('SOURCEMAP_BROKEN');

  });

  test('should sourcemap default to true and generate sourcemap', async () => {

    const { map, warnings } = await generate('with-node-shebang.js');

    expect(map).toBeTruthy();
    expect((map as SourceMap).sourcesContent).toBeTruthy();
    expect((map as SourceMap).sourcesContent.length).toBeGreaterThan(0);
    expect(warnings).toHaveLength(0);

  });

});
