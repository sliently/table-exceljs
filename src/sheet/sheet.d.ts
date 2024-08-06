import { Alignment, CellValue, Style } from 'exceljs';

export interface ColumnStyle {
  color?: string; // 字体颜色
  bgColor?: string; // 背景颜色
  alignment?: Partial<Alignment>;
}

export interface Cell {
  value?: CellValue;
  numFmt?: string | boolean;
  style?: Partial<Style>;
}

/**
 * 头部
 */
export interface Header {
  height?: number;
  name?: string;
  style?: Partial<Style>;
}

export type SheetHeader = Header[] | Header | string;

/**
 * 列规则
 */
export interface ColumnProps<P> {
  title: string;
  dataIndex: string;
  key?: string;
  width?: number;
  numFmt?: string | boolean;
  style?: Partial<Style>;
  render?: (value: any, record: P, index: number) => unknown;
  multiple?: 'row'; // 合并列
  children?: ColumnProps<P>[];
}

export interface Sheet<P> {
  name: string; // sheet名称
  header: SheetHeader;
  columns: ColumnProps<P>[];
}
