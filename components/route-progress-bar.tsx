"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const MIN_PROGRESS = 0.14;
const MAX_PROGRESS = 0.9;
const TRICKLE_INTERVAL_MS = 160;
const COMPLETE_DELAY_MS = 180;
const RESET_DELAY_MS = 220;
const FALLBACK_RESET_MS = 6000;

function normalizeSearch(search: string) {
  return search.startsWith("?") ? search.slice(1) : search;
}

function buildRouteKey(pathname: string, search = "") {
  const normalizedSearch = normalizeSearch(search);
  return `${pathname || "/"}${normalizedSearch ? `?${normalizedSearch}` : ""}`;
}

function shouldIgnoreClick(event: MouseEvent) {
  return event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

function clearTimer(timerRef: { current: number | null }) {
  if (timerRef.current) {
    window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }
}

export function RouteProgressBar() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const routeKey = buildRouteKey(pathname, searchParams?.toString() || "");
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const currentRouteRef = useRef(routeKey);
  const firstRenderRef = useRef(true);
  const navigatingRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const trickleTimerRef = useRef<number | null>(null);
  const finishTimerRef = useRef<number | null>(null);
  const resetTimerRef = useRef<number | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      reducedMotionRef.current = media.matches;
    };

    syncPreference();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", syncPreference);
      return () => media.removeEventListener("change", syncPreference);
    }

    media.addListener(syncPreference);
    return () => media.removeListener(syncPreference);
  }, []);

  useEffect(() => {
    const stopProgressTimers = () => {
      clearTimer(trickleTimerRef);
      clearTimer(finishTimerRef);
      clearTimer(resetTimerRef);
      clearTimer(fallbackTimerRef);
    };

    const scheduleTrickle = () => {
      clearTimer(trickleTimerRef);

      if (reducedMotionRef.current) {
        setProgress(0.92);
        return;
      }

      trickleTimerRef.current = window.setTimeout(() => {
        setProgress((current) => {
          if (!navigatingRef.current) {
            return current;
          }

          const remaining = MAX_PROGRESS - current;
          const step = Math.max(0.02, remaining * 0.24);
          return remaining <= 0.01 ? current : Math.min(MAX_PROGRESS, current + step);
        });

        if (navigatingRef.current) {
          scheduleTrickle();
        }
      }, TRICKLE_INTERVAL_MS);
    };

    const resetProgress = () => {
      navigatingRef.current = false;
      setIsVisible(false);
      setIsComplete(false);
      setProgress(0);
    };

    const startProgress = (nextRouteKey: string) => {
      if (!nextRouteKey || nextRouteKey === currentRouteRef.current) {
        return;
      }

      navigatingRef.current = true;
      clearTimer(finishTimerRef);
      clearTimer(resetTimerRef);
      clearTimer(fallbackTimerRef);
      setIsVisible(true);
      setIsComplete(false);
      setProgress((current) => (current >= MIN_PROGRESS ? current : MIN_PROGRESS));
      scheduleTrickle();

      fallbackTimerRef.current = window.setTimeout(() => {
        clearTimer(trickleTimerRef);
        resetProgress();
      }, FALLBACK_RESET_MS);
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (shouldIgnoreClick(event)) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a[href]");

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      if ((anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download") || anchor.dataset.routeProgress === "ignore") {
        return;
      }

      try {
        const nextUrl = new URL(anchor.href, window.location.href);

        if (nextUrl.origin !== window.location.origin) {
          return;
        }

        startProgress(buildRouteKey(nextUrl.pathname, nextUrl.search));
      } catch (_error) {
        return;
      }
    };

    const handlePopState = () => {
      startProgress(buildRouteKey(window.location.pathname, window.location.search));
    };

    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("popstate", handlePopState);
      stopProgressTimers();
    };
  }, []);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      currentRouteRef.current = routeKey;
      return;
    }

    currentRouteRef.current = routeKey;

    if (!navigatingRef.current) {
      return;
    }

    navigatingRef.current = false;
    clearTimer(trickleTimerRef);
    clearTimer(fallbackTimerRef);
    clearTimer(finishTimerRef);
    clearTimer(resetTimerRef);
    setIsComplete(true);
    setProgress(1);

    finishTimerRef.current = window.setTimeout(() => {
      setIsVisible(false);
      resetTimerRef.current = window.setTimeout(() => {
        setIsComplete(false);
        setProgress(0);
      }, RESET_DELAY_MS);
    }, reducedMotionRef.current ? 80 : COMPLETE_DELAY_MS);
  }, [routeKey]);

  const className = ["route-progress", isVisible ? "route-progress--visible" : "", isComplete ? "route-progress--complete" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div aria-hidden="true" className={className}>
      <span className="route-progress-bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
