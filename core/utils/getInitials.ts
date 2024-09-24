export function getInitials(name?: string) {
  if (!name) {
    return ''
  }

  const names = name.split(' ').slice(0, 2)
  const initials = names[0][0] + names[1][0]
  return initials
}
