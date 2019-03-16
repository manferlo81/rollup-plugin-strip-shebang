import MagicString, { SourceMap } from "magic-string";
import { Plugin, PluginImpl } from "rollup";
import { createFilter } from "rollup-pluginutils";

interface ExtractShebangOptions {
  include?: Array<string | RegExp> | string | RegExp | null;
  exclude?: Array<string | RegExp> | string | RegExp | null;
  capture?: (shebang: string) => void;
  sourcemap?: boolean;
}

type Map = SourceMap & { version: number };

function extract({ include, exclude, capture, sourcemap }: ExtractShebangOptions = {}): Plugin {

  const reg = /^(#!.*)/;
  const exportSourcemap = sourcemap !== false;

  const filter = createFilter(include, exclude);

  return {

    name: "strip-shebang",

    transform(sourceCode, id) {

      if (!filter(id)) {
        return;
      }

      const match = sourceCode.match(reg);

      if (!match) {
        return;
      }

      const shebang = match[0];

      if (capture) {
        capture(shebang);
      }

      const str = new MagicString(sourceCode);
      str.overwrite(0, shebang.length, "");

      const code = str.toString();

      return exportSourcemap ? {
        code,
        map: str.generateMap({ hires: true }) as Map,
      } : code;

    },

  };

}

export default extract as PluginImpl<ExtractShebangOptions>;
