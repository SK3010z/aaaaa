import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface Props {
  isChecked: boolean
  onClick: () => void
  pickerColorClassName: string 
}

export function IndividualColorPicker({
  isChecked,
  onClick,
  pickerColorClassName,
}: Props) {
  return (
    <div
      data-checked={isChecked}
      onClick={onClick}
      className="w-4 h-4 group rounded-full flex items-center justify-center relative cursor-pointer"
    >
      <span
        className={cn(
          'absolute transition-all top-0 left-0 right-0 bottom-0 rounded-full group-data-[checked=true]:scale-[2.5] group-hover:scale-[2]',
          pickerColorClassName,
        )}
      />
      <Check
        className={`text-white ${isChecked ? 'flex' : 'hidden'} z-10 ${
          isChecked ? 'scale-[2]' : ''
        }`}
      />
    </div>
  )
}
