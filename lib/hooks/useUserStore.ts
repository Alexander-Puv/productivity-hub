import { create } from 'zustand'

interface UserState {
  userEmail: string | null
  setUserEmail: (email: string | null) => void
}

export const useUserStore = create<UserState>((set) => ({
  userEmail: null,
  setUserEmail: (email) => set(() => ({userEmail: email}))
}))