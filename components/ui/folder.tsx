'use client'

import { createClient } from "@/lib/supabase/client"
import { Button } from "./button"
import Loader from "./loader"
import { FocusEvent, useRef, useState } from "react"
import { useFolderStore } from "@/lib/hooks/use-folder-store"

const Folder = ({ folder }: { folder: IFolders }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(folder.title || '')
  const [isLoading, setIsLoading] = useState(false)
  const {chosenFolderID, setChosenFolderID} = useFolderStore()
  const inputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const changeTitle = async () => {
    setIsLoading(true)

    const { error } = await supabase
      .from('folders')
      .update({ title: inputValue })
      .eq('id', folder.id)

    if (error) console.error('Failed to update folder:', error)
    setIsEditing(false)
    setIsLoading(false)
  }

  const handleBlur = (e: FocusEvent) => {
    setTimeout(() => {
      const next = e.relatedTarget as HTMLElement
      if (!next || !next.contains(inputRef.current)) {
        changeTitle()
      }
    }, 10)
  }

  return (
    <Button
      className={`${chosenFolderID === folder.id ? "rounded-b-none" : 'rounded-none'} max-w-[14.5rem]`}
      variant={chosenFolderID === folder.id ? 'default' : 'ghost'}
      onClick={() => setChosenFolderID(folder.id)}
      onDoubleClick={() => setIsEditing(true)}
      onBlur={e => isEditing && handleBlur(e)}
    >
      {isLoading ?
        <Loader />
        : isEditing
          ? <input
            ref={inputRef}
            autoFocus
            className="bg-transparent outline-none w-full"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && changeTitle()}
          />
          : <p className="truncate">{inputValue || 'No title'}</p>
      }
    </Button>
  )
}

export default Folder