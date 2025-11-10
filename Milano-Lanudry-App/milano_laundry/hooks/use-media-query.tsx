"use client";

import { useEffect, useState } from "react";

/**
 * Returns true if the media query matches.
 * SSR-safe: initial value is `false` on the server and updated on mount.
 *
 * @param query CSS media query string, e.g. "(max-width: 992px)"
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mq = window.matchMedia(query);

    // set initial client value
    setMatches(mq.matches);

    const handler = (ev: MediaQueryListEvent) => setMatches(ev.matches);

    // modern browsers support addEventListener on MediaQueryList
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }

    // fallback for older browsers
    mq.addListener(handler);
    return () => mq.removeListener(handler);
  }, [query]);

  return matches;
}
