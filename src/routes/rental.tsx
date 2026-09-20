import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import rental from "@/assets/images/rental.jpg";
import wedding from "@/assets/images/wedding.jpg";
import engagement from "@/assets/images/engagement.jpg";
import birthday from "@/assets/images/birthday.jpg";

export const Route = createFileRoute("/rental")({
  head: () => ({
    meta: [
      { title: "Rental Collection · LeCarrefour" },
      { name: "description", content: "Location d'articles de décoration haut de gamme : mobilier, vaisselle, candélabres, textiles." },
      { property: "og:title", content: "Rental Collection · LeCarrefour" },
      { property: "og:description", content: "Une collection exclusive pour sublimer chaque événement." },
      { property: "og:image", content: rental },
    ],
  }),
  component: Rental,
});

const collection = [
  { img: rental, name: "Candélabres en cristal", price: "À partir de 25 USD / pièce", cat: "Décoration" },
  { img: wedding, name: "Service de table doré", price: "À partir de 8 USD / couvert", cat: "Vaisselle" },
  { img: engagement, name: "Coupes champagne ciselées", price: "À partir de 3 USD / verre", cat: "Verrerie" },
  { img: birthday, name: "Drapés ivoire & or", price: "Sur devis", cat: "Textile" },
  { img: rental, name: "Chaises Chiavari or", price: "À partir de 5 USD / chaise", cat: "Mobilier" },
  { img: wedding, name: "Centres de table floraux", price: "À partir de 45 USD", cat: "Décoration" },
];

function Rental() {
  return (
    <div className="w-full pt-24 sm:pt-32">
      <header className="container-luxe py-12 sm:py-16">
        <p className="eyebrow">Rental Collection</p>
        <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight text-charcoal sm:text-5xl md:text-7xl">
          Des pièces choisies,<br /><span className="italic text-gold">une scénographie sur mesure.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-loose text-charcoal-soft">
          Notre collection rassemble mobilier, vaisselle et textiles d'exception
          — disponibles à la location pour les événements organisés chez nous
          comme ailleurs.
        </p>
      </header>

      <div className="container-luxe pb-24">
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {collection.map((p, i) => (
            <motion.article
              key={p.name + i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className="group min-w-0"
            >
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                <div className="absolute right-4 top-4 bg-ivory/90 px-3 py-1 text-[0.6rem] uppercase tracking-[0.22em] text-charcoal backdrop-blur">
                  {p.cat}
                </div>
              </div>
              <div className="mt-5 flex min-w-0 flex-wrap items-baseline justify-between gap-4">
                <h3 className="font-serif text-xl text-charcoal">{p.name}</h3>
              </div>
              <p className="mt-1 text-sm text-charcoal-soft">{p.price}</p>
              <button className="mt-4 text-[0.7rem] uppercase tracking-[0.25em] text-gold transition-colors hover:text-charcoal">
                Demander un devis →
              </button>
            </motion.article>
          ))}
        </div>

        <div className="mt-24 border-t border-border pt-16 text-center">
          <h2 className="font-serif text-3xl text-charcoal md:text-4xl">Un projet sur mesure ?</h2>
          <p className="mx-auto mt-4 max-w-xl text-charcoal-soft">
            Nos équipes composent une scénographie en parfaite cohérence avec votre événement.
          </p>
          <Link to="/contact" className="mt-8 inline-flex max-w-full border border-charcoal px-6 py-4 text-center text-xs uppercase tracking-[0.2em] text-charcoal transition-all hover:bg-charcoal hover:text-ivory sm:px-8 sm:tracking-[0.25em]">
            Composer ma sélection
          </Link>
        </div>
      </div>
    </div>
  );
}
