import { createFilter } from '@rollup/pluginutils';
import MagicString from 'magic-string';
import type { Plugin } from 'rollup';
import { processCaptureOption } from './capture';
import type { StripShebangOptions } from './types';

const shebangRegExp = /^#!.*/;

export function stripShebang(options: StripShebangOptions = {}): Plugin {

  const {
    include = /\.[jt]s$/,
    exclude,
    capture,
    sourcemap,
  } = options;

  // create filter
  const filter = createFilter(include, exclude);

  // normalize capture option
  const captureShebang = processCaptureOption(capture);

  // normalize sourcemap option
  const generateMap: boolean = sourcemap !== false;

  return {

    name: 'strip-shebang',

    transform(sourceCode, id) {

      // exit if filter doesn't pass the test
      if (!filter(id)) return;

      // check if shebang is present in the file
      const match = shebangRegExp.exec(sourceCode);

      // exit if shebang not resent
      if (!match) return;

      // get shebang from match
      const [shebang] = match;

      // store shebang
      captureShebang?.(shebang);

      // get shebang length
      const { length } = shebang;

      // return transformed string only if no sourcemap needs to be generated
      if (!generateMap) return sourceCode.substring(length);

      // create sourcemap manager
      const ms = new MagicString(sourceCode).remove(0, length);

      // return transformed string with sourcemap
      const code = ms.toString();
      const map = ms.generateMap({ hires: true });
      return { code, map };

    },

  };

}
