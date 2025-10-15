import type { CaptureFunction, CaptureObject, CaptureOption } from './types'

export function processCaptureOption(option?: null): null
export function processCaptureOption<F extends CaptureFunction>(option?: F): F
export function processCaptureOption(option?: CaptureObject): CaptureFunction
export function processCaptureOption(option?: CaptureOption): CaptureFunction | null
export function processCaptureOption(option?: CaptureOption): CaptureFunction | null {

  // return null if option is null or undefined
  if (option == null) return null

  // return option if it's a function
  if (typeof option === 'function') return option

  // throw if option is not an object at this point
  if (typeof option !== 'object') throw new TypeError('capture option should be a function or an object')

  // return capture function from object
  return (captured) => {
    option.shebang = captured
  }

}
