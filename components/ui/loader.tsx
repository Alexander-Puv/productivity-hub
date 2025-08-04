import { cn } from "@/lib/utils"

const Loader = ({color = 'black', className}: {color?: 'white' | 'black', className?: string}) => {
  return (
    <span className={cn(
      'w-6 h-6 border-2 rounded-full animate-spin',
      color === 'black'
        ? 'border-primary dark:border-primary-foreground border-b-transparent'
        : 'border-primary-foreground dark:border-primary border-b-transparent',
      className
    )} />
  )
}

export default Loader