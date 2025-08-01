'use client'

import { addRecord } from '@/lib/actions/add-record'
import { useFolderStore } from '@/lib/hooks/use-folder-store'
import { FocusEvent, useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import Folder from './ui/folder'
import Loader from './ui/loader'
import NewButton from './ui/new-button'
import * as HoverCard from '@radix-ui/react-hover-card'
import SimpleHoverCard from './ui/simple-hover-card'

const FolderNavbar = ({ folders, lastViewedFolderID }: { folders: IFolders[] | null, lastViewedFolderID: string | null }) => {
  const [newFolder, setNewFolder] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [filteredFolders, setFilteredFolders] = useState(folders)
  const { setChosenFolderID } = useFolderStore()
  const wrapperRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    lastViewedFolderID && setChosenFolderID(lastViewedFolderID)
  }, [])

  useEffect(() => {
    setFilteredFolders(folders)
  }, [folders])

  const handleNewFolder = async () => {
    setNewFolder(false)
    setInputValue('')
    setIsLoading(true)

    const { data, error: folderError } = await addRecord({ tableName: 'folders', values: { title: inputValue }, revalidate: '/dashboard/notes' })
    const { error: noteError } = await addRecord({ tableName: 'notes', values: { folder_id: data.id }, revalidate: '/dashboard/notes' })

    if (folderError || noteError) console.error(folderError || noteError)
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
      {filteredFolders
        ?.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        .map(folder => <Folder folder={folder} setFilteredFolders={setFilteredFolders} key={folder.id} />)
      }
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
      {isLoading && <Loader color='white' className='mx-2 my-1' />}
      <SimpleHoverCard title='New Tab' triggerAsChild={false}>
        <NewButton onClick={() => setNewFolder(true)} />
      </SimpleHoverCard>
    </nav>
  )
}

export default FolderNavbar