import { createFileRoute, Link } from "@tanstack/react-router";
import funeral from "@/assets/images/funeral.jpg";

export const Route = createFileRoute("/hommage")({
  head: () => ({
    meta: [
      { title: "Hommage & Dignité · LeCarrefour" },
      { name: "description", content: "Services de funérailles à Trou-du-Nord : un accompagnement digne, sobre et respectueux des familles en deuil." },
      { property: "og:title", content: "Hommage & Dignité · LeCarrefour" },
      { property: "og:description", content: "Un accompagnement digne et discret pour rendre hommage à ceux qui comptent." },
      { property: "og:image", content: funeral },
    ],
  }),
  component: Hommage,
});

function Hommage() {
  return (
    <div className="w-full pt-20">
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img src={funeral} alt="Salle d'hommage" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/30 to-ivory/20" />
        <div className="container-luxe relative z-10 flex h-full flex-wrap items-end pb-14 text-ivory sm:pb-20">
          <div className="min-w-0">
            <p className="eyebrow !text-gold-soft">Hommage & Dignité</p>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[1.05] sm:text-5xl md:text-7xl">
              Honorer la mémoire,<br /><span className="italic text-gold-soft">accompagner les vôtres.</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-luxe grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">Notre engagement</p>
            <div className="hairline mt-6 w-24" />
            <p className="mt-8 text-base leading-loose text-charcoal-soft">
              Dans les moments les plus délicats, nos équipes vous accompagnent
              avec retenue et bienveillance. LeCarrefour met à disposition un
              espace sobre, des prestations soignées et une organisation
              attentive, pour que vous puissiez vous consacrer à l'essentiel :
              la présence aux côtés des vôtres.
            </p>
          </div>

          <div className="md:col-span-7 space-y-px bg-border">
            {[
              { title: "Salle de recueillement", desc: "Un lieu épuré, baigné de lumière naturelle, propice au recueillement et à l'hommage." },
              { title: "Organisation cérémonielle", desc: "Coordination complète : programme, fleurs, musique, restauration discrète." },
              { title: "Soutien aux familles", desc: "Un interlocuteur dédié, joignable à toute heure, pour orchestrer chaque détail." },
              { title: "Réception après-cérémonie", desc: "Un espace privatif pour accueillir les proches dans la chaleur d'un repas partagé." },
            ].map((s) => (
              <div key={s.title} className="min-w-0 bg-ivory p-5 sm:p-8">
                <h3 className="font-serif text-2xl text-charcoal">{s.title}</h3>
                <p className="mt-3 text-sm leading-loose text-charcoal-soft">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="container-luxe text-center">
          <p className="font-serif text-2xl italic text-charcoal-soft">
            « Nous sommes à vos côtés, avec la délicatesse que mérite ce moment. »
          </p>
          <Link to="/contact" className="mt-10 inline-flex max-w-full border border-charcoal px-6 py-4 text-center text-xs uppercase tracking-[0.2em] text-charcoal transition-all hover:bg-charcoal hover:text-ivory sm:px-8 sm:tracking-[0.25em]">
            Parler à un conseiller
          </Link>
        </div>
      </section>
    </div>
  );
}
