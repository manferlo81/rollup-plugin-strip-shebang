import isCallable from 'is-callable';
import type { CaptureOption, CaptureShebangFunction } from './types';

export function processCaptureOption(capture?: CaptureOption): CaptureShebangFunction | null {

  // return null if option is null or undefined
  if (capture == null) return null;

  // return capture function from object
  if (typeof capture === 'object') {
    return (captured) => {
      capture.shebang = captured;
    };
  }

  // throw if option is not a function at this point
  if (!isCallable(capture)) throw new TypeError(`${capture as unknown as string} is not a function nor an object`);

  // return function
  return capture;

}
