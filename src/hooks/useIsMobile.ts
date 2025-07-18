import { useEffect, useState } from "react";

// 48rem = 768px
const QUERY = "(max-width: 48rem)";

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.matchMedia(QUERY).matches : false));

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const listener = () => {
      setIsMobile(media.matches);
      window.location.reload();
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  return isMobile;
}
