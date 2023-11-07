import React, { useState } from 'react'
import { Button, Dialog, DialogContent, Autocomplete, TextField, DialogTitle, DialogActions } from '@mui/material'
import { useFlagStore, useHallSessionStore, useShowLedStore } from 'src/configs/ZustandStorage'

export default function ChoiceHallAndSession() {
  const [open, setOpen] = useState(false)
  const { hall, session, setHall, setSession } = useHallSessionStore()
  const { setFlagUpdateData } = useFlagStore()
  const { setShowLed } = useShowLedStore()
  const handleHallChange = (event: React.SyntheticEvent, value: string | null) => {
    setHall(value)
    if (hall && value) {
      sessionStorage.setItem('selectedHall', hall)
      sessionStorage.setItem('selectedSession', value)
    }
  }

  const handleSessionChange = (event: React.SyntheticEvent, value: string | null) => {
    setSession(value)
    if (hall && value) {
      sessionStorage.setItem('selectedHall', hall)
      sessionStorage.setItem('selectedSession', value)
    }
  }

  const handleOpenDialog = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const handleSaveToSessionStorage = () => {
    if (hall && session) {
      sessionStorage.setItem('selectedHall', hall)
      sessionStorage.setItem('selectedSession', session)
      setShowLed(true)
      setFlagUpdateData(true)
    }
    handleCloseDialog()
  }

  return (
    <div>
      <Button variant='contained' onClick={handleOpenDialog}>
        Config Hall and Session
      </Button>
      <Dialog open={open} onClose={handleCloseDialog} fullScreen>
        <DialogTitle> Config Hall and Session</DialogTitle>
        <DialogContent>
          <Autocomplete
            fullWidth
            id='hall-autocomplete'
            options={['B', 'C']}
            value={hall}
            onChange={handleHallChange}
            renderInput={params => <TextField {...params} sx={{ mt: 8 }} label='Select Hall' />}
          />
          <Autocomplete
            fullWidth
            id='session-autocomplete'
            options={['1', '2', '3', '4', '5', '6']}
            value={session}
            onChange={handleSessionChange}
            renderInput={params => <TextField {...params} sx={{ mt: 6 }} label='Select Session' />}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSaveToSessionStorage}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
