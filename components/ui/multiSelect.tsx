'use client'

import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useComponentWidth } from '@/core/hooks/useComponentWidth'
import { stopPropagation } from '@/core/utils/stopPropagation'
import { ChevronsUpDown, X } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

const MAX_OFFSET = 64

export type MultiSelectOption = {
  label: string
  value: string
}

type MultiSelectProps = {
  isMulti?: boolean
  selectAllButtonVisible?: boolean
  placeholder?: string
  noOptionsMessage?: string
  onInputChange?: (value: string) => void
  isLoading?: boolean
  chevronIcon?: JSX.Element
  isSearchable?: boolean
  options?: MultiSelectOption[]
  label?: string
  error?: string
  onChange?: (
    option: MultiSelectOption[] | MultiSelectOption | undefined | null,
  ) => void
  selectAllOptionsLabel?: string
  disabled?: boolean
  defaultValue?: MultiSelectOption | MultiSelectOption[]
  isClearable?: boolean
  value?: MultiSelectOption[] | MultiSelectOption | null
  modal?: boolean
  creatable?: boolean
  creatableLabel?: (value: string) => string
  multiSelectLimit?: number
}

export function MultiSelect({
  placeholder = 'Selecione...',
  isMulti,
  noOptionsMessage = 'Não há opções',
  isSearchable = true,
  onInputChange,
  options = [],
  label,
  error,
  onChange,
  selectAllOptionsLabel = 'Todos',
  selectAllButtonVisible = true,
  disabled = false,
  defaultValue,
  modal = false,
  multiSelectLimit,
  chevronIcon: ChevronIcon = (
    <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
  ),
  isClearable = false,
  value,
}: MultiSelectProps) {
  const [buttonRef, buttonWidth] = useComponentWidth<HTMLButtonElement>()
  const [filterSearch, setFilterSearch] = useState('')
  const [internalValues, setInternalValues] = useState<MultiSelectOption[]>(
    defaultValue
      ? Array.isArray(defaultValue)
        ? defaultValue
        : defaultValue
          ? [defaultValue]
          : []
      : [],
  )
  const [spanRef, spanWidth] = useComponentWidth<HTMLSpanElement>()
  const [open, setOpen] = useState(false)

  const values = useMemo(() => {
    if (!value) {
      return internalValues
    }

    return Array.isArray(value) ? value : [value]
  }, [internalValues, value])

  const handleInputChange = useCallback(
    (value: string) => {
      setFilterSearch(value)
      if (onInputChange) {
        onInputChange(value)
      }
    },
    [onInputChange],
  )

  function unaccent(str: string): string {
    return str
      .toUpperCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\s]/g, '')
  }

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        unaccent(option?.label).includes(unaccent(filterSearch)),
      ),
    [filterSearch, options],
  )

  const handleSelectValue = (option: MultiSelectOption) => {
    let newValues: MultiSelectOption[]
    if (isMulti && (!multiSelectLimit || multiSelectLimit !== 1)) {
      newValues = values?.some((o) => o.value === option.value)
        ? values.filter((state) => state.value !== option.value)
        : [...values, option]
    } else {
      newValues = [option]
    }
    if (value === undefined) {
      setInternalValues(newValues)
    }
    onChange?.(isMulti ? newValues : newValues[0])
  }

  const handleSelectAll = useCallback(() => {
    const newValues =
      values.length === options.length && options.length !== 0 ? [] : options
    if (value === undefined) {
      setInternalValues(newValues)
    }
    onChange?.(newValues)
  }, [options, values, value, onChange])

  const handleClear = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault()
      if (value === undefined) {
        setInternalValues([])
      }
      onChange?.([])
    },
    [value, onChange],
  )

  const isIndeterminate = useMemo(
    () => values.length > 0 && values.length < options.length,
    [options.length, values.length],
  )

  useEffect(() => {
    if (
      value !== undefined &&
      value !== null &&
      JSON.stringify(value) !== JSON.stringify(internalValues)
    ) {
      setInternalValues(Array.isArray(value) ? value : [value])
    }
  }, [value, internalValues])

  return (
    <div className="flex flex-col gap-4">
      {label && (
        <label className="text-sm text-neutral-900 font-semibold">
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen} modal={modal}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            aria-expanded={open}
            variant="outline"
            role="combobox"
            className="hover:border-brand relative border border-solid justify-between overflow-hidden text-neutral-900 transition-none hover:bg-brand/5 data-[state=open]:bg-brand/5"
            ref={buttonRef}
          >
            <span
              data-hide={spanWidth >= buttonWidth - MAX_OFFSET}
              ref={spanRef}
              className="opacity-1 data-[hide=true]:absolute data-[hide=true]:opacity-0"
            >
              {values?.length > 0
                ? values?.map((option) => option?.label).join(', ')
                : placeholder}
            </span>

            {spanWidth >= buttonWidth - MAX_OFFSET && <span />}

            <span
              data-hide={!(spanWidth >= buttonWidth - MAX_OFFSET)}
              className="opacity-1 center absolute bottom-0 left-4 right-0 top-0 self-center text-left data-[hide=true]:opacity-0"
            >
              {values.length.toString().padStart(2, '0')} Selecionado
              {values.length > 1 && '(s)'}
            </span>
            <div className="absolute right-9 z-100">
              {isClearable && values.length > 0 && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      tabIndex={-1}
                      onClick={handleClear}
                      className="size-6 flex items-center justify-center hover:bg-black/5 transition-colors"
                    >
                      <X className="size-4 text-neutral-500" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span>Limpar</span>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            {ChevronIcon}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] max-h-60 overflow-y-auto p-0">
          <Command shouldFilter={false}>
            {isSearchable && (
              <CommandInput
                value={filterSearch}
                placeholder={placeholder}
                onValueChange={handleInputChange}
                className="h-9"
              />
            )}
            <CommandEmpty>{noOptionsMessage}</CommandEmpty>
            <CommandGroup>
              {isMulti && selectAllButtonVisible && (
                <button className="w-full" onClick={handleSelectAll}>
                  <CommandItem className="flex items-center gap-2">
                    <Checkbox
                      onCheckedChange={handleSelectAll}
                      checked={
                        isIndeterminate
                          ? 'indeterminate'
                          : values.length === options.length
                      }
                      onClick={stopPropagation}
                    />
                    {selectAllOptionsLabel}
                  </CommandItem>
                </button>
              )}
              {filteredOptions?.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  className="flex items-center gap-2"
                  onSelect={() => handleSelectValue(option)}
                >
                  {isMulti && (
                    <Checkbox
                      onChange={() => handleSelectValue(option)}
                      checked={values.some((o) => o.value === option.value)}
                    />
                  )}
                  {option?.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <span
        data-visible={!!error}
        className="text-red-500 leading-none text-sm data-[visible=true]:animate-in data-[visible=false]:animate-out data-[visible=true]:fade-in-0 data-[visible=false]:fade-out-0"
      >
        {error}
      </span>
    </div>
  )
}
