import { formatDate, formatTime } from "@/lib/utils"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { Toggle } from "@radix-ui/react-toggle"
import { Check } from "lucide-react"

const Todo = ({text, created_at, done}: ITodo) => {
  return (
    <div className="w-full flex flex-col border-2 rounded-sm">
      <div className="flex">
        <div className="w-full flex-grow flex flex-col">
          <p className="my-1 mx-2">{text}</p>
          <Separator className="mx-1 h-px bg-border" />
        </div>
        <Separator className="m-1 w-px bg-border" />
        <div className="flex flex-col">
          <Toggle
            className="flex-grow my-1 mx-1 px-1 rounded transition hover:bg-accent"
            // onClick={}
          >
            <Check />
          </Toggle>
          <Separator className="mx-1 h-px bg-border" />
        </div>
      </div>
      <span className="self-end p-1 text-xs font-light">{formatDate(created_at)} {formatTime(created_at)}</span>
    </div>
  )
}

export default Todo