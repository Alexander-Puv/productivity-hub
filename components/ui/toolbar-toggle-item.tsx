import { ToggleItem } from "@radix-ui/react-toolbar"
import { ReactNode } from "react"
import SimpleHoverCard from './simple-hover-card'

interface ToolbarToggleItemProps {
  children: ReactNode
  value: string
  onClick?: () => void
}

const ToolbarToggleItem = ({ children, value, onClick }: ToolbarToggleItemProps) => {
  return (
    <SimpleHoverCard title={value}>
      <ToggleItem
        className='p-1 rounded-md hover:bg-border data-[state=on]:bg-primary data-[state=on]:text-primary-foreground'
        onClick={onClick}
        value={value}
      >
        {children}
      </ToggleItem>
    </SimpleHoverCard>
  )
}

export default ToolbarToggleItem