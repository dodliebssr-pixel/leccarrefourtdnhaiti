import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Réservation & Paiement · LeCarrefour" },
      { name: "description", content: "Réservez votre événement et réglez en toute sécurité : Stripe, PayPal, MonCash et solutions locales haïtiennes." },
      { property: "og:title", content: "Réservation sécurisée · LeCarrefour" },
      { property: "og:description", content: "Paiement multi-devises, fluide et sécurisé." },
    ],
  }),
  component: Reservation,
});

const events = [
  { id: "mariage", label: "Mariage", base: 4500 },
  { id: "fiancailles", label: "Fiançailles", base: 2200 },
  { id: "anniversaire", label: "Anniversaire", base: 1800 },
  { id: "reunion", label: "Réunion d'affaires", base: 900 },
  { id: "formation", label: "Formation", base: 1200 },
  { id: "hommage", label: "Hommage / Funérailles", base: 1500 },
];

const currencies = [
  { code: "USD", symbol: "$", rate: 1 },
  { code: "HTG", symbol: "G", rate: 132 },
  { code: "EUR", symbol: "€", rate: 0.92 },
];

const methods = [
  { id: "stripe", label: "Carte bancaire", note: "Visa · Mastercard · Amex" },
  { id: "paypal", label: "PayPal", note: "Compte ou carte" },
  { id: "moncash", label: "MonCash", note: "Solution locale Digicel" },
  { id: "natcash", label: "NatCash", note: "Solution locale Natcom" },
];

function Reservation() {
  const [event, setEvent] = useState(events[0]);
  const [currency, setCurrency] = useState(currencies[0]);
  const [method, setMethod] = useState(methods[0].id);
  const [done, setDone] = useState(false);

  const total = Math.round(event.base * currency.rate);

  return (
    <div className="w-full pb-20 pt-24 sm:pb-24 sm:pt-32">
      <div className="container-luxe">
        <p className="eyebrow">Réservation</p>
        <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight text-charcoal md:text-6xl">
          Réservez votre date —<br /><span className="italic text-gold">en quelques instants.</span>
        </h1>

        <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-5">
          {/* Form */}
          <div className="min-w-0 lg:col-span-3">
            <form
              onSubmit={(e) => { e.preventDefault(); setDone(true); }}
              className="space-y-10"
            >
              <fieldset>
                <legend className="eyebrow">1 · Type d'événement</legend>
                <div className="mt-5 grid grid-cols-1 gap-2 min-[360px]:grid-cols-2 sm:grid-cols-3">
                  {events.map((e) => (
                    <button
                      type="button"
                      key={e.id}
                      onClick={() => setEvent(e)}
                      className={`border p-4 text-left text-sm transition-all ${
                        event.id === e.id
                          ? "border-charcoal bg-charcoal text-ivory"
                          : "border-border text-charcoal-soft hover:border-charcoal"
                      }`}
                    >
                      {e.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="eyebrow">2 · Coordonnées</legend>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Input label="Nom complet" required />
                  <Input label="Email" type="email" required />
                  <Input label="Téléphone" type="tel" />
                  <Input label="Date souhaitée" type="date" />
                </div>
              </fieldset>

              <fieldset>
                <legend className="eyebrow">3 · Devise</legend>
                <div className="mt-5 flex flex-wrap gap-2">
                  {currencies.map((c) => (
                    <button
                      type="button"
                      key={c.code}
                      onClick={() => setCurrency(c)}
                      className={`min-w-20 flex-1 border px-4 py-3 text-xs uppercase tracking-[0.18em] transition-all sm:px-5 sm:tracking-[0.22em] ${
                        currency.code === c.code
                          ? "border-charcoal bg-charcoal text-ivory"
                          : "border-border text-charcoal-soft hover:border-charcoal"
                      }`}
                    >
                      {c.code}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="eyebrow">4 · Mode de paiement</legend>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {methods.map((m) => (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={`grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border p-4 text-left transition-all ${
                        method === m.id
                          ? "border-charcoal"
                          : "border-border hover:border-charcoal/60"
                      }`}
                    >
                       <div className="min-w-0">
                        <div className="text-sm text-charcoal">{m.label}</div>
                        <div className="mt-1 text-xs text-charcoal-soft">{m.note}</div>
                      </div>
                      <div className={`mt-1 h-3 w-3 rounded-full border ${method === m.id ? "border-gold bg-gold" : "border-border"}`} />
                    </button>
                  ))}
                </div>
              </fieldset>

              <button
                type="submit"
                className="w-full border border-charcoal bg-charcoal px-3 py-5 text-xs uppercase tracking-[0.18em] text-ivory transition-all hover:border-gold hover:bg-gold hover:text-charcoal sm:tracking-[0.3em]"
              >
                {done ? "Demande envoyée ✓" : "Confirmer la demande"}
              </button>
              <p className="text-center text-[0.65rem] uppercase tracking-[0.22em] text-charcoal-soft">
                🔒 Paiement sécurisé · Aucune somme prélevée avant validation
              </p>
            </form>
          </div>

          {/* Summary */}
          <aside className="min-w-0 lg:col-span-2">
            <div className="sticky top-28 border border-border bg-secondary p-5 sm:p-8">
              <p className="eyebrow">Récapitulatif</p>
              <div className="hairline mt-4 w-16" />

              <dl className="mt-8 space-y-4 text-sm">
                <Row k="Événement" v={event.label} />
                <Row k="Annulation" v="Souple jusqu'à 30j avant" />
              </dl>

              <div className="hairline my-8" />

              <p className="text-xs leading-loose text-charcoal-soft">
                Un conseiller vous recontacte sous 24h pour confirmer
                disponibilité, modalités et personnaliser votre devis.
              </p>

              <div className="mt-8 flex flex-wrap gap-2 text-[0.6rem] uppercase tracking-[0.22em] text-charcoal-soft">
                <span className="border border-border px-3 py-1">Stripe</span>
                <span className="border border-border px-3 py-1">PayPal</span>
                <span className="border border-border px-3 py-1">MonCash</span>
                <span className="border border-border px-3 py-1">NatCash</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="block text-[0.65rem] uppercase tracking-[0.22em] text-charcoal-soft">{label}</span>
      <input
        {...props}
        className="mt-2 w-full border-0 border-b border-border bg-transparent py-3 text-sm text-charcoal outline-none transition-colors focus:border-gold"
      />
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:items-baseline sm:gap-4">
      <dt className="text-charcoal-soft">{k}</dt>
      <dd className="font-serif text-charcoal sm:text-right">{v}</dd>
    </div>
  );
}
