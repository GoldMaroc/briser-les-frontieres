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

  // Schema.org JSON-LD (Sémantique Avancée)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
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

        {/* Le fameux "Aimant" : L'Appel à l'Action Massif */}
        <div className="mt-24 bg-midnight-light border border-gold/20 p-8 md:p-12 rounded-sm text-center relative overflow-hidden shadow-2xl shadow-gold/5">
          <div className="absolute inset-0 bg-[url('/celestial_bg.png')] bg-cover bg-center opacity-10 mix-blend-screen pointer-events-none" />
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl text-cream font-heading mb-4">
              Ne laissez pas votre Nafs dicter votre destin.
            </h3>
            <p className="text-cream-muted font-body mb-8 max-w-xl mx-auto">
              Si cette analyse a résonné en vous, il est temps de passer à l'action. Découvrez l'ingénierie comportementale complète dans le livre de Mounir Byar.
            </p>
            <Button href="/livres" variant="primary" className="py-4 px-8 text-lg font-semibold inline-flex">
              Découvrir le Livre
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
