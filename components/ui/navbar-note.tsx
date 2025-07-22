'use client'

import { createClient } from "@/lib/supabase/client"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"
import Loader from "./loader"
import { chooseNote } from "@/lib/actions/choose-note"

interface NavbarNoteProps {
  note: INotes | null
  isChosen: boolean
  onClick?: (noteID: string) => void
  setChosenNotes?: Dispatch<SetStateAction<INotes[] | null>>
  isEditing?: boolean
  inputValue?: string
  setInputValue?: React.Dispatch<React.SetStateAction<string>>
  onBlur?: () => void
}

const NavbarNote = ({ note, isChosen, onClick, setChosenNotes, isEditing, inputValue, setInputValue, onBlur }: NavbarNoteProps) => {
  const [noteTitle, setNoteTitle] = useState(note?.title || '')
  const [isEditingNow, setIsEditingNow] = useState(isEditing || false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const changeTitle = async () => {
    if (!note) return

    const { error } = await supabase
      .from('notes')
      .update({ title: noteTitle })
      .eq('id', note.id)

    if (error) console.error('Failed to update note:', error.message)
    else setIsEditingNow(false)
  }

  if (isEditingNow || !note) {
    return (
      <div className='bg-primary text-primary-foreground'>
        <input
          autoFocus
          className="flex w-full bg-transparent px-2 py-1 border-none outline-none"
          value={inputValue || noteTitle}
          onChange={e => setInputValue ? setInputValue(e.target.value) : setNoteTitle(e.target.value)}
          onBlur={() => onBlur ? onBlur() : changeTitle()}
          onKeyDown={e => e.key === 'Enter' && (onBlur ? onBlur() : changeTitle())}
        />
      </div>
    )
  }

  const deleteNote = async () => {
    setIsLoadingDelete(true)

    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', note.id)

    if (error) console.error('Failed to delete note:', error.message)
    else {
      setChosenNotes && setChosenNotes(notes => notes?.filter(thisNote => thisNote.id !== note.id) ?? null)
      router.refresh()
    }

    setIsLoadingDelete(false)
  }

  return <div
    className={`group px-2 py-1 flex cursor-pointer transition-all hover:bg-accent ${isChosen && 'bg-accent'}`}
    onClick={() => { onClick && onClick(note.id); chooseNote(note) }}
    onDoubleClick={() => setIsEditingNow(true)}
  >
    <p className="grow truncate">{noteTitle || note?.content || 'Empty note'}</p>
    <span
      className={`hidden group-hover:flex ${isChosen && '!flex'}`}
      onClick={e => { e.stopPropagation(); deleteNote() }}
    >
      {isLoadingDelete
        ? <Loader color="white" />
        : <Trash2 />
      }
    </span>
  </div>
}

export default NavbarNote