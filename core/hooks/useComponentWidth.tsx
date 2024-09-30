import { RefObject, useLayoutEffect, useRef, useState } from 'react'

export function useComponentWidth<T = HTMLDivElement>(
  ...deps: unknown[]
): [RefObject<T>, number] {
  const [width, setWidth] = useState(0)
  const componentRef = useRef<T>(null)

  useLayoutEffect(() => {
    if (componentRef.current) {
      setWidth((componentRef.current as unknown as HTMLDivElement).offsetWidth)
    }

    return () => {
      setWidth(0)
    }
  }, [deps])

  return [componentRef, width]
}
