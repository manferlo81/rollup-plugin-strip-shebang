import { Plugin, rollup, RollupWarning, SourceMap } from 'rollup';

interface GenerateResult {
  code: string;
  map?: SourceMap;
  warnings: Array<RollupWarning>;
}

export async function generate(input: string, plugins: Plugin[]): Promise<GenerateResult> {

  const warnings: Array<RollupWarning> = [];

  const build = await rollup({
    input,
    plugins,
    onwarn(warning) {
      warnings.push(warning);
    },
  });

  const { output: [{ code, map }] } = await build.generate({
    file: 'dist/lib.js',
    format: 'cjs',
    sourcemap: true,
  });

  return {
    code,
    map,
    warnings,
  };

}
