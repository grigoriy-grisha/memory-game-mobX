import React, { ReactNode } from 'react'
import { createNotesStore, createNotesStoreType } from './notesStore'
import { useLocalStore } from 'mobx-react'

const NotesContext = React.createContext<createNotesStoreType | null>(null)

type PropType = {
  children: ReactNode
}

export const NotesProvider: React.FC<PropType> = ({children}) => {
  const notesStore = useLocalStore(createNotesStore)
  
  return (
    <NotesContext.Provider value={notesStore}>
    {children}
  </NotesContext.Provider>
  )
}

export const useNotesStore = () => React.useContext(NotesContext)