export function getInitials(name?: string) {
  if (!name) {
    return ''
  }

  const names = name.split(' ')
  const initials = names[0][0] + (names[1]?.[0] || '')
  return initials.toUpperCase() 
}
