import { Worksheet } from 'exceljs';
import { ColumnProps } from './sheet';
import { sheetCell } from './cell';
import { getColumnKey } from '../const';
import { get } from 'lodash-es';
/**
 * 设置column
 * @param ws
 * @param column
 * @param row
 * @param col
 */
const setColumn = <P>(
  ws: Worksheet,
  column: ColumnProps<P>,
  row: number,
  col: number
) => {
  if (column.style) {
    ws.getColumn(col).style = column.style;
  }
  if (column.width) {
    ws.getColumn(col).width = column.width;
  }
  sheetCell(ws, row, col, {
    value: column.title,
    style: column.style,
  });
};
/**
 * 创建列
 * @param ws
 * @param row
 * @param columns
 * @returns
 */
export const createTableColumn = <P>(
  ws: Worksheet,
  row: number,
  columns: ColumnProps<P>[]
) => {
  // 创建表格标题
  let _row = row;
  let colIdx = 1;
  const isChild = columns.some(
    (column) => column.title && column.children && column.children?.length > 0
  );

  columns.forEach((column) => {
    if (column.children) {
      if (column.title) {
        setColumn(ws, column, row, colIdx);
        ws.mergeCells(
          `${getColumnKey(colIdx, row)}:${getColumnKey(colIdx + column.children.length - 1, row)}`
        );
        _row = row + 1;
      }
      column.children.forEach((child) => {
        setColumn(ws, child, _row, colIdx);
        colIdx = colIdx + 1;
      });
    } else {
      setColumn(ws, column, row, colIdx);
      if (isChild) {
        ws.mergeCells(
          `${getColumnKey(colIdx, row)}:${getColumnKey(colIdx, row + 1)}`
        );
      }
      colIdx = colIdx + 1;
    }
  });
  return _row;
};
/**
 * 设置数据
 * @param ws
 * @param column
 * @param row
 * @param col
 * @param source
 * @param idx
 */
const setColumnValue = <P>(
  ws: Worksheet,
  column: ColumnProps<P>,
  row: number,
  col: number,
  source: P,
  idx: number
) => {
  const value = get(source, column.dataIndex);
  sheetCell(ws, row, col, {
    value: column.render
      ? column.render(value, source, idx)
      : get(source, column.dataIndex),
    style: column.style,
  });
};
/**
 * 填充数据
 * @param ws
 * @param row
 * @param columns
 * @param source
 * @returns
 */
export const createTableSource = <P>(
  ws: Worksheet,
  row: number,
  columns: ColumnProps<P>[],
  source: Array<P>
) => {
  let _row = row;

  source.forEach((item, idx) => {
    let colIdx = 1;
    columns.forEach((column) => {
      if (column.children) {
        column.children.forEach((child) => {
          setColumnValue(ws, child, _row, colIdx, item, idx);
          colIdx += 1;
        });
      } else {
        setColumnValue(ws, column, _row, colIdx, item, idx);
        colIdx += 1;
      }
    });
    _row += 1;
  });

  return _row;
};
