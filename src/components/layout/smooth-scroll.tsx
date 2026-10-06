"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

let active: Lenis | null = null;

/** The running Lenis instance, for components that need to scroll programmatically (null under reduced motion). */
export function getLenis() {
  return active;
}

/**
 * Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger pins stay in sync.
 * Not started at all when the user prefers reduced motion.
 */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: true });
    lenisRef.current = lenis;
    active = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      active = null;
    };
  }, []);

  // New route: start at the top and let ScrollTrigger re-measure.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => window.clearTimeout(id);
  }, [pathname]);

  // Re-measure scroll animations when the page height changes after load (web fonts, images,
  // lazily mounted sections). ScrollTrigger only refreshes on load/resize by itself, so without
  // this, sections that shift down keep their old trigger positions and animate in the wrong place.
  useEffect(() => {
    let timer = 0;
    let lastHeight = document.body.scrollHeight;
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastHeight) < 2) return; // ignore sub-pixel noise and refresh echoes
      lastHeight = h;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        ScrollTrigger.refresh();
        lastHeight = document.body.scrollHeight;
      }, 250);
    });
    ro.observe(document.body);
    return () => {
      ro.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
