'use client'

import { useEffect, useState } from "react";

interface TimerCountProps {
  startDate?: Date;
} 

export function TimerCount({ startDate }: TimerCountProps) { 
  const [elapsedTime, setElapsedTime] = useState<string>('00:00:00'); 
  useEffect(() => {
    if (!startDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = now.getTime() - new Date(startDate).getTime();

      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      const formattedTime = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
      ].join(':');

      setElapsedTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [startDate]);

  return (
    <div className="w-16 text-center"> 
      {elapsedTime}
    </div>
  );
}
