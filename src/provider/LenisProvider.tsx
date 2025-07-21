"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, createContext, useContext } from "react";
import gsap from "gsap";

const LenisContext = createContext<{ stop: () => void; start: () => void } | null>(null);

export function useLenis() {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenis must be used within a LenisProvider");
  }
  return context;
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef | null>(null);

  useEffect(() => {
    function update(time: number) {
      // lenisRef.current?.lenis?.raf を呼び出す
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  const stop = () => lenisRef.current?.lenis?.stop();
  const start = () => lenisRef.current?.lenis?.start();

  return (
    <LenisContext.Provider value={{ stop, start }}>
      <ReactLenis root ref={lenisRef} options={{ duration: 2 }}>
        {children}
      </ReactLenis>
    </LenisContext.Provider>
  );
}
