import { ChevronDown, Plus } from 'lucide-react'
import Select, { CreatableProps } from 'react-select/creatable'

type Option = {
  label: string
  value: string
}

type Props = CreatableProps<Option, false, never> & {
  label?: string
  error?: string
}

export function CreatableSelect({ label, error, inputId, ...rest }: Props) {
  return (
    <div className="flex flex-col w-full gap-4">
      {label && (
        <label
          htmlFor={inputId}
          className="text-neutral-900 text-base leading-none w-fit"
        >
          {label}
        </label>
      )}
      <Select
        inputId={inputId}
        components={{
          DropdownIndicator: ({ isFocused }) => (
            <div className="px-2">
              <ChevronDown
                className={`size-4 text-neutral-400 transition-transform ${isFocused ? 'rotate-180' : 'rotate-0'}`}
              />
            </div>
          ),
        }}
        classNames={{
          container: () => 'w-full !border-0 shadow-none',
          control: ({ isFocused }) =>
            `!rounded-full !shadow-none border ${isFocused ? '!border-primary' : '!border-neutral-200'}`,
          menu: () => 'rounded-lg',
          option: ({ isFocused, isSelected }) =>
            `!text-sm hover:bg-primary/10 transition-colors truncate ${isFocused && !isSelected ? '!bg-primary/10' : ''} ${isSelected ? '!bg-primary' : ''}`,
          singleValue: () => '!text-sm',
          indicatorSeparator: () => 'hidden',
        }}
        formatCreateLabel={(inputValue) => (
          <div className="flex items-center gap-2">
            <Plus className="size-4" />
            <span>Adicionar: {inputValue}</span>
          </div>
        )}
        placeholder="Selecione.."
        {...rest}
      />
      {error && <span>{error}</span>}
    </div>
  )
}
