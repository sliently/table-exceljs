import { Worksheet } from 'exceljs';
import { SheetHeader } from './sheet';
import { isObject, isString } from 'lodash-es';
import { sheetCell } from './cell';
import { getColumnKey } from '../const';
/**
 * 创建一个sheetHeader
 * @param ws
 * @param row
 * @param header
 * @param length
 */
const createSheetHeaderOne = (
  ws: Worksheet,
  row: number,
  header: SheetHeader,
  length: number
) => {
  if (isObject(header) && !Array.isArray(header)) {
    if (header.height) {
      const _row = ws.getRow(row);
      _row.height = header.height;
    }

    sheetCell(ws, row, 1, {
      value: header.name,
      style: header.style,
    });

    ws.mergeCells(`${getColumnKey(1, row)}:${getColumnKey(length, row)}`);
  }
};

/**
 * 创建sheet 头部内容
 * @param wb
 * @param header
 */
export const createSheetHeader = (
  ws: Worksheet,
  header: SheetHeader,
  cellLength: number
): number => {
  // 字符串
  if (isString(header)) {
    sheetCell(ws, 1, 1, {
      value: header,
    });
    ws.mergeCells(`${getColumnKey(1, 1)}:${getColumnKey(length, 1)}`);
    return 1;
  }
  // 数组
  if (Array.isArray(header)) {
    // ws
    header.forEach((item, idx) => {
      createSheetHeaderOne(ws, idx + 1, item, cellLength);
    });
    return header.length;
  }
  // 对象
  if (isObject(header)) {
    createSheetHeaderOne(ws, 1, header, cellLength);
    return 1;
  }
  return 0;
};
