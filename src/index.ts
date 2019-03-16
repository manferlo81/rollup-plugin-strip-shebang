import MagicString, { SourceMap } from "magic-string";
import { Plugin, PluginImpl } from "rollup";

interface ExtractShebangOptions {
  capture?: (shebang: string) => void;
  sourcemap?: boolean;
}

type Map = SourceMap & { version: number };

function extract({ capture, sourcemap }: ExtractShebangOptions = {}): Plugin {

  const reg = /^(#!.*)/;
  const exportSourcemap = sourcemap !== false;

  return {

    name: "strip-shebang",

    transform(sourceCode) {

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
