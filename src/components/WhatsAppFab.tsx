import { useState } from "react";

export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Bonjour LeCarrefour, je souhaite des informations et la disponibilité de la salle pour mon événement à Trou-du-Nord.",
);

export const PHONES = [
  { label: "Haïti", display: "+509 3319 8844", e164: "+50933198844", wa: "50933198844" },
  { label: "Haïti", display: "+509 4075 5948", e164: "+50940755948", wa: "50940755948" },
  { label: "International", display: "+1 514 299 4965", e164: "+15142994965", wa: "15142994965" },
];

export const WHATSAPP_NUMBERS = PHONES.map((p) => ({
  label: `${p.label} · ${p.display}`,
  href: `https://wa.me/${p.wa}?text=${WHATSAPP_MESSAGE}`,
}));

export function WhatsAppFab() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex max-w-[calc(100vw-2rem)] flex-col items-end gap-3 sm:bottom-6 sm:right-6 sm:max-w-[calc(100vw-3rem)]">
      {open && (
        <div className="flex w-full max-w-sm flex-col items-end gap-2">
          {WHATSAPP_NUMBERS.map((n) => (
            <a
              key={n.href}
              href={n.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit max-w-full border border-gold/40 bg-charcoal px-3 py-3 text-right text-[0.65rem] uppercase tracking-[0.16em] text-ivory shadow-elegant transition-colors hover:bg-gold hover:text-charcoal sm:px-4 sm:tracking-[0.2em]"
            >
              {n.label}
            </a>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="WhatsApp"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-charcoal text-ivory shadow-elegant ring-1 ring-gold/40 transition-all hover:scale-105 hover:bg-gold hover:text-charcoal"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
          <path d="M20.52 3.48A11.83 11.83 0 0 0 12.06 0C5.5 0 .17 5.33.17 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.85 11.85 0 0 0 5.75 1.47h.01c6.56 0 11.9-5.33 11.9-11.9 0-3.18-1.24-6.17-3.44-8.44ZM12.06 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.22-3.74.98 1-3.65-.24-.38a9.84 9.84 0 0 1-1.52-5.25c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 0 1 2.9 7c0 5.46-4.44 9.9-9.9 9.9Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.34Z"/>
        </svg>
      </button>
    </div>
  );
}
