import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import React from 'react'
import { bacheclorType } from 'src/typeofdata/bachelorType'
type Props = {
  backBachelor: bacheclorType | ''
}
const CardForBackBachelor = ({ backBachelor }: Props) => {
  return backBachelor ? (
    <Card sx={{ backgroundColor: backBachelor.TYPE === 'CURRENT' ? '#fff2e2' : '' }}>
      <CardMedia sx={{ height: '14.5625rem' }} image={`${backBachelor.image}`} />
      <CardContent
        sx={{
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Typography variant='h6' sx={{ marginBottom: 2 }}>
          {backBachelor.fullName} <br /> --{backBachelor.TYPE}--
        </Typography>
        <Typography variant='body2'>{backBachelor.studentCode}</Typography>
        <Typography variant='body2'>{backBachelor.mail}</Typography>
        <Typography variant='body2'>{backBachelor.major}</Typography>
      </CardContent>
    </Card>
  ) : (
    <></>
  )
}
export default CardForBackBachelor
