import type { FilterPattern } from '@rollup/pluginutils'

export type CaptureObject = Record<string, string>
export type CaptureFunction = (shebang: string) => void
export type CaptureOption = CaptureObject | CaptureFunction | null

export interface Options {
  readonly include?: FilterPattern
  readonly exclude?: FilterPattern
  readonly capture?: CaptureOption
  readonly sourcemap?: boolean | null
}
