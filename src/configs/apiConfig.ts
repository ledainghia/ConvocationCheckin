import axios from 'axios'
import { BASE_URL } from './baseURL'
import { User, bacheclorType } from 'src/typeofdata/bachelorType'

// Tạo một phiên Axios mới với các cài đặt mặc định
const axiosInstance = axios.create({
  baseURL: BASE_URL // Đảm bảo BASE_URL đã được định nghĩa ở nơi khác trong mã của bạn
})

// Thêm một interceptor để cấu hình tiêu đề của mỗi yêu cầu
axiosInstance.interceptors.request.use(config => {
  // Lấy assetToken từ localStorage
  const accessToken = localStorage.getItem('accessToken')

  // Kiểm tra xem assetToken có tồn tại và không rỗng
  if (accessToken) {
    // Thêm assetToken vào tiêu đề Authorization
    config.headers['Authorization'] = `Bearer ${accessToken}`
    config.timeout = 3000
  }

  return config
})

export const login = (user: User) => {
  return axios.post(BASE_URL + '/api/Auth/Login', user)
}

type checkinType = {
  studentCode: string
  checkin: string
  status: boolean
}
export const checkinAction = ({ studentCode, checkin, status }: checkinType) => {
  return axiosInstance.put('/api/Checkin/UpdateCheckin', {
    studentCode,
    checkin,
    status
  })
}

export const getListCheckin = () => {
  return axiosInstance.get('/api/Checkin/GetAll')
}

export type bachelorType = {
  image: string
  fullName: string
  major: string
  studentCode: string
  mail: string
  hallName: string
  sessionNum: number
  chair: string | null
  chairParent: string | null
}
export const addBachelor = (bachelorList: bachelorType[]) => {
  return axiosInstance.post('/api/Bachelor/Add', bachelorList)
}

export const getBachelorCurrent = (hall: string | null, session: number) => {
  return axiosInstance.get(`/api/Mc/GetBachelorCurrent?hall=${hall}&session=${session}`)
}

export const getBachelor1st = (hall: string | null, session: number) => {
  return axiosInstance.get(`/api/Mc/GetBachelor1st?hall=${hall}&session=${session}`)
}

export const getBachelorNext = (hall: string | null, session: number) => {
  return axiosInstance.get(`/api/Mc/GetBachelorNext?hall=${hall}&session=${session}`)
}

export const getBachelorBack = (hall: string | null, session: number) => {
  return axiosInstance.get(`/api/Mc/GetBachelorBack?hall=${hall}&session=${session}`)
}

export const updateBachelor = (bachelorList: bacheclorType) => {
  const dataUpdate = {
    image: bachelorList.image,
    fullName: bachelorList.fullName,
    major: bachelorList.major,
    studentCode: bachelorList.studentCode,
    mail: bachelorList.mail,
    hallName: bachelorList.hallName,
    sessionNum: bachelorList.sessionNum
  }
  return axiosInstance.put('/api/Bachelor/Update', dataUpdate)
}

export const deleteBachelor = (studentCode: string) => {
  return axiosInstance.delete(`/api/Bachelor/Delete/${studentCode}`)
}
export const getSeatLocation = (studentCode: string) => {
  return axiosInstance.get(`/api/Mc/GetLocationBachelor?studentCode=${studentCode}`)
}
