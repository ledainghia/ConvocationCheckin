import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import { addBachelor, bachelorType } from 'src/configs/apiConfig'

interface FileUploadModalProps {
  open: boolean
  onClose: () => void
}

export const expectedHeaders = [
  'No',
  'Image',
  'Full Name',
  'Student ID',
  'Mail',
  'Major',
  'Hall',
  'Session',
  'LocationBachelor',
  'LocationParent'
]

const FileUploadModal: React.FC<FileUploadModalProps> = ({ open, onClose }) => {
  const [excelData, setExcelData] = useState<any[] | null>(null)
  const [headerValid, setHeaderValid] = useState<boolean | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        const content = e.target?.result as ArrayBuffer
        const workbook = XLSX.read(content, { type: 'array' })

        // Assuming there's only one sheet in the Excel file
        const sheetName = workbook.SheetNames[0]
        const sheet = workbook.Sheets[sheetName]

        // Convert the sheet to an array of objects
        const jsonData = XLSX.utils.sheet_to_json(sheet, {
          header: 1
        }) as any[] // Explicitly cast to any[]

        // Check if the header matches the expected format
        const headerRow = jsonData[0]
        const isHeaderValid = expectedHeaders.every((header, index) => headerRow[index] === header)

        if (isHeaderValid) {
          setHeaderValid(true)

          setExcelData(jsonData)
          console.log('jsonData', jsonData)
        } else {
          setHeaderValid(false)
          setExcelData(null)
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  const handleSubmit = () => {
    excelData && console.log(excelData)

    const fetchData = async () => {
      try {
        const bachelor: bachelorType[] = []
        excelData && excelData.shift()
        excelData &&
          excelData.map(row =>
            bachelor.push({
              major: row[5],
              image: row[1],
              fullName: row[2],
              studentCode: row[3],
              mail: row[4],
              hallName: row[6],
              sessionNum: row[7],
              chair: row[8].toString(),
              chairParent: row[9]
            })
          )
        console.log('bachelor', bachelor)
        const response = await addBachelor(bachelor)
        console.log('addBachelor', response)
      } catch (error) {
        // Handle the error here
        console.error(error)
      }
    }

    fetchData()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Upload Excel File</DialogTitle>
      <DialogContent>
        <input type='file' accept='.xlsx' onChange={handleFileChange} />
        {excelData && headerValid ? (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {excelData[0].map(
                    (
                      header:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | null
                        | undefined,
                      index: React.Key | null | undefined
                    ) => (
                      <TableCell key={index}>{header}</TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {excelData.slice(1).map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map(
                      (
                        cell:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                          | Iterable<React.ReactNode>
                          | React.ReactPortal
                          | null
                          | undefined,
                        cellIndex: React.Key | null | undefined
                      ) => (
                        <TableCell key={cellIndex}>{cell}</TableCell>
                      )
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : headerValid === false ? (
          <p>Header is not in the expected format. Expected Headers: {expectedHeaders.join(', ')}</p>
        ) : (
          <p>No valid data to display.</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={handleSubmit} style={{ marginRight: '10px' }}>
          Submit
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FileUploadModal
