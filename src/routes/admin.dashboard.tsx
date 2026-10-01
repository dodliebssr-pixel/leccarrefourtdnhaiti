import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Activity, Clock3, Eye, LogOut, Repeat2, UserRoundPlus, Users } from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { getAdminDashboard, verifyAdminAccess } from "@/lib/api/admin.functions";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Statistiques · Administration LeCarrefour" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});

type Period = "today" | "yesterday" | "7d" | "30d";
type Breakdown = { label: string; count: number };
type DashboardStats = {
  summary: {
    visitors: number;
    page_views: number;
    active_visitors: number;
    average_duration_seconds: number;
    new_visitors: number;
    returning_visitors: number;
  };
  daily: { date: string; visitors: number; pageViews: number }[];
  pages: Breakdown[];
  countries: Breakdown[];
  cities: Breakdown[];
  devices: Breakdown[];
  browsers: Breakdown[];
  operatingSystems: Breakdown[];
  sources: Breakdown[];
};

const periods: { id: Period; label: string }[] = [
  { id: "today", label: "Aujourd'hui" },
  { id: "yesterday", label: "Hier" },
  { id: "7d", label: "7 jours" },
  { id: "30d", label: "30 jours" },
];

const numberFormat = new Intl.NumberFormat("fr-FR");

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return minutes ? `${minutes} min ${remainingSeconds} s` : `${remainingSeconds} s`;
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<Period>("today");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadStats(showLoading: boolean) {
      if (showLoading && active) setLoading(true);
      setError("");
      try {
        await verifyAdminAccess();
        if (active) setAuthorized(true);
      } catch {
        await supabase.auth.signOut();
        if (active) await navigate({ to: "/admin/login", replace: true });
        return;
      }

      try {
        const data = await getAdminDashboard({ data: period });
        if (active) setStats(data as unknown as DashboardStats);
      } catch {
        if (active) setError("Les statistiques ne sont pas disponibles. Vérifiez la migration Supabase et réessayez.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadStats(true);
    const refresh = window.setInterval(() => void loadStats(false), 60_000);
    return () => {
      active = false;
      window.clearInterval(refresh);
    };
  }, [navigate, period]);

  async function logout() {
    await supabase.auth.signOut();
    await navigate({ to: "/admin/login", replace: true });
  }

  const summary = stats?.summary;
  const cards = [
    { label: "Visiteurs", value: summary?.visitors, icon: Users, accent: "text-[#147d75]" },
    { label: "Pages vues", value: summary?.page_views, icon: Eye, accent: "text-[#96763b]" },
    { label: "Actifs maintenant", value: summary?.active_visitors, icon: Activity, accent: "text-[#147d75]" },
    { label: "Durée moyenne", value: summary ? formatDuration(summary.average_duration_seconds) : undefined, icon: Clock3, accent: "text-[#96763b]" },
    { label: "Nouveaux", value: summary?.new_visitors, icon: UserRoundPlus, accent: "text-[#147d75]" },
    { label: "Récurrents", value: summary?.returning_visitors, icon: Repeat2, accent: "text-[#96763b]" },
  ];

  if (!authorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f3f1eb] px-5 text-sm text-[#66645f]">
        {error || "Vérification de l'accès administrateur…"}
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f1eb] text-[#242729]">
      <header className="border-b border-[#d8d3c8] bg-[#242729] text-[#f7f3eb]">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-4 px-4 py-5 sm:px-8">
          <div>
            <p className="font-serif text-2xl">LeCarrefour</p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-white/55">Statistiques du site</p>
          </div>
          <button onClick={logout} className="inline-flex items-center gap-2 border border-white/25 px-4 py-2.5 text-xs uppercase tracking-[0.13em] transition-colors hover:border-[#d2b675] hover:text-[#d2b675]">
            <LogOut size={15} aria-hidden="true" /> Déconnexion
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[90rem] px-4 py-8 sm:px-8 sm:py-12">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#96763b]">Vue d'ensemble</p>
            <h1 className="mt-2 font-serif text-4xl">Audience</h1>
          </div>
          <div className="flex flex-wrap gap-1 border border-[#d8d3c8] bg-white/60 p-1" role="group" aria-label="Période des statistiques">
            {periods.map((option) => (
              <button
                key={option.id}
                onClick={() => setPeriod(option.id)}
                aria-pressed={period === option.id}
                className={`px-3 py-2.5 text-xs transition-colors sm:px-4 ${period === option.id ? "bg-[#242729] text-white" : "text-[#66645f] hover:text-[#242729]"}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {error && <p role="alert" className="mt-6 border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

        <section aria-label="Indicateurs clés" className="mt-8 grid gap-px border border-[#d8d3c8] bg-[#d8d3c8] sm:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="min-h-32 bg-[#fbfaf7] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs uppercase tracking-[0.13em] text-[#77736b]">{card.label}</p>
                  <Icon size={17} className={card.accent} aria-hidden="true" />
                </div>
                <p className="mt-5 font-serif text-3xl">{loading ? "—" : typeof card.value === "number" ? numberFormat.format(card.value) : card.value ?? "—"}</p>
              </div>
            );
          })}
        </section>

        <section className="mt-8 border border-[#d8d3c8] bg-[#fbfaf7] p-4 sm:p-6">
          <div>
            <h2 className="font-serif text-2xl">Évolution du trafic</h2>
            <p className="mt-1 text-sm text-[#77736b]">Visiteurs uniques et pages vues par jour</p>
          </div>
          <div className="mt-6 h-72 w-full sm:h-80">
            {stats?.daily.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.daily} margin={{ top: 8, right: 12, left: -16, bottom: 4 }}>
                  <CartesianGrid stroke="#e7e2d8" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={(value: string) => new Date(`${value}T12:00:00`).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })} tickLine={false} axisLine={false} tick={{ fill: "#77736b", fontSize: 11 }} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: "#77736b", fontSize: 11 }} />
                  <Tooltip labelFormatter={(value) => new Date(`${value}T12:00:00`).toLocaleDateString("fr-FR")} contentStyle={{ border: "1px solid #d8d3c8", borderRadius: 0, background: "#fbfaf7" }} />
                  <Legend />
                  <Line type="monotone" dataKey="visitors" name="Visiteurs" stroke="#147d75" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="pageViews" name="Pages vues" stroke="#b48a3c" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : <div className="flex h-full items-center justify-center text-sm text-[#77736b]">{loading ? "Chargement des données…" : "Aucune donnée pour cette période"}</div>}
          </div>
        </section>

        <div className="mt-8 grid gap-8 xl:grid-cols-2">
          <BreakdownPanel title="Pages les plus visitées" rows={stats?.pages ?? []} empty={loading ? "Chargement…" : "Aucune page vue"} />
          <BreakdownPanel title="Sources de trafic" rows={stats?.sources ?? []} empty={loading ? "Chargement…" : "Aucune source détectée"} />
          <BreakdownPanel title="Pays" rows={stats?.countries ?? []} empty={loading ? "Chargement…" : "Aucune donnée de pays fournie par l'hébergeur."} />
          <BreakdownPanel title="Villes" rows={stats?.cities ?? []} empty={loading ? "Chargement…" : "Aucune ville fournie par l'hébergeur."} />
          <BreakdownPanel title="Appareils" rows={stats?.devices ?? []} empty={loading ? "Chargement…" : "Aucune donnée d'appareil"} />
          <BreakdownPanel title="Navigateurs" rows={stats?.browsers ?? []} empty={loading ? "Chargement…" : "Aucune donnée de navigateur"} />
          <BreakdownPanel title="Systèmes d'exploitation" rows={stats?.operatingSystems ?? []} empty={loading ? "Chargement…" : "Aucune donnée de système"} />
        </div>
        <p className="mt-8 text-xs leading-relaxed text-[#77736b]">Les visiteurs actifs correspondent aux visiteurs ayant envoyé un signal au cours des 5 dernières minutes. Les statistiques sont anonymes; aucune adresse IP n'est conservée.</p>
      </main>
    </div>
  );
}

function BreakdownPanel({ title, rows, empty }: { title: string; rows: Breakdown[]; empty: string }) {
  const max = Math.max(...rows.map((row) => row.count), 1);
  return (
    <section className="border border-[#d8d3c8] bg-[#fbfaf7] p-5 sm:p-6">
      <h2 className="font-serif text-2xl">{title}</h2>
      {rows.length ? (
        <ul className="mt-5 space-y-4">
          {rows.map((row) => (
            <li key={row.label}>
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <span className="break-all text-[#55534e]">{row.label}</span>
                <span className="shrink-0 tabular-nums">{numberFormat.format(row.count)}</span>
              </div>
              <div className="mt-2 h-1 bg-[#ebe7de]">
                <div className="h-full bg-[#147d75]" style={{ width: `${Math.max((row.count / max) * 100, 2)}%` }} />
              </div>
            </li>
          ))}
        </ul>
      ) : <p className="mt-5 text-sm text-[#77736b]">{empty}</p>}
    </section>
  );
}