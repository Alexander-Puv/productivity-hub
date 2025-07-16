import { Plus } from 'lucide-react'
import React from 'react'

interface NewButtonProps {
  onClick?: Function
  width?: number
  height?: number
}

const NewButton = ({onClick, width = 16, height = 16}: NewButtonProps) => {
  return (
    <button
      className="
        self-center m-1 p-1.5 bg-border rounded-[50%]
        transition-all ease-linear hover:rounded-md hover:bg-primary hover:text-primary-foreground
<<<<<<< HEAD
        group-hover:rounded-md group-hover:bg-primary group-hover:text-primary-foreground
      "
      onClick={() => onClick && onClick()}
    >
      <Plus width={width} height={height} />
=======
      "
      onClick={() => onClick && onClick()}
    >
      <Plus width={16} height={16} />
>>>>>>> adb37145a564734de966fb57267dab78796f7692
    </button>
  )
}

export default NewButton