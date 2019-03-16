declare type Filter = (id: any) => boolean;

export function createFilter(
  include?: Array<string | RegExp> | string | RegExp | null,
  exclude?: Array<string | RegExp> | string | RegExp | null
): Filter;
