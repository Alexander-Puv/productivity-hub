import { cn } from "@/lib/utils"

const Loader = ({className}: {className?: string}) => {
  return (
    <span className={cn(
      "w-6 h-6 border-2 border-primary-foreground border-b-transparent rounded-full animate-spin",
      className
    )} />
  )
}

export default Loader