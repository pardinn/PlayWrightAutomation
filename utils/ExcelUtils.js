import ExcelJS from "exceljs";

/**
 * Writes to an Excel file by searching for a specific text and replacing the value in a cell relative to the found text.
 *
 * @param {string} searchText - The text to search for in the Excel file.
 * @param {string|number} replaceText - The text or number to replace the cell value with.
 * @param {Object} cellDelta - The row and column offset from the found text to the cell to be replaced.
 * @param {number} cellDelta.row - The row offset.
 * @param {number} cellDelta.column - The column offset.
 * @param {string} filePath - The path to the Excel file.
 * @returns {Promise<void>} A promise that resolves when the file has been written.
 */
async function writeExcel(searchText, replaceText, cellDelta, filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet("Sheet1");
  const output = await readExcel(worksheet, searchText);

  const cellToReplace = worksheet.getCell(
    output.row + cellDelta.row,
    output.column + cellDelta.column,
  );
  cellToReplace.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
}

/**
 * Reads an Excel worksheet and searches for a specific text.
 *
 * @param {ExcelJS.Worksheet} worksheet - The worksheet to read from.
 * @param {string} searchText - The text to search for in the worksheet.
 * @returns {Promise<Object>} A promise that resolves to an object containing the row and column of the found text.
 * @returns {number} output.row - The row number of the found text.
 * @returns {number} output.column - The column number of the found text.
 */
async function readExcel(worksheet, searchText) {
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

export default writeExcel;
