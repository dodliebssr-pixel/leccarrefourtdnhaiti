import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const periodSchema = z.enum(["today", "yesterday", "7d", "30d"]);

export const requireAdmin = createMiddleware({ type: "function" })
  .middleware([requireSupabaseAuth])
  .server(async ({ context, next }) => {
    const claimEmail = typeof context.claims.email === "string"
      ? context.claims.email.trim().toLowerCase()
      : "";
    const allowedEmails = (process.env.ADMIN_EMAILS ?? "")
      .split(/[;,]/)
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean);

    if (!claimEmail || allowedEmails.length === 0 || !allowedEmails.includes(claimEmail)) {
      throw new Error("Forbidden");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin.auth.admin.getUserById(context.userId);
    const confirmedEmail = data.user?.email?.trim().toLowerCase();
    if (error || !data.user?.email_confirmed_at || confirmedEmail !== claimEmail) {
      throw new Error("Forbidden");
    }

    return next();
  });

export const verifyAdminAccess = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(() => ({ authorized: true as const }));

function haitiMidnightUtc(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Port-au-Prince",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const offsetParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Port-au-Prince",
    timeZoneName: "longOffset",
  }).formatToParts(date);
  const part = (type: string) => Number(parts.find((item) => item.type === type)?.value);
  const offset = offsetParts.find((item) => item.type === "timeZoneName")?.value.match(/GMT([+-])(\d{2}):(\d{2})/);
  const offsetMinutes = offset
    ? (offset[1] === "+" ? 1 : -1) * (Number(offset[2]) * 60 + Number(offset[3]))
    : 0;

  return new Date(Date.UTC(part("year"), part("month") - 1, part("day"), 0, -offsetMinutes));
}

function haitiDaysBefore(date: Date, days: number) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Port-au-Prince",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const part = (type: string) => Number(parts.find((item) => item.type === type)?.value);
  const targetDate = new Date(Date.UTC(part("year"), part("month") - 1, part("day") - days, 12));
  return haitiMidnightUtc(targetDate);
}

export const getAdminDashboard = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .inputValidator((input: unknown) => periodSchema.parse(input))
  .handler(async ({ data: period }) => {
    const now = new Date();
    const todayStart = haitiMidnightUtc(now);
    let from = todayStart;
    let to = now;

    if (period === "yesterday") {
      to = todayStart;
      from = haitiDaysBefore(now, 1);
    } else if (period === "7d") {
      from = haitiDaysBefore(now, 6);
    } else if (period === "30d") {
      from = haitiDaysBefore(now, 29);
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin.rpc("get_admin_site_stats", {
      p_from: from.toISOString(),
      p_to: to.toISOString(),
    });

    if (error) {
      console.error("Unable to load site analytics", error.message);
      throw new Error("Unable to load analytics");
    }

    return data;
  });