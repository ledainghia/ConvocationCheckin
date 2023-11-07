import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { Button, Divider, Grid, InputAdornment, Paper, Stack, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import React from 'react'
import { useToastErrorStore } from 'src/configs/ZustandStorage'
import { getSeatLocation } from 'src/configs/apiConfig'
import { bacheclorType } from 'src/typeofdata/bachelorType'

export default function Index() {
  const [searchTerm, setSearchTerm] = React.useState('')
  const { addToastError } = useToastErrorStore()
  const [bachelor, setBachelor] = React.useState<bacheclorType | null>(null)
  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }
  const handleSubmitSearch = async () => {
    const fetchSearch = async () => {
      try {
        const res = await getSeatLocation(searchTerm)
        if (res.status === 200) {
          console.log(res.data)
          if (res.data.message === `Bachelor does not Checkin1. Please checkin`) {
            addToastError(`Bachelor ${searchTerm} does not Checkin1. Please checkin`)
          }
          if (res.data.message === 'Bachelor does not Checkin2. Please checkin') {
            addToastError(`Bachelor ${searchTerm} does not Checkin2. Please checkin`)
          }
          if (res.data.message === 'Bachelor does not Checkin. Please checkin') {
            addToastError(`Bachelor ${searchTerm} does not Checkin. Please checkin`)
          }
          if (res.data.message === 'Location of bachelor') {
            setBachelor(res.data.data)
          }
        }
      } catch (error) {
        console.log(error)
        addToastError(`Bachelor ${searchTerm} does not exist`)
      }
    }
    await fetchSearch()
    console.log(searchTerm)
  }
  const clearSearch = () => {
    setSearchTerm('')
  }

  return (
    <Grid container spacing={10}>
      <Grid item xs={12}>
        <Paper sx={{ p: 5, display: 'flex', flexDirection: 'column' }}>
          <TextField
            id='search'
            label='Search'
            value={searchTerm}
            placeholder='Find the seat location by Student ID'
            onChange={handleChangeSearch}
            InputProps={{
              startAdornment: (
                <>
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                </>
              ),
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={clearSearch}
                    edge='start'
                    style={{ visibility: searchTerm ? 'visible' : 'hidden' }}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            sx={{ mb: 2 }}
          />
          <Button variant='contained' color='primary' onClick={() => handleSubmitSearch()}>
            Search
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {bachelor && (
          <Paper sx={{ p: 5, display: 'flex', flexDirection: 'column' }}>
            <Stack>
              <h3>Student Code: {bachelor.studentCode}</h3>
              <Divider></Divider>
              <h3>Student Name: {bachelor.fullName}</h3>
              <Divider></Divider>
              <h3>Hall: {bachelor.hallName}</h3>
              <Divider></Divider>
              <h3>Session: {bachelor.sessionNum}</h3>
              <Divider></Divider>
              <h3>Seat: {bachelor.chair}</h3>
              <Divider></Divider>
              <h3>Parent Seat: {bachelor.chairParent}</h3>
            </Stack>
          </Paper>
        )}
      </Grid>
    </Grid>
  )
}
