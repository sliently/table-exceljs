/**
 * 列规则
 */
export interface ColumnProps<P> {
  title: string;
  dataIndex: string;
  key?: string;
  width?: number;
  color?: string; // 字体颜色i
  bgColor?: string; // 背景颜色
  render?: (value: any, record: P, index: number) => unknown;
  multiple?: boolean; // 合并列
  children?: ColumnProps<P>[];
  //   align?: 'left' | 'right' | 'center';
}
