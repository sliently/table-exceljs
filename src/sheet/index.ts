import { Workbook } from 'exceljs';
import { Sheet } from './sheet';
import { createSheetHeader } from './header';
import { createTableColumn, createTableSource } from './column';
export type * from './sheet';

/**
 * 创建sheet
 * @param wb
 * @param sheet
 * @param source
 * @param options
 */
export const createSheet = <P>(
  wb: Workbook,
  sheet: Sheet<P>,
  sources: Array<P>
) => {
  // // 添加sheet
  const ws = wb.addWorksheet(sheet.name);
  const header = sheet.header;
  const colWidth = sheet.columns.reduce((prev, v, idx) => {
    if (v.children) {
      prev += v.children.length;
    } else {
      prev += 1;
    }
    return prev;
  }, 0);
  let rowIdx = 0;
  rowIdx = createSheetHeader(ws, header, colWidth);
  rowIdx = createTableColumn(ws, rowIdx + 1, sheet.columns);
  createTableSource(ws, rowIdx + 1, sheet.columns, sources);
};
