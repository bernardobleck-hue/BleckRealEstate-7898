import { useEffect, useRef, useState } from "react";

/**
 * Adds the `is-in` class once an element scrolls into view. One-shot: elements
 * never re-animate when scrolling back up.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.16) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || shown) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shown, threshold]);

  return { ref, className: shown ? "reveal is-in" : "reveal" };
}
