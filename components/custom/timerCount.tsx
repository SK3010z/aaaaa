'use client'

import { useEffect, useState } from 'react'

interface TimerCountProps {
  startDate?: Date
  closedAt?: Date
}

export function TimerCount({ startDate, closedAt }: TimerCountProps) {
  const [elapsedTime, setElapsedTime] = useState<string>('00:00:00')

  useEffect(() => {
    if (!startDate) return

    const calculateElapsedTime = () => {
      const endTime = closedAt
        ? new Date(closedAt).getTime()
        : new Date().getTime()
      const startTime = new Date(startDate).getTime()
      const timeDiff = endTime - startTime

      const hours = Math.floor(timeDiff / (1000 * 60 * 60))
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

      return [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0'),
      ].join(':')
    }

    if (closedAt) {
      setElapsedTime(calculateElapsedTime())
    } else {
      const interval = setInterval(() => {
        setElapsedTime(calculateElapsedTime())
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [startDate, closedAt])

  return <div className="w-16 text-center">{elapsedTime}</div>
}
