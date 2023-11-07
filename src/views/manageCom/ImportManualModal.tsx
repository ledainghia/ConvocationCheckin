import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
interface ImportManualModalProps {
  open: boolean // Explicitly define the type of 'open' prop
  onClose: () => void
  onSubmit: (formData: FormData) => void
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
export default function ImportManualModal({ open, onClose, onSubmit }: ImportManualModalProps) {
  const [formData, setFormData] = React.useState({
    image: '',
    fullName: '',
    studentCode: '',
    mail: '',
    major: '',
    hallName: '',
    sessionNum: 0
  })

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    onSubmit(formData)
    setFormData({
      image: '',
      fullName: '',
      studentCode: '',
      mail: '',
      major: '',
      hallName: '',
      sessionNum: 0
    })
    onClose()
  }

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
        <h2>Import Manual</h2>
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
        </form>
      </Box>
    </Modal>
  )
}
