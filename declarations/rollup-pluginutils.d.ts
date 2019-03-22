// rollup-pluginutils desn't have a type declaration file

declare type MinimatchPattern = Array<string | RegExp> | string | RegExp | null;
declare type Filter = (id: any) => boolean;

export function createFilter(
  include?: MinimatchPattern,
  exclude?: MinimatchPattern,
): Filter;
