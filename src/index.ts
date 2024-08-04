import excel from 'exceljs';
import { createSheet, Sheet } from './sheet';

export const tableToExcel = <P>(
  sheet: Sheet<P>,
  sources: Array<P>,
  options?: {
    filename?: string;
  }
) => {
  const { filename } = options ?? {};
  // 创建excel
  const wb = new excel.Workbook();
  createSheet(wb, sheet, sources);
  if (filename) {
    wb.xlsx.writeFile(`${filename}.xlsx`);
    return wb;
  }
  return wb.xlsx.writeBuffer();
};
