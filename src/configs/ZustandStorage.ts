import { bacheclorType } from 'src/typeofdata/bachelorType'
import { create } from 'zustand'
import { bachelorType } from './apiConfig'

// Define the store using Zustand
interface HallSessionStore {
  hall: string | null
  session: string | null
  setHall: (hall: string | null) => void
  setSession: (session: string | null) => void
}

export const useHallSessionStore = create<HallSessionStore>(set => ({
  hall: null,
  session: null,
  setHall: hall => set({ hall }),
  setSession: session => set({ session })
}))

type Flag = {
  flagUpdateData: boolean
  setFlagUpdateData: (newValue: boolean) => void
}

export const useFlagStore = create<Flag>(set => ({
  flagUpdateData: false, // Initial value is false
  setFlagUpdateData: (newValue: boolean) => set({ flagUpdateData: newValue })
}))

type ButtonBack = {
  buttonBack: boolean
  setButtonBack: (newValue: boolean) => void
}

export const useButtonBackStore = create<ButtonBack>(set => ({
  buttonBack: false,
  setButtonBack: (newValue: boolean) => set({ buttonBack: newValue })
}))

type ButtonNext = {
  buttonNext: boolean
  setButtonNext: (newValue: boolean) => void
}

export const useButtonNextStore = create<ButtonNext>(set => ({
  buttonNext: false,
  setButtonNext: (newValue: boolean) => set({ buttonNext: newValue })
}))

type bachelorChange = {
  bachelorInfo: bacheclorType
  setBachelorInfo: (newValue: bacheclorType) => void
}

export const useBachelorChangeStore = create<bachelorChange>(set => ({
  bachelorInfo: {
    TYPE: 'CURRENT',
    checkIn1: false,
    checkIn2: false,
    fullName: null,
    hallName: null,
    id: 0,
    image: null,
    mail: null,
    major: null,
    sessionNum: null,
    status: null,
    statusBaChelor: null,
    studentCode: '',
    chair: null,
    chairParent: null
  },
  setBachelorInfo: (newValue: bacheclorType) => set({ bachelorInfo: newValue })
}))

type bachelorDelete = {
  bachelorDeleteInfo: bacheclorType
  setBachelorDeleteInfo: (newValue: bacheclorType) => void
}

export const useBachelorDeleteStore = create<bachelorDelete>(set => ({
  bachelorDeleteInfo: {
    TYPE: 'CURRENT',
    checkIn1: false,
    checkIn2: false,
    fullName: null,
    hallName: null,
    id: 0,
    image: null,
    mail: null,
    major: null,
    sessionNum: null,
    status: null,
    statusBaChelor: null,
    studentCode: '',
    chair: null,
    chairParent: null
  },
  setBachelorDeleteInfo: (newValue: bacheclorType) => set({ bachelorDeleteInfo: newValue })
}))

type showLed = {
  showLed: boolean
  setShowLed: (newValue: boolean) => void
}

export const useShowLedStore = create<showLed>(set => ({
  showLed: false,
  setShowLed: (newValue: boolean) => set({ showLed: newValue })
}))

type toastErrorStore = {
  toastError: string[]
  addToastError: (error: string) => void
  shiftToastError: () => void
}

export const useToastErrorStore = create<toastErrorStore>(set => ({
  toastError: [],
  addToastError: error => {
    set(state => ({
      toastError: [...state.toastError, error]
    }))
  },
  shiftToastError: () => {
    set(state => ({
      toastError: state.toastError.slice(1)
    }))
  }
}))

type toastSuccessStore = {
  toastSuccess: string[]
  addToastSuccess: (success: string) => void
  shiftToastSuccess: () => void
}

export const useToastSuccessStore = create<toastSuccessStore>(set => ({
  toastSuccess: [],
  addToastSuccess: success => {
    set(state => ({
      toastSuccess: [...state.toastSuccess, success]
    }))
  },
  shiftToastSuccess: () => {
    set(state => ({
      toastSuccess: state.toastSuccess.slice(1)
    }))
  }
}))

type toastWarningStore = {
  toastWarning: string[]
  addToastWarning: (warning: string) => void
  shiftToastWarning: () => void
}

export const useToastWarningStore = create<toastWarningStore>(set => ({
  toastWarning: [],
  addToastWarning: warning => {
    set(state => ({
      toastWarning: [...state.toastWarning, warning]
    }))
  },
  shiftToastWarning: () => {
    set(state => ({
      toastWarning: state.toastWarning.slice(1)
    }))
  }
}))

type toastInfoStore = {
  toastInfo: string[]
  addToastInfo: (info: string) => void
  shiftToastInfo: () => void
}

export const useToastInfoStore = create<toastInfoStore>(set => ({
  toastInfo: [],
  addToastInfo: info => {
    set(state => ({
      toastInfo: [...state.toastInfo, info]
    }))
  },
  shiftToastInfo: () => {
    set(state => ({
      toastInfo: state.toastInfo.slice(1)
    }))
  }
}))
