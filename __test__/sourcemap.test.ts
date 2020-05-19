import { RollupWarning, SourceMap } from 'rollup';
import generate from './tools/generate';

describe('sourcemap option', () => {

  test('should respect sourcemap and give a warning', async () => {

    const { map, warnings } = await generate('example1.js', { sourcemap: false });

    expect(map).toBeTruthy();

    const sourceMap = map as SourceMap;

    expect(sourceMap.sourcesContent).toHaveLength(0);

    expect(warnings).toHaveLength(1);
    expect((warnings[0] as RollupWarning).code).toBe('SOURCEMAP_BROKEN');

  });

  test('should sourcemap default to true and generate sourcemap', async () => {

    const { map, warnings } = await generate('example1.js');

    expect(map).toBeTruthy();

    const sourceMap = map as SourceMap;

    expect(sourceMap.sourcesContent).toBeTruthy();
    expect(sourceMap.sourcesContent.length).toBeGreaterThan(0);

    expect(warnings).toHaveLength(0);

  });

});
