'use client'

import { createClient } from "@/lib/supabase/client"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface NavbarNoteProps {
  note: INotes | null
  isChosen: boolean
  onClick?: (noteID: string) => void
  isEditing?: boolean
  inputValue?: string
  setInputValue?: React.Dispatch<React.SetStateAction<string>>
  onBlur?: () => void
}

const NavbarNote = ({ note, isChosen, onClick, isEditing, inputValue, setInputValue, onBlur }: NavbarNoteProps) => {
  const [noteTitle, setNoteTitle] = useState(note?.title || '')
  const [isEditingNow, setIsEditingNow] = useState(isEditing || false)
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

  const chooseNote = async () => {
    onClick && onClick(note.id)

    const { error } = await supabase
      .from('notes')
      .update({ last_viewed: new Date().toISOString() })
      .eq('id', note.id)

    if (error) console.error('Failed to update note:', error.message)
  }

  const deleteNote = async () => {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', note.id)

    if (error) console.error('Failed to delete note:', error.message)
    else router.refresh()
  }

  return <div
    className={`group px-2 py-1 flex cursor-pointer transition-all hover:bg-accent ${isChosen && 'bg-accent'}`}
    onClick={chooseNote}
    onDoubleClick={() => setIsEditingNow(true)}
  >
    <p className="grow truncate">{noteTitle || note?.content || 'Empty note'}</p>
    <span
      className={`hidden group-hover:block ${isChosen && '!block'}`}
      onClick={e => {e.stopPropagation(); deleteNote()}}
    >
      <Trash2 />
    </span>
  </div>
}

export default NavbarNote