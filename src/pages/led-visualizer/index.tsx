// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import { HubConnectionBuilder } from '@microsoft/signalr'
import { Alert, AlertTitle, Modal } from '@mui/material'
import { useEffect, useState } from 'react'
import { useFlagStore, useHallSessionStore, useToastErrorStore } from 'src/configs/ZustandStorage'
import { bachelorType, getBachelor1st, getBachelorCurrent } from 'src/configs/apiConfig'
import { bacheclorType } from 'src/typeofdata/bachelorType'
import ChoiceHallAndSession from 'src/views/share-cpn/choiceHallAndSession'

type ListBachelor = [bacheclorType | '', bacheclorType | '', bacheclorType | '']

const LedVisual = () => {
  const { hall, session } = useHallSessionStore()
  const { flagUpdateData, setFlagUpdateData } = useFlagStore()
  const [listBachelor, setListBachelor] = useState<ListBachelor | null>(null)

  const [bachelor, setBachelor] = useState<bachelorType | null>(null)
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
        setFlagUpdateData(false)
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

          console.log('listBachelor', listBachelor)
          setListBachelor(listBachelor)
          setFlagUpdateData(false)
        } catch (error) {
          // Handle the error here
          console.error(error)
          fetchDataBachelor1st()
          setFlagUpdateData(true)
        }
      }

      fetchData()
    }
  }, [flagUpdateData, hall, session, setFlagUpdateData])

  useEffect(() => {
    // Khởi tạo kết nối SignalR
    const connection = new HubConnectionBuilder()
      .withUrl('http://34.101.208.146:82/chat-hub') // Thay thế bằng URL của máy chủ SignalR của bạn
      .withAutomaticReconnect()
      .build()
    async function startSignalRConnection() {
      // Bắt đầu kết nối SignalR
      connection
        .start()
        .then(() => {
          console.log('SignalR connection started.')
        })
        .catch(error => {
          console.error('Error starting SignalR connection:', error)
        })

      // Xử lý sự kiện từ máy chủ SignalR
      const message = connection.on('SendMessage', message => {
        console.log(message.slice(16))
        const keyValuePairs: { [key: string]: any } = {}
        message
          .slice(16)
          .split(', ')
          .forEach((pair: { split: (arg0: string) => [any, any] }) => {
            const [key, value] = pair.split(' = ')
            keyValuePairs[key] = value
          })

        // Bước 2: Xử lý các giá trị đặc biệt (boolean, null) nếu cần
        if (keyValuePairs['Status'] === 'True') {
          keyValuePairs['Status'] = true
        } else if (keyValuePairs['Status'] === 'False') {
          keyValuePairs['Status'] = false
        }

        if (keyValuePairs['Image'] === 'null') {
          keyValuePairs['Image'] = null
        }

        // Bước 3: Bạn có thể sử dụng keyValuePairs trong ứng dụng React của bạn
        console.log(keyValuePairs)
        const bachelorData: bachelorType = {
          image: keyValuePairs['Image'],
          fullName: keyValuePairs['FullName'],
          major: keyValuePairs['Major'],
          studentCode: keyValuePairs['StudentCode'],
          mail: keyValuePairs['Mail'],
          hallName: keyValuePairs['HallName'],
          sessionNum: parseInt(keyValuePairs['SessionNum']),
          chair: keyValuePairs['Chair'],
          chairParent: keyValuePairs['ChairParent']
        }
        const session = sessionStorage.getItem('selectedSession')
        const hall = sessionStorage.getItem('selectedHall')
        console.log('selectedHall', hall, 'selectedSession', session)
        if (session && hall && bachelorData.sessionNum === parseInt(session) && bachelorData.hallName === hall)
          setBachelor(bachelorData)
      })
      console.log('message', message)
    }

    startSignalRConnection()

    // Làm sạch kết nối khi component bị hủy
    return () => {
      connection.stop()
    }
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <Typography variant='h5'>Led Visual</Typography>
      </Grid>
      <Grid item xs={12} sx={{ paddingBottom: 4 }}>
        <ChoiceHallAndSession></ChoiceHallAndSession>
      </Grid>

      {!listBachelor ? (
        <Grid item xs={12} sx={{ mb: 3 }}>
          <Alert severity='warning' sx={{ '& a': { fontWeight: 400 } }} action={<></>}>
            <AlertTitle>You should config Hall and Session first</AlertTitle>
          </Alert>
        </Grid>
      ) : (
        <>
          <Modal open={true}>
            <div style={{ backgroundColor: 'black', height: '100vh', width: '100%' }}>
              <img style={{ height: '100vh', width: '100%' }} src={`${bachelor?.image}`} />
            </div>
          </Modal>
        </>
      )}
    </Grid>
  )
}

export default LedVisual
