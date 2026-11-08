import { useEffect, useState } from "react";

export const useCountdown = (initialTimer: number = 30) => {
  const [timer, setTimer] = useState(0);
  const isRunning = timer > 0;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const starCountdown = () => setTimer(initialTimer);

  return { timer, isRunning, starCountdown };
};
