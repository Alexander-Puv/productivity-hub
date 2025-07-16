'use client'

import { addRecord } from '@/lib/actions/add-record'
import { useFolderStore } from '@/lib/hooks/use-folder-store'
import { FocusEvent, useRef, useState } from 'react'
import { Button } from './ui/button'
import NewButton from './ui/new-button'

const FolderNavbar = ({folders}: {folders: IFolders[] | null}) => {
  const [newFolder, setNewFolder] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const {chosenFolderID, setChosenFolderID} = useFolderStore()
  const wrapperRef = useRef<HTMLButtonElement>(null)

  const handleNewFolder = async () => {
    const {error} = await addRecord({tableName: 'folders', values: {title: inputValue}, revalidate: '/dashboard/notes'})

    if (error) {
      console.error(error)
    } else {
      setNewFolder(false)
      setInputValue('')
    }
  }
  const handleBlur = (e: FocusEvent) => {
    const nextFocus = e.relatedTarget as HTMLElement | null
    if (!wrapperRef.current?.contains(nextFocus)) {
      handleNewFolder()
    }
  }
  
  return (
    <nav className="max-w-full flex pt-2 px-1 border-b overflow-x-auto">
      {folders?.map(folder => 
        <Button
          className={`${chosenFolderID === folder.id ? "rounded-b-none" : 'rounded-none'} max-w-40`}
          variant={chosenFolderID === folder.id ? 'default' : 'ghost'}
          onClick={() => setChosenFolderID(folder.id)}
          key={folder.id}
        >
          <p className='truncate'>{folder.title ? folder.title : 'No title'}</p>
        </Button>
      )}
      {newFolder &&
        <Button className="px-2 rounded-b-none" ref={wrapperRef} onBlur={handleBlur}>
          <input
            className='px-px bg-transparent outline-border'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleNewFolder()}
          />
        </Button>
      }
      <NewButton onClick={() => setNewFolder(true)} />
    </nav>
  )
}

export default FolderNavbar