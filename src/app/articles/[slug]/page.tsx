import { Metadata } from "next";
import { articles } from "@/data/articles";
import { notFound } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  
  if (!article) {
    return { title: "Article introuvable" };
  }

  return {
    title: `${article.title} | Mounir Byar`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      authors: ["Mounir BYAR"],
    },
  };
}

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  // Schema.org JSON-LD (Sémantique Avancée avec Fil d'Ariane BreadcrumbList)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        mainEntityOfPage: `https://www.briserlesfrontieres.fr/articles/${article.slug}`,
        author: {
          "@type": "Person",
          name: "Mounir BYAR",
          url: "https://www.briserlesfrontieres.fr"
        },
        datePublished: article.publishedAt,
        publisher: {
          "@type": "Organization",
          name: "Briser les Frontières",
          logo: {
            "@type": "ImageObject",
            url: "https://www.briserlesfrontieres.fr/logo_blf.png"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: "https://www.briserlesfrontieres.fr"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Journal",
            item: "https://www.briserlesfrontieres.fr/articles"
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: `https://www.briserlesfrontieres.fr/articles/${article.slug}`
          }
        ]
      }
    ]
  };

  return (
    <div className="relative pt-40 pb-32 bg-midnight min-h-screen">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,var(--color-midnight-light)_0%,var(--color-midnight)_70%)] pointer-events-none" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-6 relative z-10">
        <Link href="/articles" className="inline-flex items-center text-xs text-gold font-body uppercase tracking-widest mb-12 hover:text-cream transition-colors">
          <span className="mr-2">←</span> Retour au Journal
        </Link>
        
        <header className="mb-16">
          <time className="text-sm text-gold/80 font-heading uppercase tracking-widest mb-4 block text-center">
            {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-cream font-heading font-medium text-center leading-tight mb-8">
            {article.title}
          </h1>
          <div className="w-24 h-px bg-gold/30 mx-auto" />
        </header>

        <div 
          className="prose prose-invert prose-gold max-w-none font-body leading-loose text-cream-muted
            prose-headings:font-heading prose-headings:font-medium prose-headings:text-cream prose-headings:mt-12 prose-headings:mb-6
            prose-h2:text-3xl prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-4
            prose-p:mb-6 prose-strong:text-gold prose-strong:font-normal
            prose-a:text-gold prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* ═══════════════════════════════════════════
            SUITE DE CONVERSION : AUDIT • LIVRES • MENTORAT
            ═══════════════════════════════════════════ */}
        <section className="mt-24 space-y-8">
          
          {/* BANNIÈRE 1 : AUDIT DE SOUVERAINETÉ & PRIÈRE (AIMANT PRINCIPAL) */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-midnight-light via-midnight to-emerald-muted/20 border-2 border-emerald/50 p-8 md:p-12 shadow-2xl shadow-emerald/10 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.3em] text-emerald bg-emerald/10 border border-emerald/30 px-4 py-1.5 rounded-full mb-4">
                Bilan Diagnostique Gratuit & Confidentiel
              </span>
              <h3 className="text-2xl md:text-3xl text-cream font-heading font-medium mb-4 leading-snug">
                Évaluez la santé de votre Salât et votre niveau de clarté
              </h3>
              <p className="text-cream-muted text-sm md:text-base font-body mb-8 leading-relaxed">
                Vous traversez une phase de dispersion mentale, de charge allostatique ou de rupture dans votre régularité ? Mesurez vos blocages profonds en 3 minutes grâce à notre audit clinique.
              </p>
              <Link
                href="/audit"
                className="inline-flex items-center justify-center gap-2 py-4 px-8 rounded-xl bg-emerald text-midnight font-heading font-semibold text-base md:text-lg tracking-wide hover:bg-emerald-light transition-all duration-300 shadow-xl shadow-emerald/20 hover:scale-[1.02] cursor-pointer"
              >
                <span>Faire mon Diagnostic en 3 minutes</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* BANNIÈRES SECONDAIRES 2 & 3 : LIVRES ET MENTORAT PRIVÉ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CARTE LIVRES */}
            <div className="relative rounded-xl bg-surface/70 border border-gold/30 hover:border-gold/60 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/40">
              <div>
                <span className="text-[10px] text-gold uppercase tracking-widest font-heading font-semibold block mb-2">
                  Ouvrages de Référence
                </span>
                <h4 className="text-xl text-cream font-heading font-medium mb-3">
                  Les Livres de Mounir Byar
                </h4>
                <p className="text-cream-muted text-xs md:text-sm font-body leading-relaxed mb-6">
                  Approfondissez l&apos;ingénierie du Nafs, la Miséricorde divine et le statut de Khalîfa à travers les ouvrages fondamentaux (Adam, Les Secrets du Retour vers Allah, Ar-Rahman).
                </p>
              </div>
              <Link
                href="/livres"
                className="inline-flex items-center text-sm font-semibold text-gold hover:text-gold-light group"
              >
                <span>Commander les Ouvrages</span>
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

            {/* CARTE MENTORAT & CANDIDATURE */}
            <div className="relative rounded-xl bg-surface/70 border border-border/80 hover:border-emerald/50 p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/40">
              <div>
                <span className="text-[10px] text-emerald uppercase tracking-widest font-heading font-semibold block mb-2">
                  Cabinet BLF • Accompagnement
                </span>
                <h4 className="text-xl text-cream font-heading font-medium mb-3">
                  Interposition & Mentorat
                </h4>
                <p className="text-cream-muted text-xs md:text-sm font-body leading-relaxed mb-6">
                  Pour les dirigeants et croyants exigeants : intégrez un protocole rigoureux d&apos;ingénierie comportementale (1, 3 ou 9 mois) pour restructurer vos fondations.
                </p>
              </div>
              <Link
                href="/candidature"
                className="inline-flex items-center text-sm font-semibold text-emerald hover:text-emerald-light group"
              >
                <span>Déposer un dossier de Candidature</span>
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>

          </div>

        </section>
      </article>
    </div>
  );
}
