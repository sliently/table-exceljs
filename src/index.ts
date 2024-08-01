import excel from 'exceljs';
import { createSheet, Sheet } from './sheet';

interface ITableToExcel<P = unknown> {
  sheet: Sheet<P>;
  source: P[];
  options?: {
    onRow: (
      row: P,
      index: number
    ) => {
      height: number;
    };
  };
}

export const tableToExcel = (list: ITableToExcel[]) => {
  // 创建excel
  const wb = new excel.Workbook();
  list.forEach((item) => {
    const { sheet, source, options } = item;
    createSheet(wb, sheet, source, options);
  });

  wb.xlsx.writeFile('output.xlsx');
  return wb;
};
