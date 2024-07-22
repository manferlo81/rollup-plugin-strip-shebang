import type { FilterPattern } from '@rollup/pluginutils';

export type CaptureFunction = (shebang: string) => void;

export interface StripShebangOptions {
  include?: FilterPattern;
  exclude?: FilterPattern;
  capture?: Record<string, string> | CaptureFunction | null;
  sourcemap?: boolean;
}
