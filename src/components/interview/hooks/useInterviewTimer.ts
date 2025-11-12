import { useEffect, useState } from "react";

type UseInterviewTimerProps = {
  onTimeExpired: () => void;
  initialTime?: number;
};

export const useInterviewTimer = ({
  onTimeExpired,
  initialTime = 60 * 60,
}: UseInterviewTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          onTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeExpired]);

  return { timeRemaining };
};
