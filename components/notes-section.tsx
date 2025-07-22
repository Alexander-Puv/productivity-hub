'use client'

import { addRecord } from '@/lib/actions/add-record'
import { useFolderStore } from '@/lib/hooks/use-folder-store'
import { useEffect, useState } from 'react'
import NavbarNote from './ui/navbar-note'
import NewButton from './ui/new-button'
import Loader from './ui/loader'
import { lastViewedNote } from '@/lib/utils'
import { chooseNote } from '@/lib/actions/choose-note'

const NotesSection = ({ notes }: { notes: INotes[] | null }) => {
  const { chosenFolderID } = useFolderStore()
  const [chosenNotes, setChosenNotes] = useState<INotes[] | null>(null)
  const [chosenNoteID, setChosenNoteID] = useState(lastViewedNote(chosenNotes)?.id || '')
  const [newNote, setNewNote] = useState(false)
  const [noteTitle, setNoteTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const filtered = notes?.filter(note => note.folder_id == chosenFolderID) ?? null
    setChosenNotes(filtered)
    if (filtered && filtered.length > 0) {
      const lastViewed = lastViewedNote(filtered)
      if (lastViewed) {
        setChosenNoteID(lastViewed.id)
        chooseNote(lastViewed)
      }
    }
  }, [chosenFolderID, notes])

  const handleNewNote = async () => {
    setNoteTitle('')
    setNewNote(false)
    setIsLoading(true)

    const { data, error } = await addRecord({
      tableName: 'notes',
      values: { folder_id: chosenFolderID, title: noteTitle },
      revalidate: '/dashboard/notes'
    })

    if (error) console.error(error)
    else setChosenNoteID((data as INotes).id)

    setIsLoading(false)
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
            && chosenNotes
              .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
              .map(note => <NavbarNote
                note={note}
                isChosen={chosenNoteID === note.id}
                onClick={setChosenNoteID}
                setChosenNotes={setChosenNotes}
                key={note.id}
              />)
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
          {isLoading && <Loader color='white' className='mx-2 my-1' />}
        </nav>
      </div>
    </section>
  )
}

export default NotesSection