import type { CaptureOption, CaptureShebangFunction } from './types'

export function processCaptureOption(option?: CaptureOption): CaptureShebangFunction | null {

  // return null if option is null or undefined
  if (option == null) return null

  // return option if it's a function
  if (typeof option === 'function') return option

  // throw if option is not an object at this point
  if (typeof option !== 'object') throw new TypeError(`${option} is not a function nor an object`)

  // return capture function from object
  return (captured) => {
    option.shebang = captured
  }

}
