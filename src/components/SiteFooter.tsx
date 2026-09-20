import { Link } from "@tanstack/react-router";
import { WHATSAPP_NUMBERS } from "@/components/WhatsAppFab";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border bg-charcoal text-ivory">
      <div className="container-luxe grid gap-10 py-16 sm:py-20 md:grid-cols-4 md:gap-12">
        <div className="min-w-0 md:col-span-2">
          <div className="font-serif text-3xl">LeCarrefour</div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/70">
            Complexe événementiel d'exception à Trou-du-Nord. L'art de recevoir,
            avec la discrétion qui fait la différence.
          </p>
          <div className="hairline mt-8 max-w-xs" />
          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-gold">
            Ravines Charles Roucou · Route Pillette
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-ivory/50">
            Trou-du-Nord · Haïti
          </p>
        </div>

        <div className="min-w-0">
          <p className="eyebrow !text-gold">Découvrir</p>
          <ul className="mt-5 space-y-3 text-sm text-ivory/80">
            <li><Link to="/portfolio" className="hover:text-gold">Portfolio</Link></li>
            <li><Link to="/hommage" className="hover:text-gold">Hommage</Link></li>
            <li><Link to="/rental" className="hover:text-gold">Rental Collection</Link></li>
            <li><Link to="/reservation" className="hover:text-gold">Réservation</Link></li>
          </ul>
        </div>

        <div className="min-w-0">
          <p className="eyebrow !text-gold">Contact</p>
          <ul className="mt-5 space-y-3 text-sm text-ivory/80">
            <li>Haïti · <a href="tel:+50933198844" className="hover:text-gold">+509 3319 8844</a></li>
            <li>Haïti · <a href="tel:+50940755948" className="hover:text-gold">+509 4075 5948</a></li>
            <li>International · <a href="tel:+15142994965" className="hover:text-gold">+1 514 299 4965</a></li>
            <li><a href="mailto:gestionlecarrefour@yahoo.com" className="break-all hover:text-gold">gestionlecarrefour@yahoo.com</a></li>
            <li><a href="mailto:lecarrefourtdn@gmail.com" className="break-all hover:text-gold">lecarrefourtdn@gmail.com</a></li>
            <li className="flex flex-wrap gap-x-4 gap-y-2 pt-3">
              {WHATSAPP_NUMBERS.map((n, i) => (
                <a key={n.href} href={n.href} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  {i === 2 ? "WhatsApp Intl" : `WhatsApp HT${i === 1 ? " 2" : ""}`}
                </a>
              ))}
              <a href="#" className="hover:text-gold">Instagram</a>
              <a href="#" className="hover:text-gold">Facebook</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="container-luxe flex flex-col gap-2 py-6 text-[0.7rem] uppercase tracking-[0.22em] text-ivory/40 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} LeCarrefour · Tous droits réservés</span>
          <span>Quiet Luxury · Trou-du-Nord</span>
        </div>
      </div>
    </footer>
  );
}
