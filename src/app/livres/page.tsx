"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ============================================================================
   DONNÉES : LIVRE I — LES SECRETS DU RETOUR VERS ALLAH
   ============================================================================ */

const secretsChapters = [
  { num: "I", title: "L'Éveil du Cœur : Pourquoi revenir ?", pages: "p. 7" },
  { num: "II", title: "La Réalité du Péché et ses Voiles", pages: "p. 19" },
  { num: "III", title: "Les Conditions Authentiques de la Tawbah", pages: "p. 34" },
  { num: "IV", title: "Le Regret Sincère (An-Nadm) comme Catalyseur", pages: "p. 52" },
  { num: "V", title: "Briser le Cycle des Rechutes", pages: "p. 68" },
  { num: "VI", title: "La Douceur de la Proximité Retrouvée", pages: "p. 89" },
  { num: "VII", title: "Vivre sous le Regard du Tout-Miséricordieux", pages: "p. 112" },
];

interface ExcerptPage {
  page: number;
  header: string;
  title?: string;
  subtitle?: string;
  epigraph?: { text: string; ref: string };
  content: React.ReactNode;
}

const secretsExcerptPages: ExcerptPage[] = [
  {
    page: 6,
    header: "LES SECRETS DU RETOUR VERS ALLAH",
    title: "SOMMAIRE DE L'OUVRAGE",
    subtitle: "Architecture du cheminement intérieur",
    content: (
      <div className="space-y-4">
        <p className="text-stone-600 italic font-serif text-sm sm:text-base leading-relaxed mb-4">
          « Chaque porte de ce livre a été conçue comme une halte spirituelle, menant le lecteur de la lourdeur de l&apos;oubli vers la légèreté de la présence divine. »
        </p>
        <div className="divide-y divide-stone-200/80 border-t border-b border-stone-200">
          {secretsChapters.map((c) => (
            <div key={c.num} className="py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-serif italic text-amber-800 font-bold w-6 shrink-0">{c.num}.</span>
                <span className="text-stone-800 font-medium truncate">{c.title}</span>
              </div>
              <span className="text-stone-400 font-mono text-[11px] shrink-0">{c.pages}</span>
            </div>
          ))}
        </div>
        <div className="pt-3 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-amber-800 font-semibold">
            Suivi du Carnet d&apos;Introspection & des Invocations Prophétiques du Repentir
          </p>
        </div>
      </div>
    ),
  },
  {
    page: 7,
    header: "CHAPITRE I — L'ÉVEIL DU CŒUR",
    title: "CHAPITRE PREMIER",
    subtitle: "L'Éveil du Cœur : Pourquoi revenir ?",
    epigraph: {
      text: "« Ô Mes serviteurs qui avez commis des excès à votre propre détriment, ne désespérez pas de la miséricorde d'Allah. Car Allah pardonne tous les péchés. Oui, c'est Lui le Pardonneur, le Très Miséricordieux. »",
      ref: "Coran, Sourate Az-Zumar (39 : 53)",
    },
    content: (
      <div className="space-y-4 text-stone-800 font-serif text-sm sm:text-base leading-relaxed text-justify">
        <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-amber-800 first-letter:float-left first-letter:mr-3 first-letter:leading-none">
          Il existe, au plus profond de chaque être humain, une boussole silencieuse que nul vacarme mondain ne parvient totalement à détruire. On peut l&apos;étouffer sous le poids des distractions, la recouvrir des voiles de l&apos;habitude ou tenter de l&apos;anesthésier par la course effrénée aux illusions : tôt ou tard, dans le silence d&apos;une nuit ou au détour d&apos;une épreuve, cette voix intérieure se réveille.
        </p>
        <p>
          Ce réveil ne se manifeste pas toujours par des larmes spectaculaires. Bien souvent, il commence par une simple lassitude — cette sensation étrange d&apos;être en exil au milieu de sa propre vie, d&apos;avoir tout construit à l&apos;extérieur tout en laissant son sanctuaire intérieur en ruines.
        </p>
        <p>
          Sache, lecteur qui tiens ces pages entre tes mains, que cette inquiétude secrète qui traverse ta poitrine n&apos;est pas le signe de ta perte. Elle est, au contraire, la première lettre d&apos;une invitation céleste : le signe qu&apos;Allah ne t&apos;a pas abandonné à ton oubli.
        </p>
      </div>
    ),
  },
  {
    page: 8,
    header: "LES SECRETS DU RETOUR VERS ALLAH",
    subtitle: "L'exil intérieur et la nostalgie de l'origine",
    content: (
      <div className="space-y-4 text-stone-800 font-serif text-sm sm:text-base leading-relaxed text-justify">
        <p>
          Les maîtres de la spiritualité islamique ont toujours décrit l&apos;âme humaine comme une voyageuse nostalgique de sa patrie originelle. Avant même d&apos;entrer dans ce monde d&apos;argile et d&apos;épreuves, nos âmes ont connu la douceur de la proximité divine lors du Pacte primordial (<em>Al-Mîthâq</em>), lorsqu&apos;Allah nous demanda : <em>« Ne suis-Je pas votre Seigneur ? »</em> et que toutes répondirent d&apos;une seule voix : <em>« Mais si, nous en témoignons ! »</em> (Sourate Al-A&apos;râf, 7 : 172).
        </p>
        <p>
          C&apos;est pourquoi aucun succès matériel, aucune reconnaissance sociale, aucun plaisir éphémère ne pourra jamais rassasier durablement le cœur de l&apos;homme. Tenter de combler le vide de l&apos;âme par autre chose que la présence de son Créateur, c&apos;est vouloir étancher sa soif avec de l&apos;eau de mer : plus on en boit, plus la brûlure s&apos;intensifie.
        </p>
        <blockquote className="my-4 pl-4 border-l-2 border-amber-700 italic text-stone-700 bg-amber-50/50 py-2.5 pr-3 rounded-r">
          « Le cœur ne connaît de véritable repos que lorsqu&apos;il retourne vers Celui qui l&apos;a façonné. Tout le reste n&apos;est qu&apos;attente et dispersion. »
        </blockquote>
        <p>
          Revenir vers Allah (<em>At-Tawbah</em>), ce n&apos;est donc pas s&apos;infliger une punition austère : c&apos;est enfin rentrer chez soi après un trop long voyage dans le froid.
        </p>
      </div>
    ),
  },
  {
    page: 9,
    header: "CHAPITRE I — L'ÉVEIL DU CŒUR",
    subtitle: "Le piège redoutable du renvoi au lendemain",
    content: (
      <div className="space-y-4 text-stone-800 font-serif text-sm sm:text-base leading-relaxed text-justify">
        <p>
          Lorsque la lumière de l&apos;éveil effleure le cœur, le premier obstacle qui se dresse sur la route du serviteur n&apos;est pas le refus frontal, mais une ruse beaucoup plus subtile : <em>At-Taswîf</em> — l&apos;art fatal de remettre à demain.
        </p>
        <p>
          <em>« Je me repentirai quand mes affaires seront réglées », « quand j&apos;aurai atteint tel âge », « après ce dernier écart »...</em> Telle est la mélodie trompeuse par laquelle l&apos;âme charnelle (<em>An-Nafs</em>) et l&apos;ennemi invisible endorment les résolutions les plus nobles. Or, le temps n&apos;est pas un réservoir infini dans lequel nous puisons à loisir : chaque souffle qui sort de notre poitrine est une pierre qui se détache de l&apos;édifice de notre existence terrestre.
        </p>
        <p>
          Les pieux prédécesseurs disaient avec gravité : <em>« Prends garde au &ldquo;je ferai demain&rdquo;, car c&apos;est par ce mot que des générations entières ont péri avant toi. »</em> Le croyant lucide comprend qu&apos;il ne possède ni le jour d&apos;hier, qui est déjà scellé dans les registres célestes, ni le jour de demain, dont il ignore s&apos;il verra l&apos;aube. Il ne possède que l&apos;instant présent (<em>Al-Waqt</em>).
        </p>
      </div>
    ),
  },
  {
    page: 10,
    header: "LES SECRETS DU RETOUR VERS ALLAH",
    subtitle: "La Porte qui ne se ferme jamais",
    content: (
      <div className="space-y-4 text-stone-800 font-serif text-sm sm:text-base leading-relaxed text-justify">
        <p>
          La seconde illusion qui paralyse le retour du serviteur est le sentiment d&apos;indignité : <em>« Comment oserais-je me présenter devant Allah après avoir tant trahi mes engagements ? Comment lever les mains vers le Ciel alors que mon cœur est encore taché par mes fautes d&apos;hier ? »</em>
        </p>
        <p>
          Cette pensée, qui prend le masque trompeur de l&apos;humilité, est en réalité l&apos;une des pires ruses du désespoir. Car mesurer la possibilité du pardon à l&apos;aune de nos propres fautes, c&apos;est oublier l&apos;immensité infinie de Celui qui pardonne. Tes péchés, aussi nombreux soient-ils, demeurent l&apos;acte limité d&apos;une créature limitée ; tandis que la Miséricorde d&apos;Allah est l&apos;attribut éternel et sans rivage du Créateur des cieux et de la terre.
        </p>
        <p>
          Le Prophète ﷺ nous a révélé cette vérité bouleversante : <em>« Allah étend Sa Main durant la nuit pour accueillir le repentir de celui qui a péché durant le jour, et Il étend Sa Main durant le jour pour accueillir le repentir de celui qui a péché durant la nuit, et ce jusqu&apos;à ce que le soleil se lève de son couchant. »</em> (Rapporté par Muslim).
        </p>
      </div>
    ),
  },
  {
    page: 11,
    header: "CHAPITRE I — L'ÉVEIL DU CŒUR",
    subtitle: "La Joie divine face au retour du serviteur",
    content: (
      <div className="space-y-4 text-stone-800 font-serif text-sm sm:text-base leading-relaxed text-justify">
        <p>
          Plus prodigieux encore : non seulement Allah accepte celui qui revient vers Lui, mais Il Se réjouit de ce retour d&apos;une joie qui dépasse tout entendement humain. Dans le célèbre hadith de l&apos;homme égaré dans le désert qui retrouve soudainement sa monture chargée de ses vivres après avoir attendu la mort, le Messager d&apos;Allah ﷺ affirme qu&apos;Allah est plus joyeux du repentir de Son serviteur que ce voyageur sauvé in extremis du néant.
        </p>
        <p>
          Pourquoi une telle bienveillance ? Parce qu&apos;Allah Se nomme Lui-même <strong>At-Tawwâb</strong> — Celui qui ne cesse de revenir vers Ses créatures pour accueillir leur retour. Lorsque tu fais un seul pas hésitant vers Lui, brisé par tes contradictions mais sincère dans ton désir de guérison, Sa grâce vient à ta rencontre avec une rapidité vertigineuse.
        </p>
        <blockquote className="my-4 pl-4 border-l-2 border-amber-700 italic text-stone-700 bg-amber-50/50 py-2.5 pr-3 rounded-r">
          « Celui qui s&apos;approche de Moi d&apos;un empan, Je M&apos;approche de lui d&apos;une coudée ; et s&apos;il vient à Moi en marchant, Je vais à lui en hâtant le pas. » (Hadith Qudsî — Al-Bukhârî)
        </blockquote>
      </div>
    ),
  },
  {
    page: 12,
    header: "LES SECRETS DU RETOUR VERS ALLAH",
    subtitle: "Le Premier Pas : L'aveu sans fard (Al-I'tirâf)",
    content: (
      <div className="space-y-4 text-stone-800 font-serif text-sm sm:text-base leading-relaxed text-justify">
        <p>
          Par où commencer lorsque l&apos;on décide enfin de franchir le seuil du retour ? Le secret fondamental, sur lequel s&apos;accordent tous les connaisseurs d&apos;Allah, tient en un seul mot : <strong>la vérité nue</strong>.
        </p>
        <p>
          Ne cherche pas à embellir ton état devant Celui qui connaît le mystère des cœurs. Dépose les armes de la justification, cesse de chercher des excuses à tes chutes, et présente-toi devant Lui tel que tu es : pauvre, vulnérable, assoiffé de Sa lumière. C&apos;est précisément dans cette brisure du cœur (<em>Inkisâr al-Qalb</em>) que réside le trésor de la proximité.
        </p>
        <p>
          Lorsque notre père Âdam et son épouse goûtèrent à l&apos;arbre interdit, ils ne cherchèrent aucun argument pour défendre leur erreur. Ils prononcèrent immédiatement la parole qui ouvre toutes les portes du Ciel : <em>« Seigneur ! Nous nous sommes fait du tort à nous-mêmes. Et si Tu ne nous pardonnes pas et ne nous fais pas miséricorde, nous serons très certainement du nombre des perdants. »</em> (Coran, 7 : 23).
        </p>
        <p className="text-amber-900 font-semibold italic">
          Mais pour que cet éveil ne demeure pas une simple émotion passagère, il faut maintenant comprendre la mécanique secrète des voiles qui obscurcissent le cœur...
        </p>
      </div>
    ),
  },
];

/* ============================================================================
   DONNÉES : LIVRE II — AR-RAHMAN : LA MER SANS RIVAGE
   ============================================================================ */

const rahmanChapters = [
  { num: "I", title: "Au Seuil de l'Infini : Le Nom qui ouvre toute chose", pages: "p. 9" },
  { num: "II", title: "Le Mystère des Deux Noms : Ar-Rahman & Ar-Rahim", pages: "p. 12" },
  { num: "III", title: "L'Étymologie Sacrée : R-H-M et le Secret de la Matrice", pages: "p. 25" },
  { num: "IV", title: "Les Cent Parties de la Miséricorde Divine", pages: "p. 39" },
  { num: "V", title: "La Miséricorde inscrite sur le Trône", pages: "p. 53" },
  { num: "VI", title: "Sourate Ar-Rahman : La Symphonie des Bienfaits", pages: "p. 67" },
  { num: "VII", title: "Les Épreuves : Le Visage Caché de la Rahma", pages: "p. 85" },
  { num: "VIII", title: "Le Prophète ﷺ : La Miséricorde Vivante (Rahmatan lil-'Âlamîn)", pages: "p. 103" },
  { num: "IX", title: "Quand le Péché devient Porte vers Ar-Rahman", pages: "p. 121" },
  { num: "X", title: "Se Revêtir de la Rahma : Devenir Miséricordieux", pages: "p. 139" },
  { num: "XI", title: "Ar-Rahman au Jour Dernier : L'Ultime Espérance", pages: "p. 157" },
  { num: "XII", title: "Vivre avec Ar-Rahman : Invocations & Programme de Dhikr", pages: "p. 173" },
];

const rahmanExcerptPages: ExcerptPage[] = [
  {
    page: 6,
    header: "AR-RAHMAN — LA MER SANS RIVAGE",
    title: "TABLE DES MATIÈRES",
    subtitle: "Douze portes pour contempler l'Océan de la Miséricorde",
    content: (
      <div className="space-y-3">
        <p className="text-stone-600 italic font-serif text-sm sm:text-base leading-relaxed mb-3">
          « Un voyage spirituel en douze chapitres, des fondements linguistiques et coraniques du Nom Ar-Rahman jusqu&apos;à la transformation quotidienne du cœur par le Dhikr. »
        </p>
        <div className="divide-y divide-stone-200/80 border-t border-b border-stone-200">
          {rahmanChapters.slice(0, 6).map((c) => (
            <div key={c.num} className="py-2 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-serif italic text-amber-800 font-bold w-7 shrink-0">{c.num}.</span>
                <span className="text-stone-800 font-medium truncate">{c.title}</span>
              </div>
              <span className="text-stone-400 font-mono text-[11px] shrink-0">{c.pages}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-stone-400 text-center pt-2">
          Suite de la Table des Matières en page suivante →
        </p>
      </div>
    ),
  },
  {
    page: 7,
    header: "AR-RAHMAN — LA MER SANS RIVAGE",
    title: "TABLE DES MATIÈRES (SUITE)",
    subtitle: "De l'épreuve rédemptrice à la pratique quotidienne",
    content: (
      <div className="space-y-3">
        <div className="divide-y divide-stone-200/80 border-t border-b border-stone-200">
          {rahmanChapters.slice(6).map((c) => (
            <div key={c.num} className="py-2 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-serif italic text-amber-800 font-bold w-7 shrink-0">{c.num}.</span>
                <span className="text-stone-800 font-medium truncate">{c.title}</span>
              </div>
              <span className="text-stone-400 font-mono text-[11px] shrink-0">{c.pages}</span>
            </div>
          ))}
        </div>
        <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-lg mt-4">
          <p className="text-xs font-serif text-amber-950 leading-relaxed">
            <strong>Inclus en fin d&apos;ouvrage :</strong> Glossaire complet des termes arabes, recueil d&apos;invocations prophétiques authentifiées et programme hebdomadaire de Dhikr par les Noms de Miséricorde.
          </p>
        </div>
      </div>
    ),
  },
  {
    page: 8,
    header: "NOTE DE L'AUTEUR",
    title: "AVANT-PROPOS",
    subtitle: "Pourquoi écrire sur Ar-Rahman aujourd'hui ?",
    epigraph: {
      text: "« Et Ma miséricorde embrasse toute chose. »",
      ref: "Coran, Sourate Al-A'râf (7 : 156)",
    },
    content: (
      <div className="space-y-4 text-stone-800 font-serif text-sm sm:text-base leading-relaxed text-justify">
        <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-amber-800 first-letter:float-left first-letter:mr-3 first-letter:leading-none">
          Nous traversons une époque de dureté, de vitesse et d&apos;épuisement intérieur. Beaucoup de croyants portent leur foi comme un fardeau d&apos;inquiétude, craignant sans cesse de ne pas être à la hauteur, paralysés par leurs manquements ou meurtris par des épreuves dont ils ne saisissent plus le sens.
        </p>
        <p>
          Pourtant, dix-sept fois par jour au minimum, sur les lèvres de chaque priant, résonne le même appel : <em>Bismillâhi Ar-Rahmâni Ar-Rahîm</em>. Si Dieu a choisi de Se présenter à nous, à l&apos;ouverture de Son Livre et à l&apos;aube de chacun de nos gestes, non pas par Sa vengeance ni par Sa rigueur, mais par l&apos;océan débordant de Sa Rahma, ce n&apos;est pas un hasard. C&apos;est la clé de voûte de toute notre existence.
        </p>
      </div>
    ),
  },
  {
    page: 9,
    header: "CHAPITRE I — AU SEUIL DE L'INFINI",
    title: "CHAPITRE PREMIER",
    subtitle: "Au Seuil de l'Infini : Le Nom qui ouvre toute chose",
    epigraph: {
      text: "« Invoquez Allah, ou invoquez Ar-Rahman : quel que soit le Nom par lequel vous L'appelez, à Lui appartiennent les Noms les plus beaux. »",
      ref: "Coran, Sourate Al-Isrâ' (17 : 110)",
    },
    content: (
      <div className="space-y-4 text-stone-800 font-serif text-sm sm:text-base leading-relaxed text-justify">
        <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:text-amber-800 first-letter:float-left first-letter:mr-3 first-letter:leading-none">
          Avant que ta langue ne prononce la moindre demande, avant que ton front ne touche le sol, avant même que tes yeux ne parcourent la première sourate du Coran, une porte lumineuse se dresse devant toi : la <em>Basmalah</em>.
        </p>
        <p>
          <strong>Bismillâhi Ar-Rahmâni Ar-Rahîm.</strong> Par ces quatre mots, le serviteur quitte l&apos;illusion de sa propre force pour entrer sous la protection d&apos;Allah, d&apos;Ar-Rahman et d&apos;Ar-Rahim. Les savants de l&apos;exégèse ont fait remarquer une subtilité vertigineuse : parmi les quatre-vingt-dix-neuf Noms divins, seul <em>Ar-Rahman</em> possède dans le Coran un statut d&apos;équivalence d&apos;invocation avec le Nom suprême <em>Allah</em>.
        </p>
        <p>
          Entrer dans la compréhension d&apos;Ar-Rahman, c&apos;est découvrir que l&apos;univers entier dans lequel nous respirons n&apos;est pas né d&apos;un hasard froid, mais d&apos;un débordement de miséricorde.
        </p>
      </div>
    ),
  },
  {
    page: 10,
    header: "AR-RAHMAN — LA MER SANS RIVAGE",
    subtitle: "Quand l'univers entier respire par Sa Rahma",
    content: (
      <div className="space-y-4 text-stone-800 font-serif text-sm sm:text-base leading-relaxed text-justify">
        <p>
          Regarde autour de toi avec l&apos;œil du cœur : la goutte de pluie qui fend l&apos;écorce aride pour faire germer la graine, la tendresse instinctive avec laquelle l&apos;oiseau nourrit ses petits au bord du nid, la capacité miraculeuse du cœur humain à pardonner après avoir été blessé, et jusqu&apos;à ce souffle d&apos;oxygène qui entre dans tes poumons à cet instant précis sans que tu ne l&apos;aies mérité ni payé... Tout cela n&apos;est qu&apos;un infime reflet du Nom <strong>Ar-Rahman</strong>.
        </p>
        <blockquote className="my-4 pl-4 border-l-2 border-amber-700 italic text-stone-700 bg-amber-50/50 py-2.5 pr-3 rounded-r">
          « Nous n&apos;existons que parce qu&apos;Il est Ar-Rahman. Si Sa Miséricorde se retirait du cosmos l&apos;espace d&apos;un clin d&apos;œil, les cieux et la terre s&apos;effondreraient aussitôt. »
        </blockquote>
        <p>
          Pourtant, la plupart des hommes traversent l&apos;océan de Ses bienfaits comme le poisson traverse l&apos;eau : tellement immergés dans la grâce qu&apos;ils finissent par ne plus la voir.
        </p>
      </div>
    ),
  },
  {
    page: 11,
    header: "CHAPITRE I — AU SEUIL DE L'INFINI",
    subtitle: "Guérir l'image que nous avons de notre Seigneur",
    content: (
      <div className="space-y-4 text-stone-800 font-serif text-sm sm:text-base leading-relaxed text-justify">
        <p>
          Dans un hadith qudsî d&apos;une portée immense, Allah dit : <em>« Je suis auprès de l&apos;opinion que Mon serviteur se fait de Moi (Anâ &lsquo;inda zhanni &lsquo;abdî bî). »</em> (Rapporté par Al-Bukhârî et Muslim).
        </p>
        <p>
          Cela signifie que la qualité de ta vie spirituelle dépend directement de la connaissance que tu as de ton Seigneur. Celui qui ne connaît Allah qu&apos;à travers la peur servile finit par fuir ou se décourager à la moindre chute ; mais celui qui découvre la réalité d&apos;Ar-Rahman comprend que même derrière la rigueur apparente du destin se cache la main bienveillante d&apos;un Médecin infiniment sage.
        </p>
        <p>
          Connaître Ar-Rahman, c&apos;est guérir le cœur de la suspicion, de l&apos;angoisse du lendemain et de la sécheresse spirituelle.
        </p>
      </div>
    ),
  },
  {
    page: 12,
    header: "CHAPITRE II — LE MYSTÈRE DES DEUX NOMS",
    title: "CHAPITRE DEUXIÈME",
    subtitle: "Le Mystère des Deux Noms : Ar-Rahman & Ar-Rahim",
    content: (
      <div className="space-y-4 text-stone-800 font-serif text-sm sm:text-base leading-relaxed text-justify">
        <p>
          Pourquoi Allah Se décrit-Il simultanément par deux Noms issus de la même racine <strong>R-H-M</strong> (<em>Ar-Rahmân</em> et <em>Ar-Rahîm</em>) ? Dans la langue arabe, qui est le joyau de la précision spirituelle, aucune répétition n&apos;est gratuite : chaque schème grammatical révèle une dimension nouvelle de la réalité divine.
        </p>
        <p>
          Le Nom <strong>Ar-Rahmân</strong> est construit sur le schème d&apos;intensité <em>Fa&lsquo;lân</em>, qui exprime en arabe la plénitude débordante, l&apos;immensité océanique qui englobe toutes les créatures sans exception — le croyant comme le négateur, l&apos;homme comme l&apos;animal, en ce bas monde. Le Nom <strong>Ar-Rahîm</strong>, quant à lui, suit le schème <em>Fa&lsquo;îl</em>, qui indique la constance durable, l&apos;intimité et l&apos;action spécifique qui accompagne les croyants dans leur cheminement et les couronne dans l&apos;Au-delà.
        </p>
        <p className="text-amber-900 font-semibold italic">
          Mais lorsque l&apos;on plonge plus profondément encore dans la racine sacrée R-H-M et dans le hadith de la matrice (Ar-Rahim), un secret plus bouleversant encore se dévoile...
        </p>
      </div>
    ),
  },
];

/* ============================================================================
   DONNÉES : PÔLE 02 — INVOCATIONS PROPHÉTIQUES & DHIKR
   ============================================================================ */

const invocationsList = [
  {
    id: "sayyid-al-istighfar",
    category: "Repentir & Renouveau",
    title: "Sayyid al-Istighfâr — L'Invocation Maîtresse du Pardon",
    source: "Sahîh Al-Bukhârî (n° 6306)",
    arabic:
      "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    phonetic:
      "Allâhumma Anta Rabbî, lâ ilâha illâ Anta, khalaqtanî wa anâ 'abduka, wa anâ 'alâ 'ahdika wa wa'dika mâ-stata'tu. A'ûdhu bika min sharri mâ sana'tu, abû'u laka bi-ni'matika 'alayya, wa abû'u laka bi-dhanbî faghfir lî, fa-innahu lâ yaghfiru dh-dhunûba illâ Anta.",
    translation:
      "« Ô Allah, Tu es mon Seigneur, il n'y a de divinité digne d'adoration que Toi. Tu m'as créé et je suis Ton serviteur. Je me tiens sur Ton pacte et Ta promesse autant que je le peux. Je cherche refuge auprès de Toi contre le mal que j'ai commis. Je reconnais pleinement Tes bienfaits sur moi et je reconnais mon péché : pardonne-moi donc, car nul ne pardonne les péchés si ce n'est Toi. »",
    secret:
      "Le Prophète ﷺ a enseigné que celui qui la prononce avec certitude le matin ou le soir s'ouvre les portes du Paradis. Elle réunit l'aveu de la servitude et la reconnaissance des bienfaits.",
  },
  {
    id: "invocation-yunus",
    category: "Délivrance & Épreuves",
    title: "L'Invocation de Dhû an-Nûn (Yûnus) dans les Ténèbres",
    source: "Coran, Sourate Al-Anbiyâ' (21 : 87)",
    arabic: "لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    phonetic: "Lâ ilâha illâ Anta, Subhânaka, innî kuntu mina zh-zhâlimîn.",
    translation:
      "« Il n'y a de divinité que Toi ! Pureté à Toi ! J'ai vraiment été du nombre des injustes (envers moi-même). »",
    secret:
      "Aucun croyant n'invoque son Seigneur par ces paroles au sujet d'une épreuve sans qu'Allah ne lui accorde une issue favorable.",
  },
  {
    id: "invocation-angoisse",
    category: "Paix du Cœur & Souveraineté",
    title: "Libération du Souci, de la Tristesse et de l'Écrasement",
    source: "Sahîh Al-Bukhârî (n° 6369)",
    arabic:
      "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
    phonetic:
      "Allâhumma innî a'ûdhu bika mina-l-hammi wa-l-hazan, wa-l-'ajzi wa-l-kasal, wa-l-bukhli wa-l-jubn, wa dala'i d-dayni wa ghalabati r-rijâl.",
    translation:
      "« Ô Allah, je cherche protection auprès de Toi contre le souci (du futur) et la tristesse (du passé), contre l'incapacité et la paresse, contre l'avarice et la lâcheté, contre le poids écrasant de la dette et la domination des hommes. »",
    secret:
      "Une architecture psychologique complète : elle protège l'esprit contre l'anxiété (al-hamm) et la mélancolie (al-hazan), et préserve l'énergie vitale et la souveraineté.",
  },
  {
    id: "fermete-coeur",
    category: "Constance & Alignement",
    title: "L'Invocation de la Fermeté du Cœur (Thabât)",
    source: "Jâmi' At-Tirmidhî (n° 2140)",
    arabic: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ",
    phonetic: "Yâ Muqalliba l-qulûb, thabbit qalbî 'alâ dînik.",
    translation:
      "« Ô Toi qui retournes les cœurs, affermis mon cœur sur Ta voie (Ta religion). »",
    secret:
      "L'invocation la plus fréquente du Prophète ﷺ, car le cœur humain se trouve entre deux doigts du Tout-Miséricordieux.",
  },
  {
    id: "ya-hayyu-ya-qayyum",
    category: "Secours par la Miséricorde",
    title: "L'Appel au Vivant et à l'Immuable",
    source: "Sunan At-Tirmidhî (n° 3524)",
    arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ",
    phonetic:
      "Yâ Hayyu yâ Qayyûm, bi-rahmatika astaghîth, aslih lî sha'nî kullahu, wa lâ takilnî ilâ nafsî tarfata 'ayn.",
    translation:
      "« Ô Vivant, Ô Immuable (Qui subsiste par Lui-même et maintient toute chose), par Ta Miséricorde j'implore secours ! Réforme l'ensemble de ma situation et ne me livre pas à moi-même l'espace d'un clin d'œil. »",
    secret:
      "C'est le cœur du Livre II (Ar-Rahman) : reconnaître que si nous sommes livrés à notre propre ego ne serait-ce qu'une seconde, nous nous égarons.",
  },
  {
    id: "invocation-lumiere",
    category: "Clarté & Discernement",
    title: "L'Ouverture de la Poitrine et la Facilité de l'Action",
    source: "Coran, Sourate Tâ-Hâ (20 : 25-28)",
    arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي",
    phonetic:
      "Rabbi-shrah lî sadrî, wa yassir lî amrî, wahlul 'uqdatan min lisânî, yafqahû qawlî.",
    translation:
      "« Seigneur, ouvre-moi ma poitrine (dilate mon cœur), facilite-moi ma mission, et dénoue le nœud de ma langue afin qu'ils comprennent ma parole. »",
    secret:
      "L'invocation de Mûsâ (Moïse) avant d'affronter Pharaon : à réciter avant toute prise de décision majeure ou épreuve intimidante.",
  },
];

const weeklyDhikr = [
  {
    day: "Lundi",
    name: "Yâ Rahmân, Yâ Rahîm",
    count: "100 fois (après Fajr)",
    focus: "Commencer la semaine en immergeant ses projets dans l'Océan de la Miséricorde.",
  },
  {
    day: "Mardi",
    name: "Astaghfirullâh wa atûbu ilayh",
    count: "100 fois",
    focus: "Dissoudre les voiles intérieurs et alléger le cœur de la dispersion.",
  },
  {
    day: "Mercredi",
    name: "Yâ Hayyu Yâ Qayyûm",
    count: "99 fois",
    focus: "Puiser la vitalité et la stabilité auprès du Vivant qui soutient toute chose.",
  },
  {
    day: "Jeudi",
    name: "Lâ hawla wa lâ quwwata illâ billâh",
    count: "100 fois",
    focus: "Un trésor parmi les trésors du Paradis : lâcher l'illusion du contrôle personnel.",
  },
  {
    day: "Vendredi",
    name: "Salât 'alâ An-Nabî ﷺ",
    count: "100 à 300 fois",
    focus: "Se relier à celui qui a été envoyé comme Miséricorde pour les mondes.",
  },
  {
    day: "Samedi",
    name: "Hasbunallâhu wa ni'ma l-Wakîl",
    count: "100 fois",
    focus: "Confiance absolue (Tawakkul) et libération de la peur du lendemain.",
  },
  {
    day: "Dimanche",
    name: "Subhânallâhi wa bi-hamdihi",
    count: "100 fois",
    focus: "Purification du cœur et gratitude avant un nouveau cycle hebdomadaire.",
  },
];

/* ============================================================================
   DONNÉES : PÔLE 03 — VIDÉOS & CAPSULES
   ============================================================================ */

const videoCapsules = [
  {
    id: "video-1",
    tag: "Capsule Fondamentale • 12 min",
    title: "Pourquoi ta volonté seule ne suffit pas à briser tes chaînes",
    summary:
      "Comprendre l'articulation entre la mécanique dopaminergique du cerveau moderne et les lois spirituelles du repentir (At-Tawbah).",
    theme: "Neurosciences & Tawbah",
    status: "En montage final",
  },
  {
    id: "video-2",
    tag: "Méditation Coranique • 18 min",
    title: "Le Secret d'Ar-Rahman : Guérir de la peur et de la culpabilité toxique",
    summary:
      "Plongée au cœur du Livre II : comment passer d'une spiritualité de l'angoisse à la certitude apaisée sous le regard du Tout-Miséricordieux.",
    theme: "Noms Divins & Guérison",
    status: "Prochainement",
  },
  {
    id: "video-3",
    tag: "Ingénierie Intérieure • 15 min",
    title: "Bâtir sa citadelle : La discipline des 3 premières heures du jour",
    summary:
      "Comment sanctuariser l'aube (Fajr), le silence et la clarté mentale avant que le bruit numérique ne capture votre attention.",
    theme: "Souveraineté & Discipline",
    status: "Prochainement",
  },
];

/* ============================================================================
   DONNÉES : PÔLE 04 — FORMATIONS & PROGRAMMES DIGITAUX
   ============================================================================ */

const formationsList = [
  {
    id: "formation-1",
    code: "FORMATION I",
    title: "L'Ingénierie de la Salât & la Présence du Cœur (Al-Khushû')",
    subtitle: "Transformer ses 5 prières quotidiennes en socle de paix et de concentration",
    modules: "6 Modules vidéo + Cahier d'application PDF",
    points: [
      "Le protocole de préparation mentale et nerveuse avant le Takbîr",
      "Comprendre le sens profond de chaque mouvement et parole",
      "Vaincre le vagabondage des pensées (Waswâs & dispersion moderne)",
    ],
    badge: "Ouverture prochaine",
  },
  {
    id: "formation-2",
    code: "FORMATION II",
    title: "À l'École des Noms d'Allah : Guérison Émotionnelle & Certitude",
    subtitle: "Invoquer, méditer et vivre au quotidien avec les Noms de Beauté et de Majesté",
    modules: "8 Modules vidéo + Programme guidé de 40 jours",
    points: [
      "Étude approfondie d'Ar-Rahman, Ar-Rahim, Al-Jabbar, Al-Latif, Al-Wakil",
      "Associer chaque épreuve de la vie au Nom divin qui en détient le remède",
      "Protocole de Dhikr quotidien structuré matin et soir",
    ],
    badge: "En préparation",
  },
  {
    id: "formation-3",
    code: "FORMATION III",
    title: "Maîtrise du Nafs & Détox Dopaminergique",
    subtitle: "Sortir de la procrastination, des addictions silencieuses et de l'éparpillement",
    modules: "5 Modules intensifs + Feuille de route 30 jours",
    points: [
      "Neurobiologie de l'habitude et sagesse prophétique de la maîtrise de soi",
      "Briser le cycle de la rechute sans sombrer dans le désespoir",
      "Reconstruire une architecture quotidienne de haute valeur spirituelle et professionnelle",
    ],
    badge: "En préparation",
  },
];

/* ============================================================================
   COMPOSANT : LISEUSE D'EXTRAIT (PAGES 6 À 12 + PAGE 13 VERROUILLÉE)
   ============================================================================ */

function BookExcerptReader({
  bookTitle,
  bookSubtitle,
  price,
  checkoutHref,
  totalBookPages,
  excerptPages,
  lockedPreviewParagraph1,
  lockedPreviewParagraph2,
}: {
  bookTitle: string;
  bookSubtitle: string;
  price: string;
  checkoutHref: string;
  totalBookPages: number;
  excerptPages: ExcerptPage[];
  lockedPreviewParagraph1: string;
  lockedPreviewParagraph2: string;
}) {
  const [currentPage, setCurrentPage] = useState<number>(6);
  const allPages = [6, 7, 8, 9, 10, 11, 12, 13];
  const isLockedPage = currentPage === 13;
  const activeExcerpt = excerptPages.find((p) => p.page === currentPage);

  return (
    <div className="bg-stone-900 rounded-2xl p-3 sm:p-6 md:p-8 shadow-2xl border border-stone-800">
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-stone-800">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-stone-300 font-bold">
            Extrait Gratuit — Pages 6 à 12
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {allPages.map((p) => {
            const locked = p === 13;
            const active = currentPage === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setCurrentPage(p)}
                className={`px-2.5 py-1.5 rounded text-xs font-mono transition-all shrink-0 flex items-center gap-1 ${
                  active
                    ? "bg-amber-600 text-white font-bold shadow-md shadow-amber-900/50"
                    : locked
                    ? "bg-stone-800 text-amber-400/90 hover:bg-stone-700 border border-amber-500/30"
                    : "bg-stone-800 text-stone-400 hover:bg-stone-700 hover:text-white"
                }`}
              >
                {locked && (
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                )}
                <span>p.{p}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Book Page Paper Sheet */}
      <div className="relative bg-[#FAF7F0] text-stone-900 rounded-xl shadow-inner border border-stone-300 min-h-[420px] sm:min-h-[480px] p-5 sm:p-8 md:p-10 flex flex-col justify-between overflow-hidden">
        <div className="hidden sm:block absolute top-0 bottom-0 left-0 w-5 bg-gradient-to-r from-stone-300/50 to-transparent pointer-events-none" />

        <AnimatePresence mode="wait">
          {!isLockedPage && activeExcerpt ? (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-stone-300/80 pb-3 mb-5 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-stone-500 font-sans">
                  <span className="truncate pr-2">{activeExcerpt.header}</span>
                  <span className="font-mono font-bold text-amber-900 shrink-0">PAGE {activeExcerpt.page}</span>
                </div>

                {activeExcerpt.title && (
                  <div className="text-center mb-5">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-amber-800 font-sans font-bold mb-1">
                      {activeExcerpt.title}
                    </p>
                    {activeExcerpt.subtitle && (
                      <h4 className="text-lg sm:text-2xl font-serif text-stone-900 italic">
                        {activeExcerpt.subtitle}
                      </h4>
                    )}
                  </div>
                )}

                {!activeExcerpt.title && activeExcerpt.subtitle && (
                  <h4 className="text-base sm:text-xl font-serif font-semibold text-stone-900 mb-4 italic">
                    {activeExcerpt.subtitle}
                  </h4>
                )}

                {activeExcerpt.epigraph && (
                  <div className="mb-5 p-3.5 sm:p-4 bg-amber-900/5 border border-amber-800/20 rounded-lg text-center">
                    <p className="font-serif italic text-stone-800 text-xs sm:text-sm leading-relaxed mb-1.5">
                      {activeExcerpt.epigraph.text}
                    </p>
                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-900 font-semibold">
                      — {activeExcerpt.epigraph.ref}
                    </p>
                  </div>
                )}

                <div>{activeExcerpt.content}</div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-300/70 flex items-center justify-between text-xs text-stone-500 font-serif italic">
                <span>Mounir BYAR — {bookSubtitle}</span>
                <span className="font-sans not-italic font-bold text-stone-700">— {activeExcerpt.page} —</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="locked-page-13"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative flex-1 flex flex-col justify-center items-center py-6"
            >
              <div className="w-full select-none pointer-events-none filter blur-[5px] opacity-40 space-y-4 font-serif text-sm sm:text-base leading-relaxed text-stone-800">
                <div className="flex items-center justify-between border-b border-stone-300 pb-3 mb-4 text-xs uppercase tracking-widest text-stone-500">
                  <span>{bookTitle.toUpperCase()}</span>
                  <span>PAGE 13</span>
                </div>
                <p>{lockedPreviewParagraph1}</p>
                <p>{lockedPreviewParagraph2}</p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6 bg-gradient-to-b from-[#FAF7F0]/60 via-[#FAF7F0]/95 to-[#FAF7F0]">
                <div className="max-w-md w-full bg-white border border-amber-200 rounded-2xl p-5 sm:p-7 shadow-2xl text-center space-y-4">
                  <div className="w-11 h-11 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-amber-800 font-bold block">
                      Fin de l&apos;aperçu gratuit (Pages 6 à 12)
                    </span>
                    <h4 className="text-lg sm:text-xl font-serif text-stone-900">
                      La suite du livre est réservée aux lecteurs
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      Débloquez immédiatement l&apos;intégralité de l&apos;ouvrage ({totalBookPages} pages, formats <strong>PDF &amp; ePub</strong>) pour continuer votre lecture dès la page 13.
                    </p>
                  </div>

                  <div className="pt-1">
                    <Button
                      variant="primary"
                      href={checkoutHref}
                      className="w-full justify-center py-3.5 text-xs uppercase tracking-[0.2em] font-bold shadow-lg shadow-amber-900/20"
                    >
                      Débloquer le Livre Complet ({price}) →
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Prev / Next Bar */}
      <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-stone-800">
        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.max(6, prev - 1))}
          disabled={currentPage === 6}
          className="px-3.5 py-2 rounded-lg bg-stone-800 text-stone-200 text-xs font-semibold uppercase tracking-wider hover:bg-stone-700 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1.5"
        >
          <span>←</span>
          <span>Précédente</span>
        </button>

        <span className="text-xs text-stone-400 font-mono">
          {isLockedPage ? "Page 13 (Verrouillée)" : `Page ${currentPage} sur 12`}
        </span>

        <button
          type="button"
          onClick={() => setCurrentPage((prev) => Math.min(13, prev + 1))}
          disabled={currentPage === 13}
          className="px-3.5 py-2 rounded-lg bg-amber-600 text-white text-xs font-semibold uppercase tracking-wider hover:bg-amber-500 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1.5"
        >
          <span>{currentPage === 12 ? "Page 13 (Suite)" : "Suivante"}</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}

/* ============================================================================
   PAGE PRINCIPALE : 07. OUTILS (/livres) — ARCHITECTURE ÉPURÉE PAR ONGLETS
   ============================================================================ */

type PillarId = "livres" | "invocations" | "videos" | "formations";
type BookId = "secrets" | "rahman";

export default function OutilsPage() {
  const [activePillar, setActivePillar] = useState<PillarId>("livres");
  const [activeBook, setActiveBook] = useState<BookId>("secrets");
  const [coverSide, setCoverSide] = useState<"recto" | "verso">("recto");
  const [showReader, setShowReader] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash === "#rahman") {
        setActivePillar("livres");
        setActiveBook("rahman");
      } else if (hash === "#secrets") {
        setActivePillar("livres");
        setActiveBook("secrets");
      } else if (hash === "#pole-invocations") {
        setActivePillar("invocations");
      } else if (hash === "#pole-videos") {
        setActivePillar("videos");
      } else if (hash === "#pole-formations") {
        setActivePillar("formations");
      }
    }
  }, []);

  const handleSelectBook = (book: BookId) => {
    setActiveBook(book);
    setCoverSide("recto");
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] pt-24 sm:pt-32 pb-20 px-4 sm:px-6 overflow-x-hidden w-full max-w-full">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* 1. EN-TÊTE COMPACT + NAVIGATION EN 4 ONGLETS SÉPARÉS */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto space-y-5"
        >
          <SectionHeading
            label="07. Outils & Ressources"
            title="Bibliothèque & Outils Spirituels"
            subtitle="Sélectionnez une rubrique ci-dessous pour explorer nos livres, invocations, capsules vidéo ou formations."
          />

          {/* 4 Onglets strictement séparés (1 seul affiché à la fois) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            {[
              { id: "livres" as PillarId, label: "Livres", sub: "2 Ouvrages", icon: "📚" },
              { id: "invocations" as PillarId, label: "Invocations", sub: "Du'as & Dhikr", icon: "🤲" },
              { id: "videos" as PillarId, label: "Vidéos", sub: "Capsules", icon: "🎬" },
              { id: "formations" as PillarId, label: "Formations", sub: "Programmes", icon: "🎓" },
            ].map((tab) => {
              const isActive = activePillar === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActivePillar(tab.id)}
                  className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    isActive
                      ? "bg-stone-900 text-white border-stone-900 shadow-lg"
                      : "bg-white text-stone-800 border-stone-200/90 hover:border-amber-600/50 hover:bg-stone-50"
                  }`}
                >
                  <span className="text-xl sm:text-2xl shrink-0">{tab.icon}</span>
                  <div className="min-w-0">
                    <p className={`text-xs sm:text-sm font-bold truncate ${isActive ? "text-white" : "text-stone-900"}`}>
                      {tab.label}
                    </p>
                    <p className={`text-[10px] sm:text-[11px] truncate ${isActive ? "text-amber-300" : "text-stone-400"}`}>
                      {tab.sub}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ====================================================================
            ONGLET 1 : LIVRES & OUVRAGES (UN SEUL LIVRE ACTIF À LA FOIS)
            ==================================================================== */}
        {activePillar === "livres" && (
          <motion.div
            key="tab-livres"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Sélecteur des 2 Livres côte à côte (Cartes compactes) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Carte Livre I */}
              <button
                type="button"
                onClick={() => handleSelectBook("secrets")}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-center gap-4 ${
                  activeBook === "secrets"
                    ? "bg-white border-2 border-amber-700 shadow-xl ring-4 ring-amber-700/10"
                    : "bg-white/70 border-stone-200 hover:bg-white hover:border-stone-300 opacity-80 hover:opacity-100"
                }`}
              >
                <img
                  src="/books/secrets-couverture-recto.png"
                  alt="Les Secrets du Retour vers Allah"
                  className="w-16 sm:w-20 h-auto rounded-lg shadow-md border border-stone-200 shrink-0"
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-amber-800">
                      Livre I • Disponible
                    </span>
                    <span className="text-xs font-serif font-bold text-stone-900 bg-amber-100/80 px-2 py-0.5 rounded">
                      5,90 €
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-stone-900 truncate">
                    Les Secrets du Retour vers Allah
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2">
                    Comprendre le repentir, purifier son cœur et retrouver la proximité divine (138 pages).
                  </p>
                </div>
              </button>

              {/* Carte Livre II */}
              <button
                type="button"
                onClick={() => handleSelectBook("rahman")}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all flex items-center gap-4 ${
                  activeBook === "rahman"
                    ? "bg-white border-2 border-amber-700 shadow-xl ring-4 ring-amber-700/10"
                    : "bg-white/70 border-stone-200 hover:bg-white hover:border-stone-300 opacity-80 hover:opacity-100"
                }`}
              >
                <img
                  src="/books/rahman-couverture-recto.png"
                  alt="Ar-Rahman : La Mer sans Rivage"
                  className="w-16 sm:w-20 h-auto rounded-lg shadow-md border border-stone-200 shrink-0"
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-amber-800">
                      Livre II • Nouveau
                    </span>
                    <span className="text-xs font-serif font-bold text-stone-900 bg-amber-100/80 px-2 py-0.5 rounded">
                      12,65 €
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-serif font-bold text-stone-900 truncate">
                    Ar-Rahman : La Mer sans Rivage
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2">
                    Plongée au cœur de la Miséricorde Divine en 12 chapitres, invocations & Dhikr (185 pages).
                  </p>
                </div>
              </button>
            </div>

            {/* FICHE DU LIVRE SÉLECTIONNÉ UNIQUEMENT */}
            <AnimatePresence mode="wait">
              {activeBook === "secrets" ? (
                <motion.div
                  key="book-secrets-detail"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-3xl border border-stone-200/90 shadow-xl p-5 sm:p-8 md:p-10 space-y-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Colonne Gauche : Couverture avec switch Recto / Verso */}
                    <div className="lg:col-span-5 flex flex-col items-center space-y-4">
                      <div className="inline-flex rounded-lg bg-stone-100 p-1 border border-stone-200">
                        <button
                          type="button"
                          onClick={() => setCoverSide("recto")}
                          className={`px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                            coverSide === "recto"
                              ? "bg-stone-900 text-white shadow-sm"
                              : "text-stone-600 hover:text-stone-900"
                          }`}
                        >
                          1re de Couverture
                        </button>
                        <button
                          type="button"
                          onClick={() => setCoverSide("verso")}
                          className={`px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                            coverSide === "verso"
                              ? "bg-stone-900 text-white shadow-sm"
                              : "text-stone-600 hover:text-stone-900"
                          }`}
                        >
                          4e de Couverture (Dos)
                        </button>
                      </div>

                      <div className="w-60 sm:w-72 rounded-xl overflow-hidden shadow-2xl border border-stone-200 bg-stone-950">
                        <img
                          src={
                            coverSide === "recto"
                              ? "/books/secrets-couverture-recto.png"
                              : "/books/secrets-couverture-verso.png"
                          }
                          alt="Les Secrets du Retour vers Allah"
                          className="w-full h-auto object-cover block"
                        />
                      </div>

                      <p className="text-[11px] text-stone-400 italic text-center">
                        Cliquez sur les boutons ci-dessus pour retourner le livre.
                      </p>
                    </div>

                    {/* Colonne Droite : Infos, Résumé & Achat */}
                    <div className="lg:col-span-7 space-y-5">
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-amber-800 font-bold">
                          Ouvrage Spirituel • Mounir BYAR
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
                          Les Secrets du Retour vers Allah
                        </h2>
                        <p className="text-sm sm:text-base font-serif italic text-stone-600">
                          Comprendre le repentir, purifier son cœur et retrouver la proximité divine.
                        </p>
                      </div>

                      <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                        Il arrive un moment où l&apos;âme se fatigue de ses propres éloignements. Ce livre est un compagnon de route en <strong>7 chapitres</strong> pour comprendre la mécanique des voiles intérieurs, briser le cycle des rechutes et transformer ses blessures en tremplin vers la lumière d&apos;Allah.
                      </p>

                      {/* Caractéristiques rapides */}
                      <div className="grid grid-cols-3 gap-3 py-3 border-y border-stone-100 text-center sm:text-left">
                        <div>
                          <p className="text-lg font-serif text-stone-900">138 pages</p>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">7 Chapitres</p>
                        </div>
                        <div>
                          <p className="text-lg font-serif text-stone-900">PDF + ePub</p>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">Accès immédiat</p>
                        </div>
                        <div>
                          <p className="text-xl font-serif font-bold text-amber-800">5,90 €</p>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">Édition Complète</p>
                        </div>
                      </div>

                      {/* Boutons d'action */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                        <Button
                          variant="primary"
                          href="/paiement?offre=livre-secrets"
                          className="py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-bold justify-center shadow-lg shadow-stone-950/15"
                        >
                          Commander le Livre (5,90 €) →
                        </Button>
                        <button
                          type="button"
                          onClick={() => setShowReader((v) => !v)}
                          className="py-3.5 px-5 rounded-xl border border-stone-300 text-stone-800 hover:bg-stone-100 text-xs uppercase tracking-[0.15em] font-bold transition-colors"
                        >
                          {showReader ? "Masquer l'extrait" : "Lire l'extrait (Pages 6 à 12)"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Liseuse d'Extrait (Pages 6 à 12) */}
                  {showReader && (
                    <div className="pt-4 border-t border-stone-100">
                      <BookExcerptReader
                        bookTitle="Les Secrets du Retour vers Allah"
                        bookSubtitle="Les Secrets du Retour vers Allah"
                        price="5,90 €"
                        checkoutHref="/paiement?offre=livre-secrets"
                        totalBookPages={138}
                        excerptPages={secretsExcerptPages}
                        lockedPreviewParagraph1="Lorsque le serviteur prononce cet aveu avec sincérité, le premier voile se déchire. Mais très vite, une question cruciale surgit : pourquoi, malgré notre bonne volonté, retombons-nous parfois dans les mêmes travers ?"
                        lockedPreviewParagraph2="Dans le second chapitre, nous explorerons l'anatomie spirituelle du péché et la manière dont les petites négligences s'accumulent sur le miroir du cœur (Ar-Rân), ainsi que les trois remèdes prophétiques pour purifier durablement son for intérieur..."
                      />
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="book-rahman-detail"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-3xl border border-stone-200/90 shadow-xl p-5 sm:p-8 md:p-10 space-y-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Colonne Gauche : Couverture avec switch Recto / Verso */}
                    <div className="lg:col-span-5 flex flex-col items-center space-y-4">
                      <div className="inline-flex rounded-lg bg-stone-100 p-1 border border-stone-200">
                        <button
                          type="button"
                          onClick={() => setCoverSide("recto")}
                          className={`px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                            coverSide === "recto"
                              ? "bg-stone-900 text-white shadow-sm"
                              : "text-stone-600 hover:text-stone-900"
                          }`}
                        >
                          1re de Couverture
                        </button>
                        <button
                          type="button"
                          onClick={() => setCoverSide("verso")}
                          className={`px-3.5 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                            coverSide === "verso"
                              ? "bg-stone-900 text-white shadow-sm"
                              : "text-stone-600 hover:text-stone-900"
                          }`}
                        >
                          4e de Couverture (Dos)
                        </button>
                      </div>

                      <div className="w-60 sm:w-72 rounded-xl overflow-hidden shadow-2xl border border-stone-200 bg-stone-950">
                        <img
                          src={
                            coverSide === "recto"
                              ? "/books/rahman-couverture-recto.png"
                              : "/books/rahman-couverture-verso.png"
                          }
                          alt="Ar-Rahman : La Mer sans Rivage"
                          className="w-full h-auto object-cover block"
                        />
                      </div>

                      <p className="text-[11px] text-stone-400 italic text-center">
                        Cliquez sur les boutons ci-dessus pour retourner le livre.
                      </p>
                    </div>

                    {/* Colonne Droite : Infos, Résumé & Achat */}
                    <div className="lg:col-span-7 space-y-5">
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-amber-800 font-bold">
                          Deuxième Ouvrage • ISBN 979-8249982454
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 leading-tight">
                          Ar-Rahman : La Mer sans Rivage
                        </h2>
                        <p className="text-sm sm:text-base font-serif italic text-stone-600">
                          Plongée au cœur de la Miséricorde Divine.
                        </p>
                      </div>

                      <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                        À travers <strong>douze chapitres</strong> mêlant rigueur théologique et souffle spirituel, cet ouvrage explore la racine sacrée <em>R-H-M</em>, les cent parties de la Rahma, la symphonie de la Sourate Ar-Rahman, le sens caché des épreuves et un programme complet d&apos;invocations et de Dhikr.
                      </p>

                      {/* Caractéristiques rapides */}
                      <div className="grid grid-cols-3 gap-3 py-3 border-y border-stone-100 text-center sm:text-left">
                        <div>
                          <p className="text-lg font-serif text-stone-900">185 pages</p>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">12 Chapitres</p>
                        </div>
                        <div>
                          <p className="text-lg font-serif text-stone-900">PDF + ePub</p>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">Accès immédiat</p>
                        </div>
                        <div>
                          <p className="text-xl font-serif font-bold text-amber-800">12,65 €</p>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold">Édition Complète</p>
                        </div>
                      </div>

                      {/* Boutons d'action */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                        <Button
                          variant="primary"
                          href="/paiement?offre=livre-rahman"
                          className="py-3.5 px-6 text-xs uppercase tracking-[0.2em] font-bold justify-center shadow-lg shadow-stone-950/15"
                        >
                          Commander le Livre (12,65 €) →
                        </Button>
                        <button
                          type="button"
                          onClick={() => setShowReader((v) => !v)}
                          className="py-3.5 px-5 rounded-xl border border-stone-300 text-stone-800 hover:bg-stone-100 text-xs uppercase tracking-[0.15em] font-bold transition-colors"
                        >
                          {showReader ? "Masquer l'extrait" : "Lire l'extrait (Pages 6 à 12)"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Liseuse d'Extrait (Pages 6 à 12) */}
                  {showReader && (
                    <div className="pt-4 border-t border-stone-100">
                      <BookExcerptReader
                        bookTitle="Ar-Rahman : La Mer sans Rivage"
                        bookSubtitle="Ar-Rahman : La Mer sans Rivage"
                        price="12,65 €"
                        checkoutHref="/paiement?offre=livre-rahman"
                        totalBookPages={185}
                        excerptPages={rahmanExcerptPages}
                        lockedPreviewParagraph1="Lorsque le Prophète ﷺ révéla le hadith qudsî où Allah déclare : « Je suis Ar-Rahman, J'ai créé la matrice (Ar-Rahim) et Je lui ai donné un nom dérivé du Mien », il dévoila le lien intime qui unit chaque être vivant à la source de sa création."
                        lockedPreviewParagraph2="Dans la suite de ce chapitre et tout au long des dix portes suivantes, nous découvrirons comment les cent parties de la Miséricorde opèrent dans nos épreuves, dans nos chutes et jusqu'au Jour Dernier..."
                      />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ====================================================================
            ONGLET 2 : INVOCATIONS PROPHÉTIQUES & DHIKR
            ==================================================================== */}
        {activePillar === "invocations" && (
          <motion.div
            key="tab-invocations"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {invocationsList.map((inv) => (
                <div
                  key={inv.id}
                  className="bg-white rounded-2xl border border-stone-200/90 p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded">
                        {inv.category}
                      </span>
                      <span className="text-[11px] font-mono text-stone-400">{inv.source}</span>
                    </div>

                    <h4 className="text-base sm:text-lg font-serif font-bold text-stone-900">
                      {inv.title}
                    </h4>

                    <div className="p-4 rounded-xl bg-[#FAF7F0] border border-amber-900/15 text-right">
                      <p dir="rtl" className="text-lg sm:text-xl leading-loose font-serif text-stone-900">
                        {inv.arabic}
                      </p>
                    </div>

                    <p className="text-xs text-amber-950/80 italic leading-relaxed">
                      <strong>Phonétique :</strong> {inv.phonetic}
                    </p>

                    <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed">
                      {inv.translation}
                    </p>
                  </div>

                  <p className="pt-3 border-t border-stone-100 text-xs text-stone-500 leading-relaxed">
                    <strong className="text-amber-800 uppercase tracking-wider text-[10px]">Bienfait : </strong>
                    {inv.secret}
                  </p>
                </div>
              ))}
            </div>

            {/* Programme de Dhikr compact */}
            <div className="bg-stone-900 text-white rounded-2xl p-5 sm:p-8 border border-stone-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-bold">
                    Semaine Type • Extrait du Livre II
                  </span>
                  <h4 className="text-lg sm:text-xl font-serif text-white">
                    Programme de Dhikr Quotidien (Lundi à Dimanche)
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {weeklyDhikr.map((item) => (
                  <div
                    key={item.day}
                    className="p-4 rounded-xl bg-stone-800/80 border border-stone-700/70 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        {item.day}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400">{item.count}</span>
                    </div>
                    <p className="text-sm font-serif font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-stone-300 leading-relaxed">{item.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ====================================================================
            ONGLET 3 : VIDÉOS & CAPSULES
            ==================================================================== */}
        {activePillar === "videos" && (
          <motion.div
            key="tab-videos"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {videoCapsules.map((vid) => (
              <div
                key={vid.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-video bg-stone-900 flex items-center justify-center p-5">
                    <div className="w-12 h-12 rounded-full bg-amber-600/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
                      <svg className="w-5 h-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-stone-950/80 text-[10px] uppercase tracking-wider text-amber-300 font-bold">
                      {vid.theme}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-amber-500/20 text-[10px] uppercase tracking-widest text-amber-200 font-semibold">
                      {vid.status}
                    </span>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                      {vid.tag}
                    </p>
                    <h4 className="text-base font-serif font-bold text-stone-900 leading-snug">
                      {vid.title}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{vid.summary}</p>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <Button
                    variant="ghost"
                    href="/contact"
                    className="w-full justify-center py-2.5 text-[11px] uppercase tracking-widest font-bold"
                  >
                    Être prévenu de la sortie →
                  </Button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ====================================================================
            ONGLET 4 : FORMATIONS & PROGRAMMES DIGITAUX
            ==================================================================== */}
        {activePillar === "formations" && (
          <motion.div
            key="tab-formations"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-5"
          >
            {formationsList.map((form) => (
              <div
                key={form.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-800">
                      {form.code}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 text-[10px] font-bold uppercase tracking-wider border border-amber-200">
                      {form.badge}
                    </span>
                  </div>

                  <h4 className="text-lg font-serif font-bold text-stone-900 leading-snug">
                    {form.title}
                  </h4>

                  <p className="text-xs text-stone-500 italic font-serif leading-relaxed">
                    {form.subtitle}
                  </p>

                  <p className="text-xs font-bold text-stone-800 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60">
                    📦 {form.modules}
                  </p>

                  <ul className="space-y-2 pt-1">
                    {form.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-stone-600 leading-relaxed">
                        <span className="text-amber-700 font-bold mt-0.5">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="primary"
                  href="/contact"
                  className="w-full justify-center py-3 text-xs uppercase tracking-[0.15em] font-bold"
                >
                  Rejoindre la Liste d&apos;Attente →
                </Button>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
