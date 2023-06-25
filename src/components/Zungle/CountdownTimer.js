import React, { useState, useEffect } from "react";

function CountdownTimer({ epochTime }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(epochTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(epochTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [epochTime]);

  function calculateTimeLeft(epochTime) {
    const totalSeconds = (epochTime - Date.now()) / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return { hours, minutes, seconds };
  }

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  return (
    <div>
      <span>
        {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
        {formatTime(timeLeft.seconds)}
      </span>
    </div>
  );
}

export default CountdownTimer;
