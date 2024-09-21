'use client'
import { cn } from '@/lib/utils'
import { Eye, EyeOff } from 'lucide-react'
import {
  forwardRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useState,
} from 'react'
import { Button } from './button'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const [currentType, setCurrentType] = useState<HTMLInputTypeAttribute>(
      type || 'text',
    )

    function handleToggleType() {
      setCurrentType((state) => (state === 'password' ? 'text' : 'password'))
    }

    return (
      <div className="flex flex-col gap-4">
        {label && (
          <label
            className="text-neutral-900 text-base leading-none"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <input
            id={id}
            type={currentType}
            className={cn(
              'flex h-[50px] w-full border rounded-full border-input bg-background px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            ref={ref}
            {...props}
          />
          {type === 'password' && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={handleToggleType}
                  className="absolute right-4 size-10 p-0"
                >
                  {currentType === 'password' ? (
                    <Eye className="size-4 text-neutral-600" />
                  ) : (
                    <EyeOff className="size-4 text-neutral-600" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <span>
                  {currentType === 'password' ? 'Ver senha' : 'Ocultar senha'}
                </span>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        {error && <span>{error}</span>}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
