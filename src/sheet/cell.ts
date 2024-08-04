import { Worksheet } from 'exceljs';
import { Cell } from './sheet';
/**
 * 单元格信息设置
 * @param ws
 * @param row
 * @param col
 * @param cellProps
 */
export const sheetCell = (
  ws: Worksheet,
  row: number,
  col: number,
  cellProps: Cell
) => {
  const currentCell = ws.getCell(row, col);
  const { value, style } = cellProps;
  if (value) {
    currentCell.value = value;
  }
  if (style) {
    currentCell.style = style;
  }

  //   currentCell
};
