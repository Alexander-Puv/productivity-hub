'use client'

import { createClient } from "@/lib/supabase/client"
import { Button } from "./button"
import Loader from "./loader"
import { Dispatch, FocusEvent, SetStateAction, useRef, useState } from "react"
import { useFolderStore } from "@/lib/hooks/use-folder-store"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

const Folder = ({ folder, setFilteredFolders }:
  { folder: IFolders, setFilteredFolders: Dispatch<SetStateAction<IFolders[] | null>> }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(folder.title || '')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const { chosenFolderID, setChosenFolderID } = useFolderStore()
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
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

  const deleteFolder = async () => {
    setIsLoadingDelete(true)

    const { error } = await supabase
      .from('folders')
      .delete()
      .eq('id', folder.id)

    if (error) console.error('Failed to delete folder:', error.message)
    else {
      setFilteredFolders && setFilteredFolders(folders => folders?.filter(thisFolder => thisFolder.id !== folder.id) ?? null)
      router.refresh()
    }

    setIsLoadingDelete(false)
  }

  return (
    <Button
      className={`group max-w-[14.5rem] ${chosenFolderID === folder.id ? "rounded-b-none" : 'rounded-none'}`}
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
          : <div className="flex items-center gap-1">
            <p className="truncate">{inputValue || 'No title'}</p>
            <span
              className={`hidden group-hover:flex transition-colors hover:text-destructive ${chosenFolderID === folder.id && '!flex'}`}
              onClick={e => { e.stopPropagation(); deleteFolder() }}
            >
              {isLoadingDelete
                ? <Loader color="white" />
                : <Trash2 />
              }
            </span>
          </div>
      }
    </Button>
  )
}

export default Folder