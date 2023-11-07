export type bacheclorType = {
  TYPE: 'BACK' | 'CURRENT' | 'NEXT'
  checkIn1: boolean
  checkIn2: boolean
  fullName: string | null
  hallName: string | null
  id: number
  image: string | null
  mail: string | null
  major: string | null
  sessionNum: number | null
  status: boolean | null
  statusBaChelor: string | null
  studentCode: string
  chair: string | null
  chairParent: string | null
}

export type User = {
  userId: string | undefined
  password: string | undefined
}
