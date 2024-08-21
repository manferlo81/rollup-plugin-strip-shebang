import { createFilter } from '@rollup/pluginutils';
import isCallable from 'is-callable';
import MagicString from 'magic-string';
import type { Plugin } from 'rollup';
import { StripShebangOptions } from './types';

export function stripShebang(options: StripShebangOptions = {}): Plugin {

  const {
    include = /\.[jt]s$/,
    exclude,
    capture,
    sourcemap,
  } = options;

  const captureShebang = !capture
    ? null
    : isCallable(capture)
      ? capture
      : (typeof capture === 'object')
        ? (captured: string) => {
          capture.shebang = captured;
        }
        : null;

  if (capture != null && !captureShebang) {
    throw new TypeError(`${capture as unknown as string} is not a function nor an object`);
  }

  const generateMap: boolean = sourcemap !== false;
  const filter = createFilter(include, exclude);

  return {

    name: 'strip-shebang',

    transform(sourceCode, id) {

      if (!filter(id)) {
        return;
      }

      const match = /^#!.*/.exec(sourceCode);

      if (!match) {
        return;
      }

      const shebang = match[0];

      if (captureShebang) {
        captureShebang(shebang);
      }

      const { length: len } = shebang;

      if (!generateMap) {
        return sourceCode.substr(len);
      }

      const ms = new MagicString(sourceCode).remove(0, len);

      return {
        code: ms.toString(),
        map: ms.generateMap({ hires: true }),
      };

    },

  };

}
