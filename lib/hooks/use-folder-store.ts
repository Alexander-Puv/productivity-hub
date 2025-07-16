import { create } from 'zustand'

interface FolderState {
  chosenFolderID: string
  setChosenFolderID: (newChosenFolderID: string) => void
}

export const useFolderStore = create<FolderState>()((set) => ({
  chosenFolderID: '',
  setChosenFolderID: (newChosenFolderID: string) => set({chosenFolderID: newChosenFolderID}),
}))
