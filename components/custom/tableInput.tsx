'use client'
import { cn } from '@/lib/utils'
import { forwardRef, InputHTMLAttributes, PropsWithChildren } from 'react'

export interface TableInputProps
  extends PropsWithChildren<InputHTMLAttributes<HTMLInputElement>> {
  label?: string
  error?: string
}

const TableInput = forwardRef<HTMLInputElement, TableInputProps>(
  ({ className, type, id, children, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-4">
        <div className="relative flex items-center">
          <input
            id={id}
            type={type}
            className={cn(
              'flex h-8 w-full border rounded-sm border-input bg-background px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            ref={ref}
            {...props}
          />
          {children}
        </div>
      </div>
    )
  },
)
TableInput.displayName = 'Input'

export { TableInput }
