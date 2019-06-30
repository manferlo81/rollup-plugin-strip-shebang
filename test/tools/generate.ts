
import { SourceMap } from "magic-string";
import { rollup, RollupWarning } from "rollup";
import plugin from "../../src";

interface GenerateResult {
  code: string;
  warnings: Array<string | RollupWarning>;
  map?: SourceMap;
}

type Options = (typeof plugin) extends ((options: infer O) => any) ? O : never;

const generate = async (input: string, options?: Options): Promise<GenerateResult> => {

  const warnings: Array<string | RollupWarning> = [];

  const build = await rollup({
    input: require.resolve(`../examples/${input}`),
    plugins: [
      plugin(options),
    ],
    onwarn(warning) {
      warnings.push(warning);
    },
  });

  const { output: [{ code, map }] } = await build.generate({
    format: "es",
    sourcemap: true,
  });

  return {
    warnings,
    code,
    map,
  };

};

export default generate;
