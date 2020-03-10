import { createFilter } from '@rollup/pluginutils'
import isCallable from 'is-callable'
import MagicString from 'magic-string'
import { Plugin, PluginImpl } from 'rollup'

type MinimatchPattern = Array<string | RegExp> | string | RegExp | null;
type CaptureFunction = (shebang: string) => void;

interface StripShebangOptions {
  include?: MinimatchPattern;
  exclude?: MinimatchPattern;
  capture?: Record<string, any> | CaptureFunction | null;
  sourcemap?: boolean;
}

function stripShebang(options: StripShebangOptions = {}): Plugin {

  const {
    include = /\.[jt]s$/,
    exclude,
    capture,
    sourcemap,
  } = options

  const captureShebang = !capture
    ? null
    : isCallable(capture)
      ? capture
      : (typeof capture === 'object')
        ? (captured: string) => {
          capture.shebang = captured
        }
        : null

  if (capture != null && !captureShebang) {
    throw new TypeError(`${capture} is not a function or object`)
  }

  const generateMap: boolean = sourcemap !== false
  const filter = createFilter(include, exclude)

  return {

    name: 'strip-shebang',

    transform(sourceCode, id) {

      if (!filter(id)) {
        return
      }

      const match = /^#!.*/.exec(sourceCode)

      if (!match) {
        return
      }

      const shebang = match[0]

      if (captureShebang) {
        captureShebang(shebang)
      }

      if (!generateMap) {
        return sourceCode.substr(shebang.length)
      }

      const ms = new MagicString(sourceCode).overwrite(0, shebang.length, '')

      return {
        code: ms.toString(),
        map: ms.generateMap({ hires: true }),
      }

    },

  }

}

export default (stripShebang as PluginImpl<StripShebangOptions>)
