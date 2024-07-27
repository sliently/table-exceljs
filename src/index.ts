import { get } from 'lodash-es';

export const tableToExcel = (obj: Record<string, unknown>, path: string) => {
  return get(obj, path);
};
