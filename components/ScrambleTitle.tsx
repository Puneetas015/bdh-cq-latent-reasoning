"use client";

import React, { useState, useEffect, useRef } from "react";

const GLYPHS = "ABCDEF0123456789_<>[]/~*";

export default function ScrambleTitle({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(text);
  const elementRef = useRef<HTMLHeadingElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let iteration = 0;

          const interval = setInterval(() => {
            setDisplay(
              text
                .split("")
                .map((char, index) => {
                  if (char === " " || char === "?" || char === "!" || char === ".") return char;
                  if (index < iteration) {
                    return text[index];
                  }
                  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
                })
                .join("")
            );

            if (iteration >= text.length) {
              clearInterval(interval);
            }
            iteration += 1 / 2;
          }, 35);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [text]);

  return (
    <h1 ref={elementRef} className={className}>
      {display}
    </h1>
  );
}