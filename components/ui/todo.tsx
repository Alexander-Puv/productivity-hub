'use client'

import { createClient } from "@/lib/supabase/client"
import { formatDate, formatTime } from "@/lib/utils"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { Toggle } from "@radix-ui/react-toggle"
import * as Slider from "@radix-ui/react-slider"
import { Check } from "lucide-react"
import { useEffect, useState } from "react"

const Todo = (
  {id, text, created_at, done, setTodos, autoHide = false}:
  ITodo & { autoHide?: boolean } & { setTodos: React.Dispatch<React.SetStateAction<ITodo[] | null>> }
) => {
  const [isDone, setIsDone] = useState(done)
  const [value, setValue] = useState([0])
  const [visible, setVisible] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (!autoHide || !isDone) {
      setValue([0])
      setTodos(todos => todos?.map(todo => {return {...todo, done: todo.id == id ? isDone : todo.done}}) ?? todos)
      return
    }

    setValue([0])
    const start = Date.now()

    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000
      const progress = Math.min((elapsed / 5) * 100, 100)
      setValue([progress])
      if (progress >= 100) {
        clearInterval(interval)
        setVisible(false)
        setTodos(todos => todos?.map(todo => {return {...todo, done: todo.id == id ? isDone : todo.done}}) ?? todos)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [isDone, autoHide])

  const toggleDone = async () => {
    const { error } = await supabase
      .from('todos')
      .update({ done: !isDone })
      .eq('id', id)

    if (!error) {
      setIsDone(!isDone)
    } else {
      console.error('Failed to update todo:', error.message)
    }
  }

  return !visible ? null : (
    <div className="w-full flex flex-col border-2 rounded-sm">
      <div className="flex">
        <div className="w-full flex-grow flex flex-col">
          <p className="my-1 mx-2">{text}</p>
          <Separator className="mx-1 h-px bg-border" />
        </div>
        <Separator className="m-1 w-px bg-border" />
        <div className="flex flex-col">
          <Toggle
            className={`flex-grow my-1 mx-1 px-1 rounded transition ${isDone ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
            onClick={toggleDone}
          >
            <Check />
          </Toggle>
          <Separator className="mx-1 h-px bg-border" />
        </div>
      </div>
      <span className="self-end p-1 text-xs font-light">
        {!isDone || !autoHide
          ? `${formatDate(created_at)} ${formatTime(created_at)}`
          : <Slider.Root
            value={value}
            max={100}
            step={1}
            disabled
            className="relative h-3 w-8 my-0.5 flex items-center select-none touch-none"
          >
            <Slider.Track className="relative grow rounded-full h-full bg-accent">
              <Slider.Range className="absolute rounded-full h-full bg-primary" />
            </Slider.Track>
          </Slider.Root>
        }
      </span>
    </div>
  )
}

export default Todo