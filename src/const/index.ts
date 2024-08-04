export const columnKey = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
/**
 * 获取位置坐标
 * @param index
 * @returns
 */
export const getColumnKey = (col: number, row: number) =>
  `${columnKey[col - 1]}${row}`;
