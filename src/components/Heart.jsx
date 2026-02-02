import React, { useMemo } from "react";

const HEART_COUNT = 40;
const HEARTS = ["🩷"];

const Heart = () => {
  const hearts = useMemo(() => {
    return Array.from({ length: HEART_COUNT }, (_, i) => ({
      id: i,
      char: HEARTS[i % HEARTS.length],
      left: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 4,
      size: 0.8 + Math.random() * 1.2,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {hearts.map(({ id, char, left, delay, duration, size }) => (
        <span
          key={id}
          className="heart-evaporate absolute text-2xl sm:text-3xl select-none"
          style={
            {
              left: `${left}%`,
              bottom: 0,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              ["--heart-scale"]: size,
            }
          }
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default Heart;
