import ExcelJs from "exceljs";

const generate_lab_access_excel = async (data) => {
  const workbook = new ExcelJs.Workbook();
  const sheet = workbook.addWorksheet('lab_name');
  sheet.columns = [
    {header: 'Id', key: 'id', width: 10},
    {header: 'Student ID', key: 'student_id', width: 15},
    {header: 'Lab', key: 'lab', width: 15},
    {header: 'Entered At', key: 'date', width: 15},
  ];
  data.forEach((item) => {
      sheet.addRow(item);
  });

  sheet.getRow(1).eachCell((cell) => {
    cell.font = {bold: true};
  });

  return workbook;
}

export default generate_lab_access_excel;