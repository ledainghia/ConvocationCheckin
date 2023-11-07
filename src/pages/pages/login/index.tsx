// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiCard, { CardProps } from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Icons Imports
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import { FormHelperText } from '@mui/material'
import { useToastErrorStore, useToastSuccessStore } from 'src/configs/ZustandStorage'
import { login } from 'src/configs/apiConfig'

interface State {
  password: string
  showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LoginPage = () => {
  // ** State
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  })
  const [username, setUsername] = useState<string>('')
  const { addToastError } = useToastErrorStore()
  const { addToastSuccess } = useToastSuccessStore()

  // ** Hook

  const router = useRouter()

  const [error, setError] = useState<string>('')
  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const password = values.password
    const user = {
      userId: username,
      password: password
    }
    const submitLogin = async () => {
      try {
        const res = await login(user)
        if (res.status === 200) {
          console.log('login success', res.data)
          localStorage.setItem('accessToken', res.data.accessToken)
          addToastSuccess('Login success')
          router.push('/')
        }
      } catch (error: any) {
        if (error.response && error.response.data) {
          addToastError('Login Fail')
          setError('Invalid username or password')
          console.log('error', error.response.data)
        }
      }
    }

    submitLogin()
    console.log('login', username, ' ', password)
  }

  function handleChangeUsername(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setUsername(event.target.value)
  }

  return (
    <Box
      className='content-center'
      sx={{
        backgroundImage: `url("https://cdn.dribbble.com/users/1803473/screenshots/6149175/media/7f9a278ce20283c6fbbc6f4d9e34d3cc.gif")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}></Box>
          <Box sx={{ mb: 6 }}>
            <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
              Welcome to {themeConfig.templateName}! 👋🏻
            </Typography>
            <Typography variant='body2'>Please sign-in to your account and start the adventure</Typography>
          </Box>
          <form autoComplete='off' onSubmit={handleLogin}>
            <TextField
              onChange={handleChangeUsername}
              error={error !== ''}
              autoFocus
              fullWidth
              id='email'
              label='Email'
              sx={{ marginBottom: 4 }}
            />
            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel htmlFor='auth-login-password'>Password</InputLabel>
              <OutlinedInput
                label='Password'
                error={error !== ''}
                value={values.password}
                id='auth-login-password'
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      edge='end'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label='toggle password visibility'
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText sx={{ color: 'red' }}>{error}</FormHelperText>
            </FormControl>

            <Button fullWidth type='submit' size='large' variant='contained' sx={{ marginBottom: 7 }}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* <FooterIllustrationsV1 /> */}
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
