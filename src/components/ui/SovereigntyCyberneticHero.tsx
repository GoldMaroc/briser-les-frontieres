"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function SovereigntyCyberneticHero() {
  return (
    <div className="relative w-full bg-[#FAF8F5] text-[#181512] selection:bg-[#B88E3E]/20">

      {/* ════════════════════════════════════════════════════════════
          SECTION 1 : LE HERO (LE CHOC & L'APPEL À L'ACTION)
          - Palette Beige & Doré (Albâtre, Lin, Or Impérial)
          - Visuel authentique : homme musulman en Qiyâm devant la nature brumeuse
          - Typographie Systemia soignée : line-height généreux, aucun chevauchement
          - Slogan exact demandé par l'utilisateur : "Reprenez le contrôle de votre vie. La Salât comme arme de souveraineté."
          ════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-between pt-32 sm:pt-36 pb-12 px-5 sm:px-10 lg:px-16 overflow-hidden">
        
        {/* Photographie de fond : Homme musulman en station debout humble et concentrée (Qiyâm) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/sanctuaire/muslim_qiyam_focus.jpg"
            alt="Homme musulman en prière Qiyâm dans un sanctuaire contemporain lumineux"
            fill
            priority
            sizes="100vw"
            className="object-cover object-top sm:object-center filter brightness-[0.92] contrast-105"
          />
          {/* Dégradé lumineux chaud ton-sur-ton pour fondre parfaitement l'image dans l'arrière-plan beige #FAF8F5 */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/80 via-[#FAF8F5]/40 to-[#FAF8F5]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(250,248,245,0.75)_85%)]" />
        </div>

        {/* 1.1 Micro-Badge d'autorité discret en Or & Beige */}
        <header className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#E5DDD2] backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#087B53] animate-pulse" />
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-[#5C534A] uppercase font-semibold">
              CABINET BLF // L&apos;INGÉNIERIE DE LA SOUVERAINETÉ
            </span>
          </div>
          <span className="hidden md:inline-block font-mono text-[10px] tracking-[0.2em] text-[#7A6F64] uppercase">
            PARIS // REIMS • PAR MOUNIR BYAR
          </span>
        </header>

        {/* 1.2 Le Message Central (Le Choc & L'Appel à l'Action) */}
        <div className="relative z-10 max-w-5xl mx-auto text-center my-auto py-10 sm:py-16">
          
          <h1 className="font-heading font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[4.75rem] tracking-[-0.025em] text-[#181512] leading-[1.08] drop-shadow-sm">
            Reprenez le contrôle de votre vie.<br />
            <span className="text-[#B88E3E]">La Salât comme arme de souveraineté.</span>
          </h1>

          <p className="mt-6 sm:mt-8 text-base sm:text-xl text-[#4A433B] max-w-2xl mx-auto font-sans leading-[1.65]">
            La prière n&apos;est pas une corvée répétitive. C&apos;est le protocole neurobiologique suprême révélé à l&apos;humanité pour dompter le cortisol, briser la procrastination et commander son existence.
          </p>

          {/* Boutons d'Action — Style Ayocin Floating Pills en Émeraude & Or */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/audit"
              className="group w-full sm:w-auto inline-flex items-center justify-between gap-4 px-8 py-4 rounded-full bg-[#087B53] text-white font-heading font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(8,123,83,0.30)] hover:bg-[#066343] hover:shadow-[0_0_35px_rgba(8,123,83,0.50)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Passer l&apos;Audit Prière & Cerveau (3 min)</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>

            <Link
              href="/prix"
              className="group w-full sm:w-auto inline-flex items-center justify-between gap-4 px-8 py-4 rounded-full bg-white hover:bg-[#F3EDE4] border border-[#E5DDD2] hover:border-[#B88E3E] text-[#181512] font-heading font-medium text-xs sm:text-sm tracking-wider uppercase shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Consulter les Prix & Formats</span>
              <span className="w-6 h-6 rounded-full bg-[#181512]/5 flex items-center justify-center text-xs transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>

        </div>

        {/* 1.3 Preuves Rassurantes et Indicateur de Scroll */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-6 border-t border-[#E5DDD2] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 sm:gap-10 text-[#5C534A] text-xs font-sans">
            <span className="flex items-center gap-2">
              <span className="text-[#087B53] font-bold">✓</span> +1 200 Musulmans accompagnés
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#087B53] font-bold">✓</span> 43 Récits de transformation vérifiés
            </span>
            <span className="flex items-center gap-2">
              <span className="text-[#087B53] font-bold">✓</span> Fondé sur 10 ans de recherche
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#7A6F64] font-mono text-[10px] sm:text-xs uppercase tracking-widest">
            <span>Défiler pour comprendre</span>
            <span className="text-[#B88E3E] animate-bounce">↓</span>
          </div>
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 2 : LE CHOC DE CONSCIENCE (LE MIROIR)
          - Le contraste brutal : Épuisement moderne vs Paix du Sujûd
          - Cartes blanches et beiges épurées avec bordures douces
          ════════════════════════════════════════════════════════════ */}
      <section id="choc-conscience" className="relative py-24 sm:py-32 px-5 sm:px-10 lg:px-16 bg-[#FAF8F5] border-t border-[#E5DDD2]">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B88E3E] block font-bold">
              01 // LE CONSTAT BRUTAL
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-[#181512] tracking-[-0.025em] leading-[1.1]">
              Pourquoi remettez-vous toujours votre prière à plus tard ?
            </h2>
            <p className="text-sm sm:text-base text-[#5C534A] font-sans leading-[1.65]">
              L&apos;inertie (<em className="text-[#181512] italic">At-Taswîf</em>) n&apos;est pas un simple manque de volonté. C&apos;est le résultat d&apos;un cerveau saturé de dopamine rapide et d&apos;une prière privée de sa mécanique d&apos;ancrage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Colonne Gauche : L'Épuisement Moderne */}
            <article className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E5DDD2] hover:border-red-500/40 transition-all duration-300 flex flex-col justify-between space-y-8 shadow-[0_10px_30px_rgba(50,40,30,0.04)]">
              <div className="space-y-6">
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-[#E5DDD2]">
                  <Image
                    src="/images/photo_man_stressed.png"
                    alt="Professionnel musulman épuisé tard le soir devant ses écrans"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center filter grayscale-[30%] contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wider text-red-700 bg-red-100/90 border border-red-300 px-3 py-1 rounded-full backdrop-blur-md font-semibold">
                    L&apos;ÉTAT ACTUEL • AT-TASWÎF
                  </span>
                </div>

                <h3 className="font-heading font-bold text-2xl text-[#181512]">
                  La journée subie & la prière expédiée
                </h3>
                <p className="text-sm text-[#5C534A] font-sans leading-[1.65]">
                  Vous courrez toute la journée après des urgences. Votre cerveau est en alerte permanente. Quand arrive l&apos;heure de la Salat, vous la repoussez au dernier moment. Vous priez en trois minutes, le cœur distrait et l&apos;esprit déjà ailleurs. La culpabilité s&apos;installe, et avec elle, la sensation d&apos;un vide intérieur grandissant.
                </p>
              </div>

              <div className="pt-6 border-t border-[#E5DDD2] flex items-center justify-between text-xs font-mono text-[#7A6F64]">
                <span>CONSÉQUENCE</span>
                <span className="text-red-700 font-semibold">Cortisol élevé & Charge mentale</span>
              </div>
            </article>

            {/* Colonne Droite : Le Sujûd Souverain */}
            <article className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E5DDD2] hover:border-[#087B53]/50 transition-all duration-300 flex flex-col justify-between space-y-8 shadow-[0_10px_30px_rgba(50,40,30,0.04)]">
              <div className="space-y-6">
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-[#E5DDD2]">
                  <Image
                    src="/images/sanctuaire/muslim_sujud_light.jpg"
                    alt="Homme musulman en prosternation Sujûd complète sous la lumière d'aube"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wider text-[#087B53] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full backdrop-blur-md font-bold">
                    LE RENOUVEAU • SUJÛD SOUVERAIN
                  </span>
                </div>

                <h3 className="font-heading font-bold text-2xl text-[#181512]">
                  L&apos;inversion biologique & la paix du cœur
                </h3>
                <p className="text-sm text-[#5C534A] font-sans leading-[1.65]">
                  La prosternation (Sujûd) est la seule posture humaine où le cœur se trouve au-dessus du cerveau. La pression artérielle irrigue massivement le cortex préfrontal, tandis que la pression mécanique sur les carotides stimule le nerf vague. Le cortisol s&apos;effondre en 90 secondes. Vous vous relevez calme, lucide, inébranlable.
                </p>
              </div>

              <div className="pt-6 border-t border-[#E5DDD2] flex items-center justify-between text-xs font-mono text-[#7A6F64]">
                <span>RÉSULTAT</span>
                <span className="text-[#087B53] font-bold">-40% Cortisol & Clarté Immédiate</span>
              </div>
            </article>

          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 3 : LA MÉTHODE & L'AUTEUR (RASSURANCE PAR L'EXPÉRIENCE)
          - Portrait de Mounir Byar dans son cabinet de travail
          - Explication de la méthodologie C.O.M.E.S.
          ════════════════════════════════════════════════════════════ */}
      <section id="auteur-methode" className="relative py-24 sm:py-32 px-5 sm:px-10 lg:px-16 bg-[#F4EFEA] border-t border-[#E5DDD2]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Colonne Visuel : Mounir Byar en recherche dans son cabinet */}
          <div className="lg:col-span-5 relative h-96 sm:h-[480px] rounded-3xl overflow-hidden border border-[#E5DDD2] shadow-xl">
            <Image
              src="/images/sanctuaire/muslim_intellectual_mounir.jpg"
              alt="Mounir Byar écrivant dans son cabinet de recherche avec Coran et traités"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center filter brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E5DDD2]">
              <span className="font-heading font-bold text-base text-[#181512] block">Mounir BYAR</span>
              <span className="font-mono text-[10px] text-[#B88E3E] uppercase tracking-wider font-bold">
                Ingénieur & Auteur du Protocole C.O.M.E.S.
              </span>
            </div>
          </div>

          {/* Colonne Contenu : Rassurance & Expérience */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B88E3E] block font-bold">
              02 // L&apos;AUTEUR & LA RECHERCHE
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-[#181512] tracking-[-0.025em] leading-[1.08]">
              « Je n&apos;ai rien inventé. J&apos;ai réconcilié l&apos;ingénierie moderne et la Révélation. »
            </h2>
            <p className="text-sm sm:text-base text-[#5C534A] font-sans leading-[1.7]">
              Ingénieur de formation, j&apos;ai passé plus de dix ans à analyser pourquoi tant de musulmans instruits, ambitieux et sincères souffraient d&apos;une foi en dents de scie et d&apos;une procrastination chronique.
            </p>
            <p className="text-sm sm:text-base text-[#5C534A] font-sans leading-[1.7]">
              En croisant les neurosciences comportementales, la chronobiologie solaire et l&apos;exégèse coranique approfondie, une évidence s&apos;est imposée : la Salât a été conçue par notre Créateur comme un système d&apos;exploitation complet pour maintenir l&apos;être humain dans son état optimal de Khalifa (lieutenant sur Terre).
            </p>

            {/* 3 Garanties d'expérience */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white border border-[#E5DDD2] shadow-sm">
                <span className="font-heading font-bold text-2xl text-[#B88E3E] block">10 Ans</span>
                <span className="text-xs text-[#5C534A] font-sans">De recherche & d&apos;exégèse</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E5DDD2] shadow-sm">
                <span className="font-heading font-bold text-2xl text-[#087B53] block">1 200+</span>
                <span className="text-xs text-[#5C534A] font-sans">Vies débloquées</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E5DDD2] shadow-sm">
                <span className="font-heading font-bold text-2xl text-[#181512] block">100%</span>
                <span className="text-xs text-[#5C534A] font-sans">Fidèle au Coran & Sunnah</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-6">
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-wider text-[#B88E3E] hover:underline"
              >
                <span>En savoir plus sur le parcours de Mounir Byar</span>
                <span>→</span>
              </Link>
              <Link
                href="/prix"
                className="inline-flex items-center gap-2 text-xs font-heading font-semibold uppercase tracking-wider text-[#087B53] hover:underline"
              >
                <span>Découvrir la grille tarifaire</span>
                <span>↗</span>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 4 : LES LIVRES FONDATEURS (RASSURANCE & ACCESSIBILITÉ)
          - Mockups 3D réels des livres
          - Prix accessible dès 5,90 € pour tester la méthode sans risque
          ════════════════════════════════════════════════════════════ */}
      <section id="livres-fondateurs" className="relative py-24 sm:py-32 px-5 sm:px-10 lg:px-16 bg-[#FAF8F5] border-t border-[#E5DDD2]">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#B88E3E] block font-bold">
              03 // LES OUVRAGES DE RÉFÉRENCE
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-[#181512] tracking-[-0.025em] leading-[1.1]">
              Commencez votre métamorphose dès aujourd&apos;hui.
            </h2>
            <p className="text-sm sm:text-base text-[#5C534A] font-sans leading-[1.65]">
              Accédez aux traités qui ont restauré la constance de milliers de lecteurs, disponibles immédiatement en téléchargement ou format broché.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* LIVRE 1 : Les Secrets de la Salat */}
            <article className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E5DDD2] hover:border-[#B88E3E]/50 transition-all duration-300 flex flex-col justify-between space-y-8 shadow-[0_10px_30px_rgba(50,40,30,0.04)]">
              <div className="space-y-6">
                <div className="relative h-64 sm:h-80 w-full flex items-center justify-center">
                  <Image
                    src="/books/Mockup-3D-Secrets.png"
                    alt="Mockup 3D du livre Les Secrets de la Salat et du Retour vers Allah"
                    fill
                    className="object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-[10px] text-[#087B53] uppercase tracking-wider font-bold bg-[#087B53]/10 px-2.5 py-1 rounded-full">
                    LE TRAITÉ MAÎTRE • PLUS DE 5 000 EXEMPLAIRES
                  </span>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#181512]">
                    Les Secrets de la Salât et du Retour vers Allah
                  </h3>
                  <p className="text-sm text-[#5C534A] font-sans leading-[1.65]">
                    L&apos;ouvrage fondateur pour comprendre chaque station de la prière. De l&apos;alignement vertébral du Qiyâm à la mise à la terre du Sujûd, redécouvrez le sens profond des gestes et des paroles sacrées.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E5DDD2] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[#7A6F64] text-xs font-mono block">Format Numérique & Broché</span>
                  <span className="text-[#181512] font-heading font-bold text-2xl">Dès 5,90 €</span>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href="/livres#secrets"
                    className="px-6 py-3 rounded-full bg-[#B88E3E] text-white font-heading font-semibold text-xs uppercase tracking-wider hover:bg-[#A37B32] transition-all shadow-md"
                  >
                    Obtenir le Livre ↗
                  </Link>
                  <a
                    href="/Les-Secrets-du-Retour-vers-Allah-EXTRAIT-OFFERT.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-full border border-[#E5DDD2] text-[#181512] font-heading text-xs uppercase tracking-wider hover:bg-[#F3EDE4] transition-all"
                  >
                    Extrait Offert
                  </a>
                </div>
              </div>
            </article>

            {/* LIVRE 2 : Sourate Ar-Rahman & La Miséricorde */}
            <article className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E5DDD2] hover:border-[#B88E3E]/50 transition-all duration-300 flex flex-col justify-between space-y-8 shadow-[0_10px_30px_rgba(50,40,30,0.04)]">
              <div className="space-y-6">
                <div className="relative h-64 sm:h-80 w-full flex items-center justify-center">
                  <Image
                    src="/books/Mockup-3D-ArRahman.png"
                    alt="Mockup 3D du livre Sourate Ar-Rahman par Mounir Byar"
                    fill
                    className="object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-3">
                  <span className="font-mono text-[10px] text-[#B88E3E] uppercase tracking-wider font-bold bg-[#B88E3E]/10 px-2.5 py-1 rounded-full">
                    EXÉGÈSE & CONTEMPLATION COSMIQUE
                  </span>
                  <h3 className="font-heading font-bold text-2xl sm:text-3xl text-[#181512]">
                    Sourate Ar-Rahmân : Les Clés de la Gratitude
                  </h3>
                  <p className="text-sm text-[#5C534A] font-sans leading-[1.65]">
                    Une plongée vertigineuse dans les 78 versets d&apos;Ar-Rahmân. Comment la contemplation des lois cosmiques guérit l&apos;anxiété moderne et installe une paix inébranlable dans le cœur du croyant.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E5DDD2] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[#7A6F64] text-xs font-mono block">Format Numérique & Broché</span>
                  <span className="text-[#181512] font-heading font-bold text-2xl">Dès 5,90 €</span>
                </div>

                <Link
                  href="/livres#ar-rahman"
                  className="px-6 py-3 rounded-full bg-[#181512] text-white font-heading font-semibold text-xs uppercase tracking-wider hover:bg-[#2A241F] transition-all shadow-md"
                >
                  Découvrir l&apos;Ouvrage ↗
                </Link>
              </div>
            </article>

          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 5 : L'ACCOMPAGNEMENT PRIVÉ D'EXCELLENCE (LE SERVICE PREMIUM)
          - Protocole 9-12 Mois & Mentorat behavioriste
          - Pour dirigeants, entrepreneurs et créateurs musulmans
          ════════════════════════════════════════════════════════════ */}
      <section id="accompagnement" className="relative py-24 sm:py-32 px-5 sm:px-10 lg:px-16 bg-[#F4EFEA] border-t border-[#E5DDD2]">
        <div className="max-w-5xl mx-auto p-8 sm:p-14 lg:p-16 rounded-3xl bg-white border border-[#E5DDD2] shadow-xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#B88E3E]/5 rounded-full filter blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8 text-center max-w-3xl mx-auto">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#B88E3E] block font-bold">
              04 // HAUTE DIRECTION & COMPAGNONNAGE
            </span>

            <h2 className="font-heading font-bold text-3xl sm:text-5xl text-[#181512] tracking-[-0.025em] leading-[1.08]">
              Le Protocole 9 Mois : L&apos;Accompagnement Privé
            </h2>

            <p className="text-sm sm:text-base text-[#5C534A] font-sans leading-[1.7]">
              Un mentorat sur-mesure réservé aux musulmans exigeants (entrepreneurs, médecins, ingénieurs, cadres) qui veulent instaurer la Salât comme tour de contrôle décisionnelle, assainir leur écosystème mental et assumer pleinement leur mandat de Khalifa.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left">
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DDD2]">
                <span className="font-mono text-xs text-[#B88E3E] font-bold block mb-1">01. AUDIT</span>
                <p className="text-xs text-[#5C534A] font-sans">Diagnostic comportemental approfondi de vos freins et sabotages.</p>
              </div>
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DDD2]">
                <span className="font-mono text-xs text-[#B88E3E] font-bold block mb-1">02. COMPAGNONNAGE</span>
                <p className="text-xs text-[#5C534A] font-sans">Suivi individuel direct avec Mounir Byar pour chaque prière.</p>
              </div>
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DDD2]">
                <span className="font-mono text-xs text-[#B88E3E] font-bold block mb-1">03. ANCRAGE</span>
                <p className="text-xs text-[#5C534A] font-sans">Discipline inébranlable et clarté d&apos;esprit pour le restant de vos jours.</p>
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/candidature"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#087B53] text-white font-heading font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(8,123,83,0.30)] hover:bg-[#066343] hover:scale-105 transition-all"
              >
                Déposer ma candidature confidentielle ↗
              </Link>
              <Link
                href="/prix"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FAF8F5] hover:bg-[#EDE5D8] border border-[#E5DDD2] text-[#181512] font-heading text-xs sm:text-sm uppercase tracking-wider transition-all"
              >
                Voir toute la grille tarifaire (dès 5,90 €)
              </Link>
            </div>

            <p className="text-[11px] text-[#7A6F64] font-mono tracking-wide">
              PLACES LIMITÉES POUR GARANTIR UNE ATTENTION ABSOLUE • SÉLECTION SUR DOSSIER
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
