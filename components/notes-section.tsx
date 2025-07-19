'use client'

import { addRecord } from '@/lib/actions/add-record'
import { useFolderStore } from '@/lib/hooks/use-folder-store'
import { useEffect, useState } from 'react'
import NavbarNote from './ui/navbar-note'
import NewButton from './ui/new-button'

const NotesSection = ({ notes }: { notes: INotes[] | null }) => {
  const [chosenNoteID, setChosenNoteID] = useState('')
  const { chosenFolderID } = useFolderStore()
  const [chosenNotes, setChosenNotes] = useState<INotes[] | null>(null)
  const [newNote, setNewNote] = useState(false)
  const [noteTitle, setNoteTitle] = useState('')

  useEffect(() => {
    setChosenNotes(notes?.filter(note => note.folder_id == chosenFolderID) ?? null)
  }, [chosenFolderID, notes])

  const handleNewNote = async () => {
    setNoteTitle('')
    setNewNote(false)

    const { error } = await addRecord({
      tableName: 'notes',
      values: { folder_id: chosenFolderID, title: noteTitle },
      revalidate: '/dashboard/notes'
    })

    if (error) console.error(error)
  }

  return (!chosenFolderID ? null :
    <section className='grow flex'>
      <div className='grow'>
        {chosenNotes && chosenNotes.length !== 0
          // ?
          // :
        }
      </div>
      <div className='max-w-72 w-full flex'>
        <nav className='fixed right-0 max-w-[inherit] w-full max-h-[inherit] h-full flex flex-col border-l'>
          <div className="group mb-2 p-1 flex items-center cursor-pointer transition hover:bg-accent" onClick={() => setNewNote(true)}>
            <NewButton width={12} height={12} />
            <p>New page</p>
          </div>
          {chosenNotes && chosenNotes.length !== 0
            ? chosenNotes.map(note => <NavbarNote
              note={note}
              isChosen={chosenNoteID === note.id}
              onClick={setChosenNoteID}
              key={note.id}
            />)
            : <NavbarNote note={null} isChosen />
          }
          {newNote && (
            <NavbarNote
              note={null}
              isChosen
              isEditing
              inputValue={noteTitle}
              setInputValue={setNoteTitle}
              onBlur={handleNewNote}
            />
          )}
        </nav>
      </div>
      
    </section>
  )
}

export default NotesSection