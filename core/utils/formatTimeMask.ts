export function formatTimeMask(value: string): string {
  const cleanValue = value.replace(/\D/g, '')
  const maxLengthValue = cleanValue.slice(0, 4)
  if (maxLengthValue.length >= 3) {
    return `${maxLengthValue.slice(0, 2)}:${maxLengthValue.slice(2)}`
  } else if (maxLengthValue.length >= 1) {
    return `${maxLengthValue.slice(0, 2)}`
  }

  return maxLengthValue
}
