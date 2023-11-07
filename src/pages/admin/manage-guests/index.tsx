import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '@mui/icons-material/Delete'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import SearchIcon from '@mui/icons-material/Search'
import {
  Button,
  FormControlLabel,
  Grid,
  InputAdornment,
  Paper,
  Switch,
  SwitchProps,
  TableHead,
  TextField,
  styled
} from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useTheme } from '@mui/material/styles'
import * as React from 'react'
import { useEffect } from 'react'
import { useBachelorChangeStore } from 'src/configs/ZustandStorage'
import { addBachelor, bachelorType, checkinAction, getListCheckin, updateBachelor } from 'src/configs/apiConfig'
import { bacheclorType } from 'src/typeofdata/bachelorType'
import FileUploadModal from 'src/views/manageCom/FileUploadModal'
import ImportManualModal from 'src/views/manageCom/ImportManualModal'
import UpdateBachelorModal from 'src/views/manageCom/UpdateBachelorModal'
import * as XLSX from 'xlsx'

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label='first page'>
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label='previous page'>
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='last page'
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

export const expectedHeaders = ['No', 'Image', 'Full Name', 'Student ID', 'Mail', 'Major', 'Hall', 'Session']

export default function TableComponent() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [rows, setRows] = React.useState<bacheclorType[]>([])
  const [flagUpdate, setFlagUpdate] = React.useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getListCheckin()
        console.log(response.data.data.$values)
        setRows(response.data.data.$values)
        setFlagUpdate(false)
      } catch (error) {
        // Handle the error here
        console.error(error)
      }
    }

    fetchData()
  }, [flagUpdate])

  const handleCheckinToggle = async (studentCode: string, checkin: string, status: boolean) => {
    try {
      const response = await checkinAction({ studentCode, checkin, status })
      console.log(response)
      if (response.status === 200) {
        setFlagUpdate(true)
      }
    } catch (error) {}
  }
  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(0) // Reset the page when searching
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,

    newPage: number
  ) => {
    console.log(event)
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5
        }
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff'
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
      }
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500
      })
    }
  }))

  const downloadSampleFile = () => {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet([expectedHeaders])
    XLSX.utils.book_append_sheet(wb, ws, 'SampleSheet')
    XLSX.writeFile(wb, 'sample_file.xlsx')
  }

  const [modalOpen, setModalOpen] = React.useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const handleManualImport = (formData: any) => {
    const fetchData = async () => {
      try {
        const bachelor: bachelorType[] = []
        bachelor.push({
          major: formData.major,
          image: formData.image,
          fullName: formData.fullName,
          studentCode: formData.studentCode,
          mail: formData.mail,
          hallName: formData.hallName,
          sessionNum: formData.sessionNum,
          chair: formData.chair,
          chairParent: formData.chairParent
        })
        const response = await addBachelor(bachelor)
        console.log('addBachelor', response)
      } catch (error) {
        // Handle the error here
        console.error(error)
      }
    }

    fetchData()

    console.log('Form data submitted:', formData)
  }

  const [openModal2, setOpenModal2] = React.useState(false)
  const [modalOpenChangeInfo, setModalOpenChangeInfo] = React.useState(false)

  const { bachelorInfo, setBachelorInfo } = useBachelorChangeStore()

  const handleOpenModalChangeInfo = (bachelor: bacheclorType) => {
    setModalOpenChangeInfo(true)
    console.log('bachelor', bachelor)
    setBachelorInfo(bachelor)
  }
  const handleCloseModalChangeInfo = () => {
    setBachelorInfo({
      checkIn1: false,
      checkIn2: false,
      TYPE: 'CURRENT',
      studentCode: '',
      fullName: null,
      hallName: null,
      id: 0,
      image: null,
      mail: null,
      major: null,
      sessionNum: 0,
      status: null,
      statusBaChelor: null,
      chair: null,
      chairParent: null
    })
    setModalOpenChangeInfo(false)
  }

  // const handleOpenModalDelete = ({ bachelor }: ChangeBaProps) => {
  //   setBachelorDeleteInfo(bachelor)
  //   setModalOpenDelete(true)
  // }
  // const handleCloseModalDelete = () => {
  //   setBachelorDeleteInfo({
  //     checkIn1: false,
  //     checkIn2: false,
  //     TYPE: 'CURRENT',
  //     studentCode: '',
  //     fullName: null,
  //     hallName: null,
  //     id: 0,
  //     image: null,
  //     mail: null,
  //     major: null,
  //     sessionNum: 0,
  //     status: null,
  //     statusBaChelor: null,
  //     chair: null,
  //     chairParent: null
  //   })
  //   setModalOpenDelete(false)
  // }

  const handleOpenModal2 = () => {
    setOpenModal2(true)
  }

  const handleCloseModal2 = () => {
    setOpenModal2(false)
  }
  function handleSubmitChangeInfo(formData: bacheclorType): void {
    updateBachelor(formData)
      .then(res => {
        console.log(res)
        setFlagUpdate(true)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>
            <Button variant='contained' onClick={handleOpenModal}>
              Import Manual
            </Button>
            <Button style={{ marginLeft: '10px' }} variant='contained' onClick={handleOpenModal2}>
              Import with File Excel
            </Button>
            <Button variant='outlined' onClick={downloadSampleFile} style={{ marginLeft: '10px' }}>
              Download Sample File
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={12} mt={6}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <TextField
            id='search'
            label='Search'
            value={searchTerm}
            onChange={handleChangeSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{ mb: 2 }}
          />
          <TableContainer component={'div'}>
            <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
              <TableHead>
                <TableRow>
                  <TableCell key={0} align={'left'}>
                    No
                  </TableCell>
                  <TableCell key={1} align={'left'}>
                    Image
                  </TableCell>
                  <TableCell key={2} align={'left'}>
                    Full Name
                  </TableCell>
                  <TableCell key={3} align={'left'}>
                    Student ID
                  </TableCell>
                  <TableCell key={4} align={'left'}>
                    Mail
                  </TableCell>
                  <TableCell key={5} align={'left'}>
                    Major
                  </TableCell>
                  <TableCell key={6} align={'center'}>
                    Checkin1
                  </TableCell>
                  <TableCell key={7} align={'center'}>
                    Checkin2
                  </TableCell>
                  <TableCell key={8} align={'left'}>
                    Edit
                  </TableCell>
                  <TableCell key={9} align={'left'}>
                    Hall
                  </TableCell>
                  <TableCell key={10} align={'right'}>
                    Session
                  </TableCell>
                  <TableCell key={11} align={'left'}>
                    Chair
                  </TableCell>
                  <TableCell key={12} align={'left'}>
                    Chair Parent
                  </TableCell>
                  <TableCell key={13} align={'left'}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0 && rows.length > 0
                  ? rows
                      .filter(
                        row =>
                          row.studentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          row.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : rows
                ).map(row => (
                  <TableRow key={row.studentCode}>
                    <TableCell component='th' scope='row'>
                      {row.id}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.image}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.fullName}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.studentCode}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.mail}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.major}
                    </TableCell>
                    <TableCell component='th' scope='row' align={'center'}>
                      <FormControlLabel
                        control={
                          <IOSSwitch
                            sx={{ m: 1 }}
                            checked={row.checkIn1}
                            onClick={() => handleCheckinToggle(row.studentCode, '1', !row.checkIn1)}
                          />
                        }
                        label=''
                      />
                    </TableCell>
                    <TableCell component='th' scope='row' align={'center'}>
                      <FormControlLabel
                        control={
                          <IOSSwitch
                            sx={{ m: 1 }}
                            checked={row.checkIn2}
                            onClick={() => handleCheckinToggle(row.studentCode, '2', !row.checkIn2)}
                          />
                        }
                        label=''
                      />
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      <div className='flex-inline'>
                        <DeleteIcon />
                        <BorderColorIcon onClick={() => handleOpenModalChangeInfo(row)} />
                      </div>
                    </TableCell>
                    <TableCell component='th' scope='row' align={'center'}>
                      {row.hallName}
                    </TableCell>
                    <TableCell component='th' scope='row' align={'center'}>
                      {row.sessionNum}
                    </TableCell>
                    <TableCell component='th' scope='row' align={'left'}>
                      {row.chair}
                    </TableCell>
                    <TableCell component='th' scope='row' align={'left'}>
                      {row.chairParent}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.statusBaChelor}
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        'aria-label': 'rows per page'
                      },
                      native: true
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      <FileUploadModal open={openModal2} onClose={handleCloseModal2} />
      <ImportManualModal open={modalOpen} onClose={handleCloseModal} onSubmit={handleManualImport} />
      <UpdateBachelorModal
        onSubmit={handleSubmitChangeInfo}
        onClose={handleCloseModalChangeInfo}
        open={modalOpenChangeInfo}
        value={bachelorInfo}
      />
    </>
  )
}
