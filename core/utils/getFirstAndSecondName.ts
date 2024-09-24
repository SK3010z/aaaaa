export function getFirstAndSecondName(name?: string) {
  if (!name) {
    return ''
  }

  const names = name.split(' ').slice(0, 2)
  return names.join(' ')
}
