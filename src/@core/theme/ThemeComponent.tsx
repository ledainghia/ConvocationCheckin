// ** React Imports
import { ReactNode, useEffect } from 'react'

// ** MUI Imports
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'

// ** Type Imports
import { Settings } from 'src/@core/context/settingsContext'

// ** Theme Config
import themeConfig from 'src/configs/themeConfig'

// ** Theme Override Imports
import overrides from './overrides'
import typography from './typography'

// ** Theme
import themeOptions from './ThemeOptions'

// ** Global Styles
import GlobalStyling from './globalStyles'
import {
  useToastErrorStore,
  useToastSuccessStore,
  useToastWarningStore,
  useToastInfoStore
} from 'src/configs/ZustandStorage'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
interface Props {
  settings: Settings
  children: ReactNode
}

const ThemeComponent = (props: Props) => {
  // ** Props
  const { settings, children } = props

  // ** Merged ThemeOptions of Core and User
  const coreThemeConfig = themeOptions(settings)

  // ** Pass ThemeOptions to CreateTheme Function to create partial theme without component overrides
  let theme = createTheme(coreThemeConfig)

  // ** Continue theme creation and pass merged component overrides to CreateTheme function
  theme = createTheme(theme, {
    components: { ...overrides(theme) },
    typography: { ...typography(theme) }
  })

  // ** Set responsive font sizes to true
  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme)
  }

  const { toastError, shiftToastError } = useToastErrorStore()
  const { toastSuccess, shiftToastSuccess } = useToastSuccessStore()
  const { toastWarning, shiftToastWarning } = useToastWarningStore()
  const { toastInfo, shiftToastInfo } = useToastInfoStore()

  useEffect(() => {
    if (toastError) {
      toastError.map(item => {
        toast.error(item)
        shiftToastError()
      })
    }
    if (toastSuccess) {
      toastSuccess.map(item => {
        toast.success(item)
        shiftToastSuccess()
      })
    }
    if (toastWarning) {
      toastWarning.map(item => {
        toast.warning(item)
        shiftToastWarning()
      })
    }
    if (toastInfo) {
      toastInfo.map(item => {
        toast.info(item)
        shiftToastInfo()
      })
    }
  }, [toastError, toastSuccess, toastWarning, toastInfo])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <GlobalStyles styles={() => GlobalStyling(theme) as any} />
      {children}
    </ThemeProvider>
  )
}

export default ThemeComponent
