import type { FilterPattern } from '@rollup/pluginutils';

export type CaptureShebangObject = Record<string, string>;
export type CaptureShebangFunction = (shebang: string) => void;
export type CaptureOption = CaptureShebangObject | CaptureShebangFunction | null;

export interface StripShebangOptions {
  readonly include?: FilterPattern;
  readonly exclude?: FilterPattern;
  readonly capture?: CaptureOption;
  readonly sourcemap?: boolean;
}
