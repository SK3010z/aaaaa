import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { ComponentProps } from 'react'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

type Props = {
  tooltip?: string
}

export function CloseButton({ className, tooltip = 'Fechar', ...rest }: ComponentProps<'button'> & Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button tabIndex={-1} variant="ghost" className={cn('group p-1 rounded-sm size-6 hover:bg-primary/10', className)} {...rest}>
          <X className="size-4 text-neutral-500 group-hover:text-primary group-hover:rotate-90 group-hover:scale-110 transition-all" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>{tooltip}</span>
      </TooltipContent>
    </Tooltip>
  )
}
