import XLSX from 'xlsx'
const allTrim = require('all-trim')

// 获取标题行
function getHeaderRow (sheet) {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r
  for (C = range.s.c; C <= range.e.c; ++C) {
    var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    var hdr = 'UNKNOWN ' + C
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}

// 获取数组
function getArrData (excelData) {
  const workbook = XLSX.read(excelData, { type: 'array' })
  const firstSheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[firstSheetName]
  const columns = getHeaderRow(worksheet)
  const tableData = XLSX.utils.sheet_to_json(worksheet)

  return {
    columns: allTrim(columns, true),
    tableData: allTrim(tableData, true)
  }
}

function excel (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    reader.onerror = e => {
      reject(e)
    }
    reader.onload = e => {
      const excelData = e.target.result
      const arrData = getArrData(excelData)
      resolve(arrData)
    }
  })
}

export default excel
