import * as HoverCard from '@radix-ui/react-hover-card'
import { ReactNode } from 'react'

interface SimpleHoverCard {
  children: ReactNode
  title: string
  triggerAsChild?: boolean
}

const SimpleHoverCard = ({ children, title, triggerAsChild = true }: SimpleHoverCard) => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild={triggerAsChild}>
        {children}
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content className="py-px px-1.5 bg-primary text-primary-foreground rounded">
          {title}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}

export default SimpleHoverCard