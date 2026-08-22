import { useEffect, useState, useRef } from "react";

interface StatCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  title?: string;
}

const StatCounter = ({ end, duration = 2000, suffix = "", prefix = "", title }: StatCounterProps) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuad = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOutQuad * end);

      setCount(currentCount);

      if (now < endTime) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isVisible, end, duration]);

  return (
    <div>
      <span ref={countRef} className="animate-counter block text-3xl md:text-4xl font-bold text-primary">
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </span>
      {title && <span className="mt-1 block text-sm text-muted-foreground">{title}</span>}
    </div>
  );
};

export default StatCounter;
