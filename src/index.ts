import { get } from 'lodash-es';

export const tableToExcel = <P>(
  obj: Record<string, unknown>,
  path: string
): P => {
  return get(obj, path) as P;
};
