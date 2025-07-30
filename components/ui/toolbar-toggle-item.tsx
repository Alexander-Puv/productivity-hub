import * as HoverCard from '@radix-ui/react-hover-card'
import { ToggleItem } from "@radix-ui/react-toolbar"
import { ReactNode } from "react"

interface ToolbarToggleItemProps {
  children: ReactNode
  value: string
  onClick?: () => void
}

const ToolbarToggleItem = ({ children, value, onClick }: ToolbarToggleItemProps) => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <ToggleItem
          className='p-1 rounded-md hover:bg-accent data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
          onClick={onClick}
          value={value}
        >
          {children}
        </ToggleItem>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className="py-px px-1.5 bg-primary text-primary-foreground rounded">
          {value}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}

export default ToolbarToggleItem