import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { collectAnalyticsEvent } from "@/lib/api/analytics.functions";

type DeviceType = "mobile" | "desktop" | "tablet" | "unknown";
type TrafficSource = "google" | "facebook" | "whatsapp" | "tiktok" | "instagram" | "direct" | "other";

function getStoredId(storage: Storage, key: string) {
  const existing = storage.getItem(key);
  if (existing) return existing;

  const id = crypto.randomUUID();
  storage.setItem(key, id);
  return id;
}

function getTechnology() {
  const userAgent = navigator.userAgent;
  const deviceType: DeviceType = /iPad|Tablet/i.test(userAgent)
    ? "tablet"
    : /Mobi|iPhone|Android.*Mobile/i.test(userAgent)
      ? "mobile"
      : "desktop";
  const browser = /Edg\//.test(userAgent)
    ? "Edge"
    : /Firefox\//.test(userAgent)
      ? "Firefox"
      : /Chrome\//.test(userAgent)
        ? "Chrome"
        : /Safari\//.test(userAgent)
          ? "Safari"
          : "Other";
  const operatingSystem = /Windows/i.test(userAgent)
    ? "Windows"
    : /Android/i.test(userAgent)
      ? "Android"
      : /iPhone|iPad|iPod/i.test(userAgent)
        ? "iOS"
        : /Mac OS/i.test(userAgent)
          ? "macOS"
          : /Linux/i.test(userAgent)
            ? "Linux"
            : "Other";

  return { deviceType, browser, operatingSystem };
}

function getTrafficSource(): TrafficSource {
  const params = new URLSearchParams(window.location.search);
  const campaignSource = params.get("utm_source")?.toLowerCase() ?? "";
  const referrer = document.referrer.toLowerCase();
  const source = `${campaignSource} ${referrer}`;

  if (!source.trim()) return "direct";
  if (source.includes("google")) return "google";
  if (source.includes("facebook") || source.includes("fb.com")) return "facebook";
  if (source.includes("whatsapp") || source.includes("wa.me")) return "whatsapp";
  if (source.includes("tiktok")) return "tiktok";
  if (source.includes("instagram")) return "instagram";
  return campaignSource || referrer ? "other" : "direct";
}

function getReferrerHost() {
  try {
    return document.referrer ? new URL(document.referrer).hostname : null;
  } catch {
    return null;
  }
}

export function SiteAnalytics() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const lastPath = useRef("");

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    let visitorId: string;
    let sessionId: string;
    try {
      visitorId = getStoredId(window.localStorage, "lecarrefour_analytics_visitor");
      sessionId = getStoredId(window.sessionStorage, "lecarrefour_analytics_session");
    } catch {
      return;
    }

    const technology = getTechnology();
    const referrerHost = getReferrerHost();
    const trafficSource = getTrafficSource();
    const send = (event: "pageview" | "heartbeat") => {
      void collectAnalyticsEvent({
        data: {
          event,
          visitorId,
          sessionId,
          path: window.location.pathname,
          referrerHost,
          ...technology,
          trafficSource,
        },
      }).catch(() => undefined);
    };

    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      send("pageview");
    }

    const heartbeat = window.setInterval(() => {
      if (document.visibilityState === "visible") send("heartbeat");
    }, 30_000);
    return () => window.clearInterval(heartbeat);
  }, [pathname]);

  return null;
}