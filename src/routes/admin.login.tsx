import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { verifyAdminAccess } from "@/lib/api/admin.functions";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Connexion administrateur · LeCarrefour" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError("Identifiants invalides. Vérifiez votre email et votre mot de passe.");
      setPending(false);
      return;
    }

    try {
      await verifyAdminAccess();
      await navigate({ to: "/admin/dashboard", replace: true });
    } catch {
      await supabase.auth.signOut();
      setError("Ce compte n'est pas autorisé à accéder à l'administration.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-[#f2eee5] text-[#242729] lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.8fr)]">
      <section className="relative hidden min-h-screen overflow-hidden bg-[#202729] p-12 text-[#f7f3eb] lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(135deg, transparent 45%, #c6a568 45.2%, transparent 45.5%), linear-gradient(35deg, transparent 64%, #f7f3eb 64.2%, transparent 64.4%)" }} />
        <div className="relative font-serif text-3xl">LeCarrefour</div>
        <div className="relative max-w-xl pb-8">
          <p className="text-xs uppercase tracking-[0.28em] text-[#d2b675]">Espace privé</p>
          <h1 className="mt-5 font-serif text-6xl leading-tight">Les chiffres,<br /><span className="italic text-[#d2b675]">sans détour.</span></h1>
        </div>
        <p className="relative text-xs uppercase tracking-[0.2em] text-white/50">Administration · Trou-du-Nord, Haïti</p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-16 sm:px-10">
        <div className="w-full max-w-md">
          <p className="text-xs uppercase tracking-[0.24em] text-[#96763b]">LeCarrefour · Administration</p>
          <h2 className="mt-5 font-serif text-4xl">Connexion</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#66645f]">Accès réservé aux comptes administrateurs autorisés.</p>

          <form onSubmit={submit} className="mt-10 space-y-6">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.16em] text-[#66645f]">Email</span>
              <input
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full border-0 border-b border-[#c9c1b2] bg-transparent px-0 py-3 text-base outline-none focus:border-[#96763b]"
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.16em] text-[#66645f]">Mot de passe</span>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full border-0 border-b border-[#c9c1b2] bg-transparent px-0 py-3 text-base outline-none focus:border-[#96763b]"
              />
            </label>

            {error && <p role="alert" className="border-l-2 border-red-700 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

            <button
              type="submit"
              disabled={pending}
              className="w-full bg-[#242729] px-5 py-4 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#96763b] disabled:cursor-wait disabled:opacity-60"
            >
              {pending ? "Vérification…" : "Se connecter"}
            </button>
          </form>
          <a href="/" className="mt-8 inline-block text-sm text-[#66645f] underline-offset-4 hover:text-[#96763b] hover:underline">Retour au site</a>
        </div>
      </section>
    </main>
  );
}