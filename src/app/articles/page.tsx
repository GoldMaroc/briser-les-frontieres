import { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Le Journal — Ingénierie de la Souveraineté & Retour vers Allah",
  description: "Découvrez nos articles sur la psychologie musulmane, la maîtrise du Nafs, la charge allostatique et le cheminement spirituel (Tazkiya).",
};

export default function ArticlesPage() {
  return (
    <div className="relative pt-40 pb-32 bg-midnight min-h-screen">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,var(--color-midnight-light)_0%,var(--color-midnight)_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionHeading
          label="Le Journal"
          title="Restaurez votre Clarté"
          align="center"
        />
        <p className="text-cream-muted text-center max-w-2xl mx-auto mb-16 font-body">
          Ressources et analyses sur la psychologie comportementale, la gestion de la charge allostatique et le cheminement spirituel vers le Créateur.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link 
              href={`/articles/${article.slug}`} 
              key={article.slug}
              className="group block bg-midnight-light border border-border hover:border-gold/50 transition-all duration-300 p-8 rounded-sm hover:shadow-[0_0_30px_rgba(212,175,55,0.05)] relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col h-full">
                <time className="text-xs text-gold/80 font-heading uppercase tracking-widest mb-4 block">
                  {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <h2 className="text-xl text-cream font-heading font-medium mb-3 group-hover:text-gold transition-colors leading-snug">
                  {article.title}
                </h2>
                <p className="text-sm text-cream-muted font-body leading-relaxed line-clamp-3 mb-6">
                  {article.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-border/50 flex items-center text-xs text-gold font-body tracking-wider uppercase">
                  Lire l'analyse 
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
