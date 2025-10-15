import { createFilter } from '@rollup/pluginutils'
import MagicString from 'magic-string'
import type { Plugin } from 'rollup'

import { processCaptureOption } from './capture'
import { defaultIncludePattern, shebangRegExp } from './constants'
import type { Options } from './types'

export function stripShebang(options: Options = {}): Plugin {

  const {
    include = defaultIncludePattern,
    exclude,
    capture,
    sourcemap,
  } = options

  // Create filter
  const filter = createFilter(include, exclude)

  // Normalize capture option
  const captureShebang = processCaptureOption(capture)

  // Normalize sourcemap option
  const generateMap: boolean = sourcemap !== false

  // Return implementation
  return {

    name: 'strip-shebang',

    transform(sourceCode, id) {

      // Exit if filter doesn't pass the test
      if (!filter(id)) return

      // Exit if shebang is not resent
      const match = shebangRegExp.exec(sourceCode)
      if (!match) return

      // Get shebang from match
      const [shebang] = match

      // Capture shebang is user provided "capture" option
      if (captureShebang) captureShebang(shebang)

      // Get shebang length
      const { length } = shebang

      // Return transformed string only if no sourcemap needs to be generated
      if (!generateMap) return sourceCode.substring(length)

      // Create sourcemap manager
      const ms = new MagicString(sourceCode).remove(0, length)

      // Return transformed string with sourcemap
      const code = ms.toString()
      const map = ms.generateMap({ hires: true })
      return { code, map }

    },

  }

}
