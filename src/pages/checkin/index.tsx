import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import SearchIcon from '@mui/icons-material/Search'
import {
  FormControlLabel,
  Grid,
  InputAdornment,
  Switch,
  SwitchProps,
  TableHead,
  TextField,
  styled
} from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { useTheme } from '@mui/material/styles'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useToastErrorStore, useToastSuccessStore, useToastWarningStore } from 'src/configs/ZustandStorage'
import { checkinAction, getListCheckin } from 'src/configs/apiConfig'

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

type CheckinData = {
  checkIn1: boolean
  checkIn2: boolean
  faculty: string | null
  fullName: string | null
  hallName: string | null
  id: number
  image: string | null
  mail: string | null
  major: string | null
  sessionNum: number | null
  status: boolean | null
  statusBaChelor: string | null
  studentCode: string
}
export default function Index() {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [rows, setRows] = useState<CheckinData[]>([])
  const [flagUpdate, setFlagUpdate] = useState(false)
  const { addToastError } = useToastErrorStore()
  const { addToastSuccess } = useToastSuccessStore()
  const { addToastWarning } = useToastWarningStore()
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
        if (status) addToastSuccess(`Checkin ${checkin} for ${studentCode} success`)
        else addToastWarning(`Uncheckin ${checkin} for ${studentCode} success`)
      }
    } catch (error) {
      addToastError(`Checkin ${checkin} for ${studentCode} fail`)
    }
  }

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(0) // Reset the page when searching
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
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

  return (
    <>
      <Grid item xs={12}>
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
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
              <TableHead>
                <TableRow>
                  <TableCell key={'0'} align={'left'}>
                    No
                  </TableCell>
                  <TableCell key={'1'} align={'left'}>
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
                  <TableCell key={6} align={'left'}>
                    Checkin1
                  </TableCell>
                  <TableCell key={7} align={'left'}>
                    Checkin2
                  </TableCell>
                  <TableCell key={7} align={'left'}>
                    Hall
                  </TableCell>
                  <TableCell key={7} align={'left'}>
                    Session
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
                  <TableRow key={row.id}>
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
                    <TableCell component='th' scope='row'>
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
                    <TableCell component='th' scope='row'>
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
                      {row.hallName}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row.sessionNum}
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
        </Paper>{' '}
      </Grid>
    </>
  )
}
