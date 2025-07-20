'use client'

import { createClient } from "@/lib/supabase/client"
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

  if (isEditingNow) {
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

  const chooseFolder = async () => {
    if (!note) return
    onClick && onClick(note.id)
    
    const { error } = await supabase
      .from('notes')
      .update({ last_viewed: new Date().toISOString() })
      .eq('id', note.id)

    if (error) console.error('Failed to update note:', error.message)
  }

  return <div
    className={`cursor-pointer transition-all hover:bg-accent ${isChosen && 'bg-accent'}`}
    onClick={chooseFolder}
    onDoubleClick={() => setIsEditingNow(true)}
  >
    <p className="px-2 py-1 truncate">{noteTitle || note?.content || 'Empty note'}</p>
  </div>
}

export default NavbarNote