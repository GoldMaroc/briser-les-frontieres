import { Metadata } from "next";
import Link from "next/link";
import AgendaDoctolib from "@/components/ui/AgendaDoctolib";
import ArrowIcon from "@/components/ui/ArrowIcon";

export const metadata: Metadata = {
  title: "Accompagnement & Soutien Psycho-Spirituel — Mounir BYAR | Cabinet BLF",
  description:
    "Réservez votre consultation psycho-spirituelle et diagnostic comportemental avec Mounir Byar. Par téléphone/visio (48,95 € - 45 min) ou en présentiel à domicile (96,45 € - 1h15).",
};

export default function RendezVousPage() {
  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-280 pt-28 pb-32 px-4 sm:px-6 lg:px-12 selection:bg-[#087B53]/20">
      
      <div className="max-w-[1240px] mx-auto space-y-20 relative z-10">
        
        {/* ═════════════════════════════════════════════════════════════════
            EN-TÊTE ÉDITORIAL & STATUTAIRE HAUTE JOAILLERIE
            ═════════════════════════════════════════════════════════════════ */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#087B53]/10 border border-[#087B53]/25 text-[#087B53] dark:text-[#34D399]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#087B53] dark:bg-[#34D399] animate-pulse" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
              CABINET BLF • SOUTIEN PSYCHO-SPIRITUEL &amp; SOUVERAINETÉ
            </span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl text-[var(--text-primary)] tracking-tight leading-[1.08]">
            Prenez Rendez-vous avec{" "}
            <span className="text-[#087B53] dark:text-[#E2BA6E]">
              Mounir Byar
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans leading-relaxed">
            Consultez les disponibilités ci-dessous via notre agenda sécurisé : un entretien individuel par <strong>téléphone/visio (48,95 € - 45 min)</strong> ou une <strong>immersion in situ où Mounir Byar se déplace à votre domicile (96,45 € - 1h15)</strong>.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-2.5 sm:gap-3 text-xs font-mono text-[var(--text-secondary)]">
            <span className="inline-flex items-center gap-1.5 bg-[var(--surface)] px-3 py-1.5 rounded-full border border-[var(--border)]">
              ⏱ <strong>45 min (visio/tél) ou 1h15 (domicile)</strong>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[var(--surface)] px-3 py-1.5 rounded-full border border-[var(--border)]">
              📞 <strong>06 77 55 95 72</strong> (Secrétariat &amp; Urgences)
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[var(--surface)] px-3 py-1.5 rounded-full border border-[var(--border)] text-[#087B53] dark:text-[#34D399] font-semibold">
              ✓ Garantie de Sérieux • 0% Riba
            </span>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════
            CALENDRIER CAL.COM INTERACTIF COMPLET
            ═════════════════════════════════════════════════════════════════ */}
        <div className="relative">
          <AgendaDoctolib />
        </div>

        {/* ═════════════════════════════════════════════════════════════════
            SECTION COMPLÈTE : ACCOMPAGNEMENT & SOUTIEN PSYCHO-SPIRITUEL
            ═════════════════════════════════════════════════════════════════ */}
        <section className="pt-12 border-t border-[var(--border)] space-y-16">
          
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#087B53] dark:text-[#E2BA6E] font-bold block mb-2">
              CADRE THÉRAPEUTIQUE &amp; COMPORTEMENTAL
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight">
              Accompagnement &amp; Soutien Psycho-Spirituel
            </h2>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans mt-3 leading-relaxed">
              Une science du déblocage intérieur conçue pour les croyants confrontés aux paradoxes de la modernité : réconcilier la paix du cœur, l&apos;alignement somatique et l&apos;exigence de foi dans le siècle présent.
            </p>
          </div>

          {/* QUAND PRENDRE RENDEZ-VOUS ? (GRILLE EN 3 VOLETS) */}
          <div className="space-y-6">
            <h3 className="font-heading font-extrabold text-xl text-[var(--text-primary)] flex items-center gap-2.5">
              <span>🎯</span>
              <span>Quand prendre rendez-vous ?</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* CARTE 1 : ÉQUILIBRE MENTAL & ÉMOTIONNEL */}
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4 shadow-2xs hover:border-[#087B53]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#087B53]/10 text-[#087B53] dark:text-[#34D399] flex items-center justify-center text-lg font-bold">
                  🧠
                </div>
                <h4 className="font-heading font-bold text-base text-[var(--text-primary)]">
                  Pour retrouver un équilibre mental et émotionnel
                </h4>
                <ul className="space-y-2 text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold shrink-0">•</span>
                    <span><strong>Stress &amp; Anxiété :</strong> oppression thoracique et anticipation anxieuse permanente.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold shrink-0">•</span>
                    <span><strong>Charge mentale &amp; Surmenage :</strong> sensation de saturation cognitive, fatigue chronique.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold shrink-0">•</span>
                    <span><strong>Hypersensibilité sensorielle :</strong> submersion par le bruit et l&apos;environnement.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold shrink-0">•</span>
                    <span><strong>Gestion des émotions :</strong> impulsivité, réactivité excessive ou anesthésie affective.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold shrink-0">•</span>
                    <span><strong>Culpabilité paralysante :</strong> sentiment d&apos;indignité face aux manquements spirituels.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold shrink-0">•</span>
                    <span><strong>Besoin d&apos;hyper-contrôle :</strong> incapacité à vivre le lâcher-prise confiant (Tawakkul).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold shrink-0">•</span>
                    <span><strong>Ruminations &amp; Pensées intrusives :</strong> boucles mentales nocturnes et Waswas toxique.</span>
                  </li>
                </ul>
              </div>

              {/* CARTE 2 : RESSOURCES PERSONNELLES & MANDAT DE KHALIFA */}
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4 shadow-2xs hover:border-[#087B53]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#087B53]/10 text-[#087B53] dark:text-[#34D399] flex items-center justify-center text-lg font-bold">
                  ⚖️
                </div>
                <h4 className="font-heading font-bold text-base text-[var(--text-primary)]">
                  Pour mieux se connaître et déployer le mandat de Khalifa
                </h4>
                <ul className="space-y-2 text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold shrink-0">•</span>
                    <span><strong>Estime &amp; Confiance :</strong> restaurer la dignité ontologique conférée par le Créateur.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold shrink-0">•</span>
                    <span><strong>Alignement valeurs / actions :</strong> combler le fossé entre vos idéaux et vos journées réelles.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold shrink-0">•</span>
                    <span><strong>Perfectionnisme toxique :</strong> surmonter la peur de l&apos;échec qui génère la procrastination (At-Taswîf).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold shrink-0">•</span>
                    <span><strong>Poser des limites saines :</strong> apprendre à dire non sans culpabilité destructrice.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold shrink-0">•</span>
                    <span><strong>Peur du regard d&apos;autrui :</strong> s&apos;affranchir de la validation sociale au profit de la droiture divine.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold shrink-0">•</span>
                    <span><strong>Perte de sens existentiel :</strong> désenchanter l&apos;illusion du matérialisme et refonder sa mission.</span>
                  </li>
                </ul>
              </div>

              {/* CARTE 3 : SOUTIEN FACE AUX ÉPREUVES */}
              <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-4 shadow-2xs hover:border-[#087B53]/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#087B53]/10 text-[#087B53] dark:text-[#34D399] flex items-center justify-center text-lg font-bold">
                  🛡️
                </div>
                <h4 className="font-heading font-bold text-base text-[var(--text-primary)]">
                  Pour obtenir un soutien structuré face aux épreuves
                </h4>
                <ul className="space-y-2 text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold shrink-0">•</span>
                    <span><strong>Deuil &amp; Perte d&apos;un être cher :</strong> accompagnement dans la traversée du Sabr Jamil (noble patience).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold shrink-0">•</span>
                    <span><strong>Maladie &amp; Épreuve corporelle :</strong> redonner du sens à la souffrance physique et apaiser le système nerveux.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold shrink-0">•</span>
                    <span><strong>Changements d&apos;existence majeurs :</strong> reconversion, mariage, divorce, rupture ou réinstallation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#087B53] font-bold shrink-0">•</span>
                    <span><strong>Périodes de vulnérabilité :</strong> sas de sécurité fraternelle lorsque la foi et l&apos;élan vital vacillent.</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* DÉONTOLOGIE & SITUATIONS DÉPASSANT LE CADRE */}
          <div className="p-6 sm:p-8 rounded-2xl bg-amber-500/5 border border-amber-500/30 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">⚠️</span>
              <h4 className="font-heading font-bold text-base text-[var(--text-primary)]">
                Situations dépassant mon cadre d&apos;intervention (Déontologie Médicale)
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-sans">
              Mon accompagnement relève de l&apos;ingénierie comportementale, de la psychoéducation et du déblocage psycho-spirituel. Il <strong>ne se substitue en aucun cas à un suivi psychiatrique ou médical clinique</strong> pour les pathologies suivantes :
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-[11px] font-mono text-[var(--text-primary)] font-semibold">
              <span className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-center">Dépressions sévères</span>
              <span className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-center">Troubles psychotiques</span>
              <span className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-center">Addictions chimiques lourdes</span>
              <span className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-center">Troubles de la personnalité</span>
              <span className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-center">Phobies invalidantes</span>
              <span className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-center">TCA sévères</span>
              <span className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-center">Traumatismes non stabilisés</span>
              <span className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-center">TOC psychiatriques</span>
              <span className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-center">Troubles dissociatifs</span>
              <span className="p-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-center">Urgences vitales</span>
            </div>

            <p className="text-xs text-[var(--text-secondary)] font-sans italic pt-2">
              Si vous êtes dans l&apos;une de ces situations et que vous ne savez pas vers qui vous tourner, <strong>n&apos;hésitez pas à me contacter directement</strong> : je me ferai un devoir fraternel de vous orienter vers les médecins psychiatres, psychologues cliniciens et professionnels compétents de notre réseau.
            </p>
          </div>

          {/* APPROCHES & MÉTHODES */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#087B53] dark:text-[#34D399] font-bold block">
              INGÉNIERIE CLINIQUE &amp; TRADITION PROPHÉTIQUE
            </span>
            <h3 className="font-heading font-extrabold text-2xl text-[var(--text-primary)]">
              Approches, Méthodes &amp; Vision Thérapeutique
            </h3>

            <p className="text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
              Mon parcours d&apos;ingénieur et mes formations me permettent de m&apos;appuyer sur plusieurs approches éprouvées, choisies sur-mesure en fonction de votre singularité, de vos blocages réels et dans le respect absolu de la tradition islamique orthodoxe.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-[var(--text-secondary)] leading-relaxed">
              <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] space-y-1.5">
                <strong className="text-[var(--text-primary)] block font-heading text-sm">
                  1. Neurosciences &amp; Psychoéducation Cognitive
                </strong>
                Comprendre la neurobiologie de votre stress : désamorçage de l&apos;amygdale, stimulation du nerf vague, réduction de la charge allostatique et fermeture chirurgicale des boucles mentales ouvertes.
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] space-y-1.5">
                <strong className="text-[var(--text-primary)] block font-heading text-sm">
                  2. Psychologie Islamique &amp; Tazkiyat An-Nafs
                </strong>
                Mobilisation des traités classiques (Al-Balkhi, Ibn al-Qayyim, Al-Ghazali) pour discerner entre les ruses du Nafs, les attaques de Waswas et les réelles souffrances du cœur.
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] space-y-1.5">
                <strong className="text-[var(--text-primary)] block font-heading text-sm">
                  3. Médecine Prophétique &amp; Écologie Somatique
                </strong>
                Hygiène de vie, sanctuarisation du sommeil, jeûne intermittent et chrono-alignement des cinq prières quotidiennes sur la course du soleil pour stabiliser la mélatonine et le cortisol.
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] space-y-1.5">
                <strong className="text-[var(--text-primary)] block font-heading text-sm">
                  4. Ingénierie Spatiale &amp; Sanctuarisation In Situ
                </strong>
                Élimination physique des interférences visuelles et numériques de votre intérieur (Tahara 360°) pour faire de votre habitat un sanctuaire propice au recueillement instantané.
              </div>
            </div>

            {/* CITATION HADITH PROPHÉTIQUE */}
            <div className="p-6 rounded-xl bg-gradient-to-r from-[#087B53]/10 via-[#087B53]/5 to-transparent border-l-4 border-[#087B53] space-y-2">
              <p className="text-sm font-serif italic text-[var(--text-primary)] leading-relaxed">
                « Le Prophète (ﷺ) a dit : &ldquo;Celui qui soulage un croyant d’une détresse dans ce bas-monde, Allah le soulagera d’une détresse le Jour du Jugement ; celui qui facilite la tâche à une personne en difficulté, Allah lui facilitera les choses ici-bas et dans l’au-delà.&rdquo; »
              </p>
              <span className="block text-[11px] font-mono text-[#087B53] dark:text-[#34D399] font-bold uppercase tracking-wider">
                — Rapporté par l&apos;Imam Muslim
              </span>
            </div>
          </div>

          {/* MODALITÉS & DISPOSITIF TARIF SOLIDAIRE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-3">
              <span className="text-lg">📅</span>
              <h4 className="font-heading font-bold text-base text-[var(--text-primary)]">
                Modalités Pratiques de Rendez-vous
              </h4>
              <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                Vous pouvez réserver votre créneau directement sur l&apos;agenda en ligne ci-dessus ou joindre notre secrétariat par téléphone au <strong>06 77 55 95 72</strong>, du lundi au vendredi de 09h30 à 18h30.
                <br /><br />
                Les séances durent <strong>45 minutes en téléconsultation</strong> ou <strong>1h15 lors des immersions à domicile</strong>. Le rythme du suivi est individualisé : nous le définissons ensemble selon l&apos;urgence de votre situation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] space-y-3">
              <span className="text-lg">🤝</span>
              <h4 className="font-heading font-bold text-base text-[var(--text-primary)]">
                Engagement Fraternel &amp; Tarif Solidaire
              </h4>
              <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
                Les modalités de règlement s&apos;effectuent de manière chiffrée lors de la réservation (0% Riba, Stripe sécurisé).
                <br /><br />
                <strong>Dispositif de solidarité :</strong> Conformément à notre éthique, nous réservons chaque mois un quota de consultations à <strong>tarif solidaire adapté</strong> pour les étudiants ou personnes traversant une précarité financière aiguë. N&apos;hésitez pas à nous en faire part préalablement par téléphone ou via notre page contact afin d&apos;en bénéficier en toute discrétion.
              </p>
            </div>
          </div>

        </section>

      </div>
    </div>
  );
}
