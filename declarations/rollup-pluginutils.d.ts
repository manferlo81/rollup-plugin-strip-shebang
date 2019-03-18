// rollup-plugin-utils desn't have a type declaration file

declare type Filter = (id: any) => boolean;

export function createFilter(
  include?: Array<string | RegExp> | string | RegExp | null,
  exclude?: Array<string | RegExp> | string | RegExp | null
): Filter;
