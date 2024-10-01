import { MouseEvent } from 'react'

export function stopPropagation(
  event: MouseEvent<HTMLInputElement | HTMLDivElement | HTMLButtonElement>,
) {
  event.stopPropagation()
}
