// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import { Alert, AlertTitle, Button, ButtonGroup } from '@mui/material'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import { useFlagStore, useHallSessionStore, useToastErrorStore } from 'src/configs/ZustandStorage'
import { getBachelor1st, getBachelorBack, getBachelorCurrent, getBachelorNext } from 'src/configs/apiConfig'
import { bacheclorType } from 'src/typeofdata/bachelorType'
import CardForBackBachelor from 'src/views/mc-controller/CardForBackBachelor'
import ChoiceHallAndSession from 'src/views/share-cpn/choiceHallAndSession'

type ListBachelor = [bacheclorType | '', bacheclorType | '', bacheclorType | '']

const MCcontroller = () => {
  const { hall, session } = useHallSessionStore()
  const { flagUpdateData, setFlagUpdateData } = useFlagStore()
  const [listBachelor, setListBachelor] = useState<ListBachelor | null>(null)
  const [buttonBack, setButtonBack] = useState<boolean>(false)
  const [buttonNext, setButtonNext] = useState<boolean>(false)
  const { addToastError } = useToastErrorStore()
  const fetchDataBachelor1st = async () => {
    if (hall && session) {
      try {
        const response = await getBachelor1st(hall, parseInt(session))
        console.log('getBachelor1st', response)
        setFlagUpdateData(true)
      } catch (error) {
        // Handle the error here
        console.error(error)
        setListBachelor(null)
        addToastError('No data in this session and hall')
      }
    }
  }

  useEffect(() => {
    console.log('flagUpdateData', flagUpdateData)
    console.log('hall', hall)
    console.log('session', session)
    if (hall && session && flagUpdateData) {
      const fetchData = async () => {
        try {
          const response = await getBachelorCurrent(hall, parseInt(session))
          console.log('getBachelorCurrent', response)
          const bachelor1: bacheclorType | '' = response.data.data.bachelor1
          const bachelor2: bacheclorType | '' = response.data.data.bachelor2
          const bachelor3: bacheclorType | '' = response.data.data.bachelor3
          const listBachelor: ListBachelor = [bachelor1, bachelor2, bachelor3]
          console.log(response.data.message === 'First bachelor')
          if (response.data.message === 'CURRENT IS IN THE FIRST OF INDEX') setButtonBack(true)
          else setButtonBack(false)

          if (response.data.message === 'CURRENT IS IN THE LAST OF INDEX') setButtonNext(true)
          else setButtonNext(false)
          if (listBachelor[1] !== '') {
            listBachelor[1].TYPE = 'CURRENT'
          }
          if (listBachelor[2] !== '') {
            listBachelor[2].TYPE = 'NEXT'
          }
          if (listBachelor[0] !== '') {
            listBachelor[0].TYPE = 'BACK'
          }
          console.log('listBachelor', listBachelor)
          setListBachelor(listBachelor)
          setFlagUpdateData(false)
        } catch (error) {
          // Handle the error here
          console.error(error)
          fetchDataBachelor1st()
          setFlagUpdateData(false)
        }
      }

      fetchData()
    }
  }, [flagUpdateData])
  const onBack = () => {
    const fetchData = async () => {
      if (hall && session) {
        try {
          const response = await getBachelorBack(hall, parseInt(session))
          console.log('getBachelorBack', response)
          setFlagUpdateData(true)
        } catch (error) {
          // Handle the error here
          console.error(error)
        }
      }
    }
    fetchData()
  }

  const onNext = () => {
    const fetchData = async () => {
      if (hall && session) {
        try {
          const response = await getBachelorNext(hall, parseInt(session))
          console.log('getBachelorNext', response)
          setFlagUpdateData(true)
        } catch (error) {
          // Handle the error here
          console.error(error)
        }
      }
    }
    fetchData()
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Mc controller</Typography>
      </Grid>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <ChoiceHallAndSession></ChoiceHallAndSession>
      </Grid>
      {listBachelor && (
        <Grid item xs={4} sm={4} md={4}>
          <CardForBackBachelor backBachelor={listBachelor[0]} />
        </Grid>
      )}

      {listBachelor && (
        <Grid item xs={4} sm={4} md={4}>
          <CardForBackBachelor backBachelor={listBachelor[1]} />
        </Grid>
      )}
      {listBachelor && (
        <Grid item xs={4} sm={4} md={4}>
          <CardForBackBachelor backBachelor={listBachelor[2]} />
        </Grid>
      )}
      {!listBachelor ? (
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Alert severity='warning' sx={{ '& a': { fontWeight: 400 } }} action={<></>}>
            <AlertTitle>You should config Hall and Session first</AlertTitle>
          </Alert>
        </Grid>
      ) : null}
      <Grid item xs={12} mt={5}>
        <ButtonGroup
          variant='contained'
          sx={{ display: 'flex', justifyContent: 'center', background: 'transparent', boxShadow: 'none' }}
          aria-label='outlined primary button group'
        >
          <Button disabled={buttonBack} variant='outlined' sx={{ width: '90px' }} onClick={onBack}>
            BACK
          </Button>
          <TextField
            disabled
            label={listBachelor && listBachelor[1] !== '' ? '' : 'STUDENT CODE CURRENT'}
            InputLabelProps={{ style: { textAlign: 'center' } }}
            inputProps={{ style: { textAlign: 'center' } }}
            value={listBachelor && listBachelor[1] !== '' ? listBachelor[1].studentCode : ''}
            variant='outlined'
          />
          <Button disabled={buttonNext} variant='outlined' sx={{ width: '90px' }} onClick={onNext}>
            NEXT
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}

export default MCcontroller
