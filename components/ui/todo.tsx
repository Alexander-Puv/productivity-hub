'use client'

import { createClient } from "@/lib/supabase/client"
import { formatDate, formatTime } from "@/lib/utils"
import { Separator } from "@radix-ui/react-dropdown-menu"
import * as Progress from "@radix-ui/react-progress"
import { Toggle } from "@radix-ui/react-toggle"
import { Check, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./button"

const Todo = (
  {id, text, created_at, done, setTodos, autoHide = false}:
  ITodo & { autoHide?: boolean } & { setTodos: React.Dispatch<React.SetStateAction<ITodo[] | null>> }
) => {
  const [isDone, setIsDone] = useState(done)
  const [value, setValue] = useState(0)
  const [showTrash, setShowTrash] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (!autoHide || !isDone) {
      setValue(0)
      setTodos(todos => todos?.map(todo => {return {...todo, done: todo.id == id ? isDone : todo.done}}) ?? todos)
      return
    }

    setValue(0)
    const start = Date.now()

    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000
      const progress = Math.min((elapsed / 5) * 100, 100)
      setValue(progress)
      if (progress >= 100) {
        clearInterval(interval)
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

  const deleteTodo = async () => {
    const {error} = await supabase
      .from('todos')
      .delete()
      .eq('id', id)

    if (!error) setTodos(todos => todos?.filter(todo => todo.id !== id) ?? null)
    else console.error('Failed to delete todo:', error.message)
  }

  return (
    <div
      className="relative w-full flex flex-col border-2 rounded-sm"
      onMouseEnter={() => setShowTrash(true)}
      onMouseLeave={() => setShowTrash(false)}
    >
      <div className="relative z-10 flex">
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
      <span className="relative z-10 self-end p-1 text-xs font-light">
        {!isDone || !autoHide
          ? `${formatDate(created_at)} ${formatTime(created_at)}`
          : <Progress.Root
            className="relative h-3 w-8 my-0.5 overflow-hidden rounded-full bg-accent"
            style={{transform: "translateZ(0)"}}
            value={value}
          >
            <Progress.Indicator 
              className="size-full bg-primary transition-transform duration-200 ease-in-out"
              style={{ transform: `translateX(-${100 - value}%)` }}
            />
          </Progress.Root>
        }
      </span>
      <span className={`absolute right-0 h-full p-2 transition duration-300 ${!showTrash ? 'opacity-0 translate-x-0' : 'translate-x-full'}`}>
        <Button className="h-full ml-2 p-3" onClick={deleteTodo}>
          <Trash2 height='100%' width='100%' />
        </Button>
      </span>
    </div>
  )
}

export default Todo