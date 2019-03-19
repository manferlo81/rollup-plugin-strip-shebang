import MagicString, { SourceMap } from "magic-string";
import { Plugin, PluginImpl } from "rollup";
import { createFilter } from "rollup-pluginutils";

interface StripShebangOptions {
  include?: Array<string | RegExp> | string | RegExp | null;
  exclude?: Array<string | RegExp> | string | RegExp | null;
  capture?: (shebang: string) => void;
  sourcemap?: boolean;
}

type SourceMapFixed = SourceMap & { version: number };

const strip: PluginImpl<StripShebangOptions> = ({
  include = [/\.(ts|js)/],
  exclude,
  capture,
  sourcemap,
}: StripShebangOptions = {}): Plugin => {

  const reg = /^(#!.*)/;
  sourcemap = sourcemap !== false;

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

      if (typeof capture === "function") {
        capture(shebang);
      } else {
        this.warn("capture option is not a function, it will be ignored");
      }

      if (!sourcemap) {
        return sourceCode.substr(shebang.length);
      }

      const ms = new MagicString(sourceCode);
      ms.overwrite(0, shebang.length, "");

      return {
        code: ms.toString(),
        map: ms.generateMap({ hires: true }) as SourceMapFixed,
      };

    },

  };

};

export default strip;
