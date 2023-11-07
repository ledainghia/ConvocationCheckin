// ** Icon imports
import { CameraControl } from 'mdi-material-ui'
import AccountBoxMultiple from 'mdi-material-ui/AccountBoxMultiple'
import AccountCheckOutline from 'mdi-material-ui/AccountCheckOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import CalendarEdit from 'mdi-material-ui/CalendarEdit'
import CellphoneCheck from 'mdi-material-ui/CellphoneCheck'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import Login from 'mdi-material-ui/Login'
import PlayBoxOutline from 'mdi-material-ui/PlayBoxOutline'
import SeatOutline from 'mdi-material-ui/SeatOutline'
import router from 'next/router'
import { useState, useEffect } from 'react'
import * as jwt from 'jwt-decode'
// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

type User = {
  userID: string
  email: string
  fullname: string
  role: string
  exp: number
}

const navigation = (): VerticalNavItemsType => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')

    if (!token) {
      router.push('/pages/login')
    } else {
      const user: User = jwt.jwtDecode(token)
      setUser(user)
    }
  }, [])
  if (user?.role === 'MN')
    return [
      {
        title: 'Home Page',
        icon: HomeOutline,
        path: '/'
      },

      {
        title: 'Mc Controller',
        icon: CameraControl,
        path: '/mc-controller'
      },
      {
        title: 'Led Visualizer',
        icon: PlayBoxOutline,
        path: '/led-visualizer'
      },

      {
        sectionTitle: 'Check In'
      },
      {
        title: 'Checkin',
        icon: AccountCheckOutline,
        path: '/checkin'
      },

      {
        title: 'SmartCheckin',
        icon: CellphoneCheck,
        path: '/smartcheckin'
      },
      {
        title: 'Seat Location',
        icon: SeatOutline,
        path: '/seat-location'
      },
      {
        sectionTitle: 'Admin'
      },
      {
        title: 'Manage Guests',
        icon: AccountBoxMultiple,
        path: '/admin/manage-guests'
      },
      {
        title: 'Manage Events',
        icon: CalendarEdit,
        path: '/account-settings'
      },

      {
        title: 'Login',
        icon: Login,
        path: '/pages/login',
        openInNewTab: true
      },
      {
        title: 'Register',
        icon: AccountPlusOutline,
        path: '/pages/register',
        openInNewTab: true
      }
    ]
  else if (user?.role === 'US')
    return [
      {
        title: 'Home Page',
        icon: HomeOutline,
        path: '/'
      },

      {
        title: 'Mc Controller',
        icon: CameraControl,
        path: '/mc-controller'
      },
      {
        title: 'Led Visualizer',
        icon: PlayBoxOutline,
        path: '/led-visualizer'
      }
    ]
  else if (user?.role === 'CK')
    return [
      {
        title: 'Home Page',
        icon: HomeOutline,
        path: '/'
      },

      {
        sectionTitle: 'Check In'
      },
      {
        title: 'Checkin',
        icon: AccountCheckOutline,
        path: '/checkin'
      },

      {
        title: 'SmartCheckin',
        icon: CellphoneCheck,
        path: '/smartcheckin'
      },
      {
        title: 'Seat Location',
        icon: SeatOutline,
        path: '/seat-location'
      }
    ]
  else
    return [
      {
        title: 'Home Page',
        icon: HomeOutline,
        path: '/'
      },

      {
        title: 'Mc Controller',
        icon: CameraControl,
        path: '/mc-controller'
      },
      {
        title: 'Led Visualizer',
        icon: PlayBoxOutline,
        path: '/led-visualizer'
      },

      {
        sectionTitle: 'Check In'
      },
      {
        title: 'Checkin',
        icon: AccountCheckOutline,
        path: '/checkin'
      },

      {
        title: 'SmartCheckin',
        icon: CellphoneCheck,
        path: '/smartcheckin'
      },
      {
        title: 'Seat Location',
        icon: SeatOutline,
        path: '/seat-location'
      },
      {
        sectionTitle: 'Admin'
      },
      {
        title: 'Manage Guests',
        icon: AccountBoxMultiple,
        path: '/admin/manage-guests'
      },
      {
        title: 'Manage Events',
        icon: CalendarEdit,
        path: '/account-settings'
      },

      {
        title: 'Login',
        icon: Login,
        path: '/pages/login',
        openInNewTab: true
      },
      {
        title: 'Register',
        icon: AccountPlusOutline,
        path: '/pages/register',
        openInNewTab: true
      }
    ]
}

export default navigation
