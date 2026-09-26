import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { WHATSAPP_MESSAGE, PHONES } from "@/components/WhatsAppFab";

function PhoneRow({ label, display, e164, wa }: { label: string; display: string; e164: string; wa: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(e164);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="grid w-full grid-cols-1 items-center gap-3 sm:grid-cols-[auto_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1fr)_auto_auto]">
      <span className="text-[0.65rem] uppercase tracking-[0.2em] text-charcoal-soft">{label}</span>
      <a href={`tel:${e164}`} className="text-base text-charcoal hover:text-gold">{display}</a>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copier le numéro ${display}`}
        className="w-fit border border-border px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.16em] text-charcoal-soft transition-colors hover:border-charcoal hover:text-charcoal"
      >
        {copied ? "Copié ✓" : "Copier le numéro"}
      </button>
      <a
        href={`https://wa.me/${wa}?text=${WHATSAPP_MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-fit border border-gold px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.16em] text-gold transition-colors hover:bg-gold hover:text-charcoal"
      >
        WhatsApp
      </a>
    </div>
  );
}

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Accès · LeCarrefour" },
      { name: "description", content: "Nous trouver à Ravines Charles Roucou, Route Pillette, Trou-du-Nord. WhatsApp, téléphone, réseaux sociaux." },
      { property: "og:title", content: "Contact · LeCarrefour" },
      { property: "og:description", content: "Ravines Charles Roucou · Route Pillette · Trou-du-Nord, Haïti." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="w-full pt-24 sm:pt-32">
      <header className="container-luxe py-12 sm:py-16">
        <p className="eyebrow">Contact & Accès</p>
        <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight text-charcoal sm:text-5xl md:text-7xl">
          Une conversation,<br /><span className="italic text-gold">le début d'un grand moment.</span>
        </h1>
      </header>

      <section className="container-luxe grid gap-12 pb-20 sm:pb-24 lg:grid-cols-2">
        <div className="min-w-0 space-y-10">
          <Block title="Adresse">
            Ravines Charles Roucou<br />
            Route Pillette<br />
            Trou-du-Nord · Haïti
          </Block>
          <Block title="Téléphone & WhatsApp">
            <div className="space-y-4">
              {PHONES.map((p) => (
                <PhoneRow key={p.e164} {...p} />
              ))}
            </div>
          </Block>
          <Block title="Email">
            <a href="mailto:gestionlecarrefour@yahoo.com" className="break-all hover:text-gold">gestionlecarrefour@yahoo.com</a><br />
            <a href="mailto:lecarrefourtdn@gmail.com" className="break-all hover:text-gold">lecarrefourtdn@gmail.com</a>
          </Block>
          <Block title="Horaires">
            Lundi – Samedi · 08h – 19h<br />
            Dimanche · sur rendez-vous
          </Block>
          <Block title="Réseaux">
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="#" className="hover:text-gold">Instagram</a>
              <a href="#" className="hover:text-gold">Facebook</a>
              <a href="https://www.facebook.com/share/16CRYLuKrCJ/" target="_blank" rel="noopener noreferrer" className="hover:text-gold">Facebook 2</a>
              <a href="#" className="hover:text-gold">TikTok</a>
              <a href={`https://wa.me/50933198844?text=${WHATSAPP_MESSAGE}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold">WhatsApp</a>
            </div>
          </Block>
        </div>

        <div className="min-w-0 space-y-4">
          <div className="aspect-[4/5] w-full overflow-hidden border border-border bg-secondary">
            <iframe
              title="Carte LeCarrefour Trou-du-Nord"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-72.0%2C19.6%2C-71.7%2C19.8&layer=mapnik&marker=19.7%2C-71.85"
              className="h-full w-full grayscale-[0.4]"
              loading="lazy"
            />
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Trou-du-Nord+Haiti"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.25em] text-gold hover:text-charcoal"
          >
            Ouvrir dans Google Maps →
          </a>
        </div>
      </section>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <div className="hairline mt-4 w-12" />
      <div className="mt-4 text-base leading-loose text-charcoal-soft">{children}</div>
    </div>
  );
}
