"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

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
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Following a link to another page: freeze smooth scrolling on the spot, so a glide still in
    // progress (Lenis eases on for about a second after the wheel stops) cannot carry over and pull
    // the new page down. Restarted once the new page is at the top (below), or after a timeout if
    // the navigation never happens.
    let resume = 0;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.hash || url.pathname === window.location.pathname) return;
      lenis.stop();
      window.clearTimeout(resume);
      resume = window.setTimeout(() => lenis.start(), 3000);
    };
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(resume);
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // New route: start at the top and let ScrollTrigger re-measure. Runs as a layout effect so the
  // new page is never painted at the previous page's scroll position. `force` because a menu that
  // locks page scroll (the mobile sheet) is still closing at this moment, and it is asserted once
  // more after that lock is released. Links to an anchor (#section) keep their own target.
  useLayoutEffect(() => {
    if (window.location.hash) return;
    const toTop = () => {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    };
    toTop();
    lenisRef.current?.start(); // frozen by the link click above
    const id = window.setTimeout(() => {
      toTop();
      ScrollTrigger.refresh();
    }, 350);
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
