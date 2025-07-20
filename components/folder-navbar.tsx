'use client'

import { addRecord } from '@/lib/actions/add-record'
import { useFolderStore } from '@/lib/hooks/use-folder-store'
import { FocusEvent, useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import NewButton from './ui/new-button'
import Loader from './ui/loader'
import { createClient } from '@/lib/supabase/client'
import Folder from './ui/folder'

const FolderNavbar = ({folders, lastViewedFolderID}: {folders: IFolders[] | null, lastViewedFolderID: string | null}) => {
  const [newFolder, setNewFolder] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const {chosenFolderID, setChosenFolderID} = useFolderStore()
  const [isLoading, setIsLoading] = useState(false)
  const [editingFolderID, setEditingFolderID] = useState<string | null>(null)
  const wrapperRef = useRef<HTMLButtonElement>(null)
  const supabase = createClient()

  useEffect(() => {
    lastViewedFolderID && setChosenFolderID(lastViewedFolderID)
  }, [])

  const handleNewFolder = async () => {
    setNewFolder(false)
    setInputValue('')
    setIsLoading(true)

    const {data, error} = await addRecord({tableName: 'folders', values: {title: inputValue}, revalidate: '/dashboard/notes'})

    if (error) console.error(error)
    else setChosenFolderID((data as IFolders).id)

    setIsLoading(false)
  }

  const handleBlur = (e: FocusEvent) => {
    const nextFocus = e.relatedTarget as HTMLElement | null
    if (!wrapperRef.current?.contains(nextFocus)) {
      handleNewFolder()
    }
  }
  
  return (
    <nav className="max-w-full flex pt-2 px-1 border-b overflow-x-auto">
      {folders?.map(folder => <Folder folder={folder} key={folder.id} />)}
      {newFolder &&
        <Button className="rounded-b-none" ref={wrapperRef} onBlur={handleBlur}>
          <input
            autoFocus
            className='px-px bg-transparent outline-border'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleNewFolder()}
          />
        </Button>
      }
      {isLoading && <Loader className='mx-2 my-1 border-primary border-b-transparent' />}
      <NewButton onClick={() => setNewFolder(true)} />
    </nav>
  )
}

export default FolderNavbar