import { Plus } from 'lucide-react'
import React from 'react'

const NewButton = ({onClick}: {onClick?: Function}) => {
  return (
    <button
      className="
        self-center m-1 p-1.5 bg-border rounded-[50%]
        transition-all ease-linear hover:rounded-md hover:bg-primary hover:text-primary-foreground
      "
      onClick={() => onClick && onClick()}
    >
      <Plus width={16} height={16} />
    </button>
  )
}

export default NewButton