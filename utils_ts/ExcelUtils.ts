import ExcelJS from "exceljs";

export async function writeExcel(
  searchText: string,
  replaceText: string | number,
  cellDelta: { row: number; column: number },
  filePath: string
) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");
  const output = await readExcel(worksheet!, searchText);

  const cellToReplace = worksheet!.getCell(output.row + cellDelta.row, output.column + cellDelta.column);
  cellToReplace.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

async function readExcel(worksheet: ExcelJS.Worksheet, searchText: string) {
  const output = { row: -1, column: -1 };
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.column = colNumber;
      }
    });
  });
  return output;
}
