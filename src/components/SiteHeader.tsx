import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/hommage", label: "Hommage" },
  { to: "/rental", label: "Rental" },
  { to: "/reservation", label: "Réservation" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-ivory/85 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-8">
        <Link to="/" className="group flex min-w-0 items-baseline gap-2 overflow-hidden">
          <span className="truncate font-serif text-2xl tracking-tight text-charcoal">
            LeCarrefour
          </span>
          <span className="hidden text-[0.6rem] uppercase tracking-[0.3em] text-gold sm:inline">
            Haïti
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-wrap items-center justify-center gap-x-8 gap-y-2 md:flex lg:gap-x-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group relative text-xs uppercase tracking-[0.22em] text-charcoal-soft transition-colors hover:text-charcoal"
              activeProps={{ className: "text-charcoal" }}
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <Link
          to="/reservation"
          className="hidden md:inline-flex items-center gap-2 border border-charcoal/80 px-5 py-2.5 text-[0.7rem] uppercase tracking-[0.22em] text-charcoal transition-all hover:bg-charcoal hover:text-ivory"
        >
          Réserver
        </Link>

        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex shrink-0 flex-col gap-1.5 p-2 md:hidden"
        >
          <span className={`h-px w-6 bg-charcoal transition-all ${open ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-charcoal transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-charcoal transition-all ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="w-full max-w-[100vw] border-t border-border bg-ivory md:hidden">
          <div className="container-luxe flex flex-col py-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm uppercase tracking-[0.2em] text-charcoal"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
