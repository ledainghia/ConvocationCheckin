import React, { useEffect } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { bacheclorType } from 'src/typeofdata/bachelorType'
import { bachelorType } from 'src/configs/apiConfig'
interface ImportManualModalProps {
  open: boolean // Explicitly define the type of 'open' prop
  onClose: () => void
  onSubmit: (formData: bacheclorType) => void
  value: bacheclorType
}

export interface FormData {
  image: string
  fullName: string
  studentCode: string
  mail: string
  major: string
  hallName: string
  sessionNum: number
}
export default function UpdateBachelorModal({ open, onClose, onSubmit, value }: ImportManualModalProps) {
  const [formData, setFormData] = React.useState<bacheclorType>(value)
  console.log('formData', formData)
  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    onSubmit(formData)

    onClose()
  }
  useEffect(() => {
    setFormData(value)
  }, [value])

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4
        }}
      >
        <h2>Update Bachelor Information</h2>
        <form>
          <TextField
            fullWidth
            label='Image'
            name='image'
            value={formData.image}
            onChange={handleChange}
            margin='normal'
          />
          <TextField
            fullWidth
            label='Full Name'
            name='fullName'
            value={formData.fullName}
            onChange={handleChange}
            margin='normal'
          />
          <TextField
            fullWidth
            label='Student Code'
            name='studentCode'
            value={formData.studentCode}
            onChange={handleChange}
            margin='normal'
          />
          <TextField fullWidth label='Mail' name='mail' value={formData.mail} onChange={handleChange} margin='normal' />
          <TextField
            fullWidth
            label='Major'
            name='major'
            value={formData.major}
            onChange={handleChange}
            margin='normal'
          />
          <TextField
            fullWidth
            label='Hall Name'
            name='hallName'
            value={formData.hallName}
            onChange={handleChange}
            margin='normal'
          />
          <TextField
            fullWidth
            label='Session Number'
            name='sessionNum'
            value={formData.sessionNum}
            onChange={handleChange}
            margin='normal'
          />
          <Button variant='contained' color='primary' onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant='outlined' sx={{ ml: 5 }} color='primary' onClick={onClose}>
            Cancel
          </Button>
        </form>
      </Box>
    </Modal>
  )
}
