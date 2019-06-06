import MagicString, { SourceMap } from "magic-string";
import { Plugin, PluginImpl } from "rollup";
import { createFilter } from "rollup-pluginutils";

type MinimatchPattern = Array<string | RegExp> | string | RegExp | null;
type CaptureFunction = (shebang: string) => void;

interface StripShebangOptions {
  include?: MinimatchPattern;
  exclude?: MinimatchPattern;
  capture?: Record<string, any> | CaptureFunction | null;
  sourcemap?: boolean;
}

// https://github.com/Rich-Harris/magic-string/pull/155
type SourceMapFixed = SourceMap & { version: number };

function isFunction(obj: unknown): obj is CaptureFunction {
  return typeof obj === "function";
}

const stripShebang: PluginImpl<StripShebangOptions> = ({
  include = [/\.(ts|js)/],
  exclude,
  capture,
  sourcemap,
}: StripShebangOptions = {}): Plugin => {

  if (capture != null && capture && !isFunction(capture) && (typeof capture !== "object")) {
    throw new TypeError(`${capture} has to be a function or an object.`);
  }

  const generateMap: boolean = sourcemap !== false;
  const filter = createFilter(include, exclude);

  return {

    name: "strip-shebang",

    transform(sourceCode, id) {

      if (!filter(id)) {
        return;
      }

      const shebangReg = /^#!.*/;
      const match = sourceCode.match(shebangReg);

      if (!match) {
        return;
      }

      const shebang = match[0];

      if (isFunction(capture)) {
        capture(shebang);
      } else if (capture) {
        capture.shebang = shebang;
      }

      if (!generateMap) {
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
