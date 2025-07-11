'use client'

import { addRecord } from '@/lib/actions/add-record'
import { Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import { Button } from './ui/button'

const FolderNavbar = ({folders}: {folders: IFolders[] | null}) => {
  const [chosenFolderID, setChosenFolderID] = useState('')
  const [newFolder, setNewFolder] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.focus()
  }

  const handleNewFolder = async () => {
    const {error} = await addRecord({tableName: 'folders', values: {title: inputValue}, revalidate: '/dashboard/notes'})

    if (error) {
      console.error(error)
    } else {
      setNewFolder(false)
      setInputValue('')
    }
  }

  return (
    <nav className="flex pt-2 px-1 border-b">
      {folders?.map(folder => 
        <Button
          className={`${chosenFolderID === folder.id ? "rounded-b-none" : 'rounded-none'}`}
          variant={chosenFolderID === folder.id ? 'default' : 'ghost'}
          onClick={() => setChosenFolderID(folder.id)}
          key={folder.id}
        >
          <p>{folder.title}</p>
        </Button>
      )}
      {newFolder &&
        <Button className="px-2 rounded-b-none" variant='default' onClick={handleClick}>
          <input
            className='px-px bg-transparent outline-border'
            ref={inputRef}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleNewFolder()}
            onBlur={handleNewFolder}
          />
        </Button>
      }
      <button className="self-center m-1 p-1.5 bg-border rounded-full" onClick={() => setNewFolder(true)}>
        <Plus width={16} height={16} />
      </button>
    </nav>
  )
}

export default FolderNavbar