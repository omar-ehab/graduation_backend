import ExcelJs from "exceljs";

const formatDate = (date) => {
  return date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
}

const generate_attendance_excel = async (data) => {
  const workbook = new ExcelJs.Workbook();
  const worksheet = workbook.addWorksheet('My Lecture Attendance');
  worksheet.columns = [
      {header: 'Student ID', key: 'student_id', width: 15},
      {header: 'Student Name', key: 'student_name', width: 15},
      {header: 'Attended At', key: 'date', width: 15},
  ];

  data.forEach(record => {
    worksheet.addRow({
      student_id: record.student_id,
      student_name: record.student_name,
      date: formatDate(new Date(record.date)),
    });
  });

  worksheet.getRow(1).eachCell((cell) => {
      cell.font = {bold: true};
  });

  return workbook;
}


export default generate_attendance_excel;