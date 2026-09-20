import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import wedding from "@/assets/images/wedding.jpg";
import engagement from "@/assets/images/engagement.jpg";
import birthday from "@/assets/images/birthday.jpg";
import meeting from "@/assets/images/meeting.jpg";
import training from "@/assets/images/training.jpg";
import hero from "@/assets/images/hero.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio · LeCarrefour" },
      { name: "description", content: "Galerie d'événements : mariages, fiançailles, anniversaires, formations, réunions d'affaires à Trou-du-Nord." },
      { property: "og:title", content: "Portfolio · LeCarrefour" },
      { property: "og:description", content: "Une sélection d'événements célébrés au complexe LeCarrefour." },
    ],
  }),
  component: Portfolio,
});

type Cat = "Tous" | "Célébrations" | "Business";
type Sub = "Mariage" | "Fiançailles" | "Anniversaire" | "Formation" | "Réunion";

const items: { img: string; title: string; cat: Cat; sub: Sub }[] = [
  { img: wedding, title: "Mariage Marie & Jean", cat: "Célébrations", sub: "Mariage" },
  { img: engagement, title: "Fiançailles intimes", cat: "Célébrations", sub: "Fiançailles" },
  { img: birthday, title: "Anniversaire 40 ans", cat: "Célébrations", sub: "Anniversaire" },
  { img: meeting, title: "Réunion d'affaires", cat: "Business", sub: "Réunion" },
  { img: training, title: "Formation professionnelle", cat: "Business", sub: "Formation" },
  { img: hero, title: "Réception de mariage", cat: "Célébrations", sub: "Mariage" },
];

function Portfolio() {
  const [cat, setCat] = useState<Cat>("Tous");
  const filtered = useMemo(
    () => (cat === "Tous" ? items : items.filter((i) => i.cat === cat)),
    [cat],
  );

  return (
    <div className="w-full pt-24 sm:pt-32">
      <header className="container-luxe py-12 sm:py-16">
        <p className="eyebrow">Portfolio</p>
        <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-tight text-charcoal sm:text-5xl md:text-7xl">
          Chaque événement,<br /><span className="italic text-gold">une histoire singulière.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-loose text-charcoal-soft">
          Une sélection de moments célébrés à LeCarrefour. Triez par univers
          pour découvrir notre savoir-faire.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          {(["Tous", "Célébrations", "Business"] as Cat[]).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`border px-6 py-3 text-xs uppercase tracking-[0.22em] transition-all ${
                cat === c
                  ? "border-charcoal bg-charcoal text-ivory"
                  : "border-border text-charcoal-soft hover:border-charcoal hover:text-charcoal"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      <div className="container-luxe pb-24">
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((it) => (
              <motion.figure
                key={it.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              className="group min-w-0 cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                  <img
                    src={it.img}
                    alt={it.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 transition-colors group-hover:bg-charcoal/15" />
                </div>
                <figcaption className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline">
                  <div className="min-w-0">
                    <p className="text-[0.65rem] uppercase tracking-[0.28em] text-gold">{it.sub}</p>
                    <h3 className="mt-1 font-serif text-xl text-charcoal">{it.title}</h3>
                  </div>
                  <span className="text-[0.65rem] uppercase tracking-[0.25em] text-charcoal-soft">{it.cat}</span>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
