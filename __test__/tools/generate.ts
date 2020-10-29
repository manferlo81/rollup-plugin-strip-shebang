import { rollup, RollupWarning, SourceMap } from 'rollup';
import plugin from '../../src';

interface GenerateResult {
  code: string;
  map?: SourceMap;
  warnings: Array<RollupWarning>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Options = (typeof plugin) extends ((options: infer O) => any) ? O : never;

const generate = async (input: string, options?: Options): Promise<GenerateResult> => {

  const warnings: Array<RollupWarning> = [];

  const build = await rollup({
    input: require.resolve(`../fixtures/${input}`),
    plugins: [
      plugin(options),
    ],
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

};

export default generate;
