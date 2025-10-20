import type { FilterPattern } from '@rollup/pluginutils'
import type { CaptureFunction, CaptureObject, CaptureOption, CaptureShebangFunction, CaptureShebangObject, Options, PluginOptions, StripShebangOptions } from '../../src'
import type { And, AssignableTo, Equals, Expect } from './tools'

export type Results = And<[
  // Aliases
  Expect<Equals<Options, PluginOptions>>,
  Expect<Equals<Options, StripShebangOptions>>,
  Expect<Equals<CaptureObject, CaptureShebangObject>>,
  Expect<Equals<CaptureFunction, CaptureShebangFunction>>,

  // Options
  Expect<AssignableTo<Options, object>>,
  Expect<Equals<keyof Options, 'include' | 'exclude' | 'capture' | 'sourcemap'>>,

  // "include" option
  Expect<Equals<Options['include'], FilterPattern | undefined>>,
  Expect<AssignableTo<string, Options['include']>>,
  Expect<AssignableTo<RegExp, Options['include']>>,
  Expect<AssignableTo<string[], Options['include']>>,
  Expect<AssignableTo<RegExp[], Options['include']>>,
  Expect<AssignableTo<Array<string | RegExp>, Options['include']>>,
  Expect<AssignableTo<readonly string[], Options['include']>>,
  Expect<AssignableTo<readonly RegExp[], Options['include']>>,
  Expect<AssignableTo<ReadonlyArray<string | RegExp>, Options['include']>>,
  Expect<AssignableTo<null, Options['include']>>,
  Expect<AssignableTo<undefined, Options['include']>>,

  // "exclude" option
  Expect<Equals<Options['exclude'], FilterPattern | undefined>>,
  Expect<AssignableTo<string, Options['exclude']>>,
  Expect<AssignableTo<RegExp, Options['exclude']>>,
  Expect<AssignableTo<string[], Options['exclude']>>,
  Expect<AssignableTo<RegExp[], Options['exclude']>>,
  Expect<AssignableTo<Array<string | RegExp>, Options['exclude']>>,
  Expect<AssignableTo<readonly string[], Options['exclude']>>,
  Expect<AssignableTo<readonly RegExp[], Options['exclude']>>,
  Expect<AssignableTo<ReadonlyArray<string | RegExp>, Options['exclude']>>,
  Expect<AssignableTo<null, Options['exclude']>>,
  Expect<AssignableTo<undefined, Options['exclude']>>,

  // "capture" option
  Expect<Equals<Options['capture'], CaptureOption | undefined>>,
  Expect<AssignableTo<CaptureFunction, Options['capture']>>,
  Expect<AssignableTo<CaptureObject, Options['capture']>>,
  Expect<AssignableTo<null, Options['capture']>>,
  Expect<AssignableTo<undefined, Options['capture']>>,
  Expect<Equals<CaptureOption, CaptureObject | CaptureFunction | null>>,
  Expect<Equals<CaptureObject, Record<string, string>>>,
  Expect<Equals<CaptureFunction, (shebang: string) => void>>,

  // "sourcemap" option
  Expect<Equals<Options['sourcemap'], boolean | null | undefined>>,
  Expect<AssignableTo<boolean, Options['sourcemap']>>,
  Expect<AssignableTo<null, Options['sourcemap']>>,
  Expect<AssignableTo<undefined, Options['sourcemap']>>,
]>
