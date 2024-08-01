import { Workbook } from 'exceljs';
import { ColumnProps } from './column';
import { getColumnKey } from '../const';
import { get } from 'lodash-es';
export type { ColumnProps };

export interface Sheet<P> {
  name: string; // sheet名称
  header: string[];
  columns: ColumnProps<P>[];
}
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
  source: P[],
  options?: {
    onRow: (
      row: P,
      index: number
    ) => {
      height: number;
    };
  }
) => {
  // 添加sheet
  const ws = wb.addWorksheet(sheet.name);
  // 根据columns 判断总长度
  const len = sheet.columns.length;

  let columnLen = 0;
  // 写入表格头部
  sheet.columns.forEach((item) => {
    ws.getCell(getColumnKey(columnLen, len)).value = item.title;
    const startIdx = columnLen;
    if (item.children) {
      item.children?.forEach((itemChild) => {
        ws.getCell(getColumnKey(columnLen, len + 1)).value = itemChild.title;
        columnLen += 1;
      });
      // 合并表头
      ws.mergeCells(
        `${getColumnKey(startIdx, len)}:${getColumnKey(columnLen - 1, len)}`
      );
    } else {
      columnLen += 1;
    }
  });

  // 设置表头
  sheet.header.forEach((item, index) => {
    ws.getCell(getColumnKey(0, index)).value = item;
    ws.mergeCells(
      `${getColumnKey(0, index)}:${getColumnKey(columnLen - 1, index)}`
    );
  });

  let headerHeight = sheet.header.length + 1;
  if (
    sheet.columns.some(
      (item) => item.title && item.children && item.children?.length > 0
    )
  ) {
    headerHeight += 1;
  }
  // 写入数据
  source.forEach((item, index) => {
    let columnChildLen = 0;
    sheet.columns.forEach((column, idx) => {
      if (column.children) {
        column.children.forEach((columnChild) => {
          const cell = ws.getCell(
            getColumnKey(columnChildLen, headerHeight + index)
          );
          cell.value = columnChild.render
            ? columnChild.render(get(item, columnChild.dataIndex), item, index)
            : get(item, columnChild.dataIndex);
          if (columnChild.width) {
            ws.getColumn(idx + 1).width = columnChild.width;
          }
          columnChildLen += 1;
        });
      } else {
        const cell = ws.getCell(
          getColumnKey(columnChildLen, headerHeight + index)
        );
        cell.value = column.render
          ? column.render(get(item, column.dataIndex), item, index)
          : get(item, column.dataIndex);
        if (column.width) {
          ws.getColumn(idx + 1).width = column.width;
        }
        columnChildLen += 1;
      }
    });
    // 设置行高
    if (options?.onRow) {
      const rowOption = options.onRow(item, index);
      if (rowOption.height) {
        ws.getRow(headerHeight + index + 1).height = rowOption.height;
      }
    }
  });
};
