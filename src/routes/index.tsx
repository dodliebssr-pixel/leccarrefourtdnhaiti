import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import salleVideo from "@/assets/videos/salle.mp4";
import ceremonieVideo from "@/assets/videos/ceremonie.mp4";
import alleesVideo from "@/assets/videos/allees.mp4";
import posterSalle from "@/assets/images/poster-salle.jpg";
import posterCeremonie from "@/assets/images/poster-ceremonie.jpg";
import posterAllees from "@/assets/images/poster-allees.jpg";
import brochure from "@/assets/images/brochure.jpg";
import receptionImg from "@/assets/images/reception-salle.jpg";
import alleeImg from "@/assets/images/allee-ceremonie.jpg";
import badjopImg from "@/assets/images/scene-badjop.jpg";
import entreeImg from "@/assets/images/belle-entree.jpg";
import lavandeImg from "@/assets/images/salle-lavande.jpg";
import edificeImg from "@/assets/images/edifice.jpg";
import tableImg from "@/assets/images/table-honneur.jpg";
import activiteImg from "@/assets/images/activite-ceremonie.jpg";

const heroImg = receptionImg;
const weddingImg = alleeImg;
const meetingImg = activiteImg;
const rentalImg = tableImg;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LeCarrefour · L'art de recevoir à Trou-du-Nord" },
      { name: "description", content: "Complexe événementiel de prestige à Trou-du-Nord, Haïti. Mariages, célébrations, business et hommages dans une atmosphère Quiet Luxury." },
      { property: "og:title", content: "LeCarrefour · L'art de recevoir à Trou-du-Nord" },
      { property: "og:description", content: "Complexe événementiel de prestige à Trou-du-Nord, Haïti. Mariages, célébrations, business et hommages dans une atmosphère Quiet Luxury." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      {/* Hero */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Salle de réception LeCarrefour"
            width={1920}
            height={1280}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-charcoal/30" />
        </div>

        <div className="container-luxe relative z-10 pb-24 pt-40 text-ivory">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="eyebrow !text-gold-soft"
          >
            Trou-du-Nord · Haïti · Depuis toujours
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="mt-6 max-w-4xl font-serif text-4xl leading-[1.05] sm:text-7xl md:text-8xl"
          >
            L'art de recevoir,<br />
            <span className="italic text-gold-soft">en toute discrétion.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-ivory/80"
          >
            LeCarrefour est un complexe événementiel d'exception, pensé pour
            celles et ceux qui préfèrent l'élégance silencieuse aux
            démonstrations. Chaque détail, chaque geste — orchestré.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/reservation"
               className="max-w-full border border-gold bg-gold px-6 py-4 text-center text-xs uppercase tracking-[0.18em] text-charcoal transition-all hover:bg-transparent hover:text-gold sm:px-8 sm:tracking-[0.25em]"
            >
              Réserver une visite
            </Link>
            <Link
              to="/portfolio"
               className="max-w-full border border-ivory/60 px-6 py-4 text-center text-xs uppercase tracking-[0.18em] text-ivory transition-all hover:bg-ivory hover:text-charcoal sm:px-8 sm:tracking-[0.25em]"
            >
              Découvrir le portfolio
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-8 right-8 z-10 hidden text-right text-ivory/70 md:block">
          <p className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</p>
          <div className="mx-auto mt-2 h-12 w-px bg-gradient-to-b from-gold-soft to-transparent" />
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 sm:py-32">
        <div className="container-luxe grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Notre philosophie</p>
            <div className="hairline mt-6 w-24" />
          </div>
          <div className="md:col-span-8">
            <h2 className="font-serif text-4xl leading-tight text-charcoal md:text-5xl">
              La discrétion comme signature. L'exigence comme évidence.
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-loose text-charcoal-soft">
              Nous croyons qu'un grand événement ne s'impose pas — il s'éprouve.
              De l'accueil au dernier verre, nos équipes orchestrent une
              expérience où rien ne distrait de l'essentiel : vos invités, vos
              émotions, votre moment.
            </p>
            <div className="mt-12 grid gap-10 sm:grid-cols-3">
              {[
                { n: "12", l: "Ans d'expérience" },
                { n: "400+", l: "Événements célébrés" },
                { n: "98%", l: "Clients satisfaits" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-serif text-5xl text-gold">{s.n}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.22em] text-charcoal-soft">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Univers cards */}
      <section className="bg-secondary py-32">
        <div className="container-luxe">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 sm:mb-16">
            <div>
              <p className="eyebrow">Nos univers</p>
              <h2 className="mt-4 font-serif text-4xl text-charcoal md:text-5xl">
                Quatre signatures.<br />Un même art de recevoir.
              </h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { img: weddingImg, eyebrow: "Célébrations", title: "Mariages & Fiançailles", to: "/portfolio" },
              { img: meetingImg, eyebrow: "Business", title: "Réunions & Formations", to: "/portfolio" },
              { img: rentalImg, eyebrow: "Rental", title: "Collection décoration", to: "/rental" },
              { img: lavandeImg, eyebrow: "Hommage", title: "Funérailles dignes", to: "/hommage" },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
              >
                <Link to={c.to} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-charcoal">
                    <img
                      src={c.img}
                      alt={c.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                      <p className="text-[0.65rem] uppercase tracking-[0.3em] text-gold-soft">{c.eyebrow}</p>
                      <h3 className="mt-2 font-serif text-2xl">{c.title}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos espaces */}
      <section className="py-20 sm:py-32">
        <div className="container-luxe">
          <p className="eyebrow">Nos espaces</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-charcoal md:text-5xl">
            De l'édifice à l'allée,<br /><span className="italic text-gold">chaque espace raconte.</span>
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { img: edificeImg, title: "L'édifice", sub: "Accueil · Route Pillette", span: "md:col-span-2 aspect-[16/9]" },
              { img: entreeImg, title: "La belle entrée", sub: "Arche & drapés", span: "aspect-[3/4]" },
              { img: alleeImg, title: "L'allée d'honneur", sub: "Cérémonie", span: "aspect-[3/4]" },
              { img: badjopImg, title: "La scène", sub: "Tribune & fonds décorés", span: "aspect-[4/3]" },
              { img: tableImg, title: "La table d'honneur", sub: "Mise en place", span: "aspect-[4/3]" },
            ].map((s, i) => (
              <motion.figure
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.06 }}
                className={s.span.includes("col-span") ? "md:col-span-2" : ""}
              >
                <div className={`overflow-hidden border border-border bg-secondary ${s.span.replace("md:col-span-2 ", "")}`}>
                  <img
                    src={s.img}
                    alt={`${s.title} — LeCarrefour, Trou-du-Nord`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out hover:scale-105"
                  />
                </div>
                <figcaption className="mt-3">
                  <p className="font-serif text-xl text-charcoal">{s.title}</p>
                  <p className="mt-1 text-[0.7rem] uppercase tracking-[0.25em] text-charcoal-soft">{s.sub}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Films */}
      <section className="bg-charcoal py-20 text-ivory sm:py-32">
        <div className="container-luxe">
          <p className="eyebrow !text-gold">En mouvement</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
            Nos espaces,<br /><span className="italic text-gold-soft">filmés sans artifice.</span>
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { src: salleVideo, poster: posterSalle, title: "La salle en réception", sub: "Mise en place · Trou-du-Nord" },
              { src: ceremonieVideo, poster: posterCeremonie, title: "Une cérémonie chez nous", sub: "Célébration · Entrée des mariés" },
              { src: alleesVideo, poster: posterAllees, title: "Les allées", sub: "Décor & parcours des invités" },
            ].map((v) => (
              <motion.figure
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
              >
                <div className="overflow-hidden border border-ivory/15 bg-black">
                  <video
                    src={v.src}
                    poster={v.poster}
                    controls
                    playsInline
                    preload="none"
                    className="h-full w-full"
                  />
                </div>
                <figcaption className="mt-4">
                  <p className="font-serif text-2xl">{v.title}</p>
                  <p className="mt-1 text-[0.7rem] uppercase tracking-[0.25em] text-ivory/50">{v.sub}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Brochure */}
      <section className="py-20 sm:py-32">
        <div className="container-luxe grid items-center gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Notre brochure</p>
            <div className="hairline mt-6 w-24" />
            <h2 className="mt-8 font-serif text-4xl leading-tight text-charcoal md:text-5xl">
              Un seul lieu,<br /><span className="italic text-gold">plusieurs possibilités.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-loose text-charcoal-soft">
              Capacité de 200 à 600 personnes. Mariages, événements familiaux,
              séminaires et conférences, location de mobilier et de décoration,
              Wi-Fi, parking, sécurité 24/24.
            </p>
            <a
              href={brochure}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex max-w-full border border-charcoal px-6 py-4 text-center text-xs uppercase tracking-[0.18em] text-charcoal transition-all hover:bg-charcoal hover:text-ivory sm:px-8 sm:tracking-[0.25em]"
            >
              Voir la brochure
            </a>
          </div>
          <div className="md:col-span-7">
            <a href={brochure} target="_blank" rel="noopener noreferrer" className="block overflow-hidden border border-border bg-secondary">
              <img
                src={brochure}
                alt="Brochure LeCarrefour — services, galerie et contacts"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-20 sm:py-32">
        <div className="container-luxe text-center">
          <p className="eyebrow">Une rencontre</p>
          <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl leading-tight text-charcoal md:text-6xl">
            Parlons de votre événement —<br />
            <span className="italic text-gold">dans le détail.</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/reservation" className="border border-charcoal bg-charcoal px-8 py-4 text-xs uppercase tracking-[0.25em] text-ivory hover:bg-gold hover:border-gold hover:text-charcoal transition-all">
              Réserver
            </Link>
            <Link to="/contact" className="border border-charcoal/40 px-8 py-4 text-xs uppercase tracking-[0.25em] text-charcoal hover:border-charcoal transition-all">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
