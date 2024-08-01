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
export const getColumnKey = (x: number, y: number) => `${columnKey[x]}${y + 1}`;
