'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'

const FolderNavbar = ({folders}: {folders: IFolders[] | null}) => {
  const [chosenFolderID, setChosenFolderID] = useState('')

  return (
    <nav className="flex pt-2 border-b">
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
      <button className="self-center m-1 p-1.5 bg-border rounded-full">
        <Plus width={16} height={16} />
      </button>
    </nav>
  )
}

export default FolderNavbar