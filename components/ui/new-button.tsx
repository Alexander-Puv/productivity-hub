import { Plus } from 'lucide-react'
import React from 'react'

const NewButton = ({onClick}: {onClick?: Function}) => {
  return (
    <button className="self-center m-1 p-1.5 bg-border rounded-full" onClick={() => onClick && onClick()}>
      <Plus width={16} height={16} />
    </button>
  )
}

export default NewButton