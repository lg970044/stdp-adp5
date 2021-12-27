import XLSX from 'xlsx';
import get from 'rc-util/es/utils/get';

const parseValueEnum = (value: any, valueEnum: any) => {
  return valueEnum[value] ? valueEnum[value]?.text || valueEnum[value] : value;
};

const parseColValue = (row: any, header: any) => {
  const value = Array.isArray(header.dataIndex)
    ? get(row, header.dataIndex)
    : row[header.dataIndex];
  return header?.valueEnum ? parseValueEnum(value, header.valueEnum) : value;
};

const ExportExcel = (columns: any[], rows: any[], fileName = 'export.xlsx') => {
  const headers = columns.filter((col) => col?.hideInTable != true && col?.valueType != 'option');
  const datas = rows.map((row) => headers.map((header) => parseColValue(row, header)));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([headers.map((header) => header?.title), ...datas]);
  XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');

  // 导出 Excel
  XLSX.writeFile(wb, fileName);
};

export default ExportExcel;
