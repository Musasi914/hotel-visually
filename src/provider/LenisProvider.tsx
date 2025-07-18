"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef(null);
  useEffect(() => {
    function update(time: number) {
      // lenisRef.current の型を明示し、lenis プロパティへの型エラーを回避
      const lenisInstance = lenisRef.current as { lenis?: { raf: (t: number) => void } } | null;
      lenisInstance?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);
  return (
    <ReactLenis root ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}
