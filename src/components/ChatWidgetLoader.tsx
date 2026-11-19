"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const GuiaChatWidget = dynamic(() => import("./GuiaChatWidget"), { ssr: false });

/**
 * Mounts the AI chat only after the page is idle, so it never competes with LCP/content
 * loading (no impact on Core Web Vitals or indexable HTML).
 */
export default function ChatWidgetLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | undefined;
    const timer = window.setTimeout(() => {
      if (w.requestIdleCallback) idleId = w.requestIdleCallback(() => setReady(true), { timeout: 3000 });
      else setReady(true);
    }, 2500);
    return () => {
      window.clearTimeout(timer);
      if (idleId !== undefined && w.cancelIdleCallback) w.cancelIdleCallback(idleId);
    };
  }, []);

  return ready ? <GuiaChatWidget /> : null;
}
