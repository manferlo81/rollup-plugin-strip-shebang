import MagicString, { SourceMap } from "magic-string";
import { Plugin, PluginImpl } from "rollup";
import { createFilter } from "rollup-pluginutils";

type MinimatchPattern = Array<string | RegExp> | string | RegExp | null;
type CaptureFunction = (shebang: string) => void;

interface StripShebangOptions {
  include?: MinimatchPattern;
  exclude?: MinimatchPattern;
  capture?: Record<string, any> | CaptureFunction;
  sourcemap?: boolean;
}

// https://github.com/Rich-Harris/magic-string/pull/155
type SourceMapFixed = SourceMap & { version: number };

const stripShebang: PluginImpl<StripShebangOptions> = ({
  include = [/\.(ts|js)/],
  exclude,
  capture,
  sourcemap,
}: StripShebangOptions = {}): Plugin => {

  const reg = /^#!.*/;
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
        (capture as CaptureFunction)(shebang);
      } else if (typeof capture === "object") {
        capture.shebang = shebang;
      } else if (capture != null) {
        this.warn("Capture option has to be a function or an object. It will be ignored.");
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

export default stripShebang;
