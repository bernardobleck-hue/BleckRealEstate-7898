import { useEffect, useState } from "react";

function subscribe(query: string, cb: (matches: boolean) => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(query);
  const handler = (e: MediaQueryListEvent) => cb(e.matches);
  cb(mql.matches);
  mql.addEventListener("change", handler);
  return () => mql.removeEventListener("change", handler);
}

export function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(initial);
  useEffect(() => subscribe(query, setMatches), [query]);
  return matches;
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * True when the visitor is on a small screen — used to skip the WebGL hero so
 * mobile stays fast (mobile speed is a conversion factor, the 3D is not).
 */
export function useIsSmallScreen() {
  return useMediaQuery("(max-width: 900px)", typeof window !== "undefined" && window.innerWidth < 900);
}
