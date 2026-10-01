import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const eventSchema = z.object({
  event: z.enum(["pageview", "heartbeat"]),
  visitorId: z.string().uuid(),
  sessionId: z.string().uuid(),
  path: z.string().min(1).max(2048),
  referrerHost: z.string().max(255).nullable(),
  deviceType: z.enum(["mobile", "desktop", "tablet", "unknown"]),
  browser: z.string().min(1).max(80),
  operatingSystem: z.string().min(1).max(80),
  trafficSource: z.enum(["google", "facebook", "whatsapp", "tiktok", "instagram", "direct", "other"]),
});

export const collectAnalyticsEvent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => eventSchema.parse(input))
  .handler(async ({ data }) => {
    const request = getRequest();
    const country = request.headers.get("cf-ipcountry")
      ?? request.headers.get("x-vercel-ip-country")
      ?? null;
    const encodedCity = request.headers.get("x-vercel-ip-city") ?? request.headers.get("cf-ipcity");
    let city: string | null = null;
    if (encodedCity) {
      try {
        city = decodeURIComponent(encodedCity).trim().slice(0, 80) || null;
      } catch {
        city = encodedCity.trim().slice(0, 80) || null;
      }
    }
    const { error } = await supabase.rpc("track_analytics_event", {
      p_event: data.event,
      p_visitor_id: data.visitorId,
      p_session_id: data.sessionId,
      p_path: data.path,
      p_referrer_host: data.referrerHost,
      p_device_type: data.deviceType,
      p_browser: data.browser,
      p_operating_system: data.operatingSystem,
      p_traffic_source: data.trafficSource,
      p_country: country,
      p_city: city,
    });

    if (error) {
      console.error("Unable to record site analytics", error.message);
      throw new Error("Unable to record analytics");
    }

    return { recorded: true as const };
  });