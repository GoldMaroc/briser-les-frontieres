"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

interface Question {
  id: number;
  category: string;
  title: string;
  choices: Array<{ text: string; points: number }>;
}

const questions: Question[] = [
  {
    id: 1,
    category: "Dispersion Numérique",
    title: "Quel temps accordez-vous quotidiennement aux flux numériques récréatifs (réseaux sociaux, vidéos, actualités) ?",
    choices: [
      { text: "Plus de 4 heures. Totalement dépendant des flux algorithmiques et des notifications.", points: 0 },
      { text: "Entre 2 et 4 heures. Conscient de ma perte de temps mais incapable de couper durablement.", points: 3.5 },
      { text: "Entre 1 et 2 heures. J'essaie de me restreindre, avec des rechutes fréquentes.", points: 7.5 },
      { text: "Moins d'une heure. Mes applications sont verrouillées par des barrières environnementales strictes.", points: 12.5 }
    ]
  },
  {
    id: 2,
    category: "Fatigue Décisionnelle",
    title: "Ressentez-vous une baisse drastique de concentration ou un brouillard mental l'après-midi ?",
    choices: [
      { text: "Systématique. Après 14h, mon esprit sature, je procrastine et subis ma fin de journée.", points: 0 },
      { text: "Fréquente. Je dois lutter par la volonté pure ou compenser avec des stimulants (caféine, sucre).", points: 3.5 },
      { text: "Modérée. J'observe des baisses d'énergie mais je parviens à me recadrer en changeant d'activité.", points: 7.5 },
      { text: "Inexistante. Mes blocs de travail profond sont sanctuarisés et mon niveau d'énergie est stable.", points: 12.5 }
    ]
  },
  {
    id: 3,
    category: "Constance de la Prière",
    title: "Comment gérez-vous l'organisation de vos 5 prières quotidiennes (Salat) face à vos impératifs ?",
    choices: [
      { text: "Retards systématiques. Je regroupe régulièrement mes prières en fin de journée par manque d'organisation.", points: 0 },
      { text: "Instable. Je prie à l'heure uniquement lorsque mon agenda professionnel ou familial me le permet facilement.", points: 3.5 },
      { text: "Régulière. La plupart de mes prières sont faites dans leur intervalle, parfois avec de légères frictions.", points: 7.5 },
      { text: "Pivot central absolu. Mon emploi du temps s'articule entièrement autour des 5 rendez-vous divins.", points: 12.5 }
    ]
  },
  {
    id: 4,
    category: "Discipline du Nafs",
    title: "Quelle est votre capacité à résister aux micro-impulsions de distraction immédiate au travail ?",
    choices: [
      { text: "Nulle. Dès qu'un stimulus (bruit, notification, doute) survient, j'abandonne instantanément mon effort.", points: 0 },
      { text: "Faible. Je parviens à lutter quelques minutes, puis je cède sous prétexte de faire une 'courte pause'.", points: 3.5 },
      { text: "Moyenne. J'arrive à bloquer les impulsions uniquement lors des périodes de rush à forte contrainte.", points: 7.5 },
      { text: "Totale. Mon espace de travail physique et logique est configuré de façon à rendre la distraction impossible.", points: 12.5 }
    ]
  },
  {
    id: 5,
    category: "Environnement Spatial",
    title: "Quel est l'état d'ordre et de pureté sémantique de votre foyer et de votre bureau ?",
    choices: [
      { text: "Désordre fréquent. Mes espaces sont encombrés d'objets inutiles, de câbles et de distractions.", points: 0 },
      { text: "Variable. Je range uniquement lorsque le chaos visuel devient trop insupportable pour travailler.", points: 3.5 },
      { text: "Correct mais saturé. C'est propre, mais rempli d'éléments visuels et d'ancrages de divertissement.", points: 7.5 },
      { text: "Minimalisme et pureté. Zéro stimuli parasite. Chaque élément a sa fonction pour préserver la clarté.", points: 12.5 }
    ]
  },
  {
    id: 6,
    category: "Muhasaba (Introspection)",
    title: "Dressez-vous un bilan régulier et écrit de vos décisions, de votre temps et de vos failles ?",
    choices: [
      { text: "Jamais. Je subis mes journées de manière réactive, sans audit ni rétrospection comptable.", points: 0 },
      { text: "Rarement. Uniquement en fin d'année ou lors de crises personnelles majeures.", points: 3.5 },
      { text: "Périodiquement. Je prends parfois du recul (mensuellement) pour faire le point sur mes objectifs.", points: 7.5 },
      { text: "Quotidiennement. J'audite mes engagements ouverts et ma journée chaque soir avant de dormir.", points: 12.5 }
    ]
  },
  {
    id: 7,
    category: "Le Mandat de Khalifa",
    title: "À quel point votre activité professionnelle ou entrepreneuriale est-elle alignée sur votre mission terrestre ?",
    choices: [
      { text: "Aucun alignement. Mon activité me fatigue et sert uniquement à payer mes factures matérielles.", points: 0 },
      { text: "Alignement partiel. J'y pense parfois, mais mon exécution quotidienne manque d'intention noble claire.", points: 3.5 },
      { text: "En recherche. J'essaie d'apporter de la valeur éthique, mais je manque de structure pour aller plus loin.", points: 7.5 },
      { text: "Mandat total. Chaque heure travaillée est vécue comme un acte d'excellence et une adoration structurée.", points: 12.5 }
    ]
  },
  {
    id: 8,
    category: "Clarté Cognitive",
    title: "Quelle est la qualité de votre présence d'esprit (Khuchu') dans vos prières et vos tâches clés ?",
    choices: [
      { text: "Absente. Mon esprit divague en permanence, je suis assailli par les threads mentaux ouverts.", points: 0 },
      { text: "Faible. J'ai de rares moments de présence, vite submergés par le flux de mes pensées parasites.", points: 3.5 },
      { text: "Moyenne. Je parviens à me concentrer si la contrainte extérieure ou l'intérêt intellectuel est fort.", points: 7.5 },
      { text: "Profonde. Je maîtrise les protocoles d'entrée en état de flow et de recueillement spirituel stable.", points: 12.5 }
    ]
  }
];

export default function AuditClient() {
  const [currentStep, setCurrentStep] = useState(0); // 0 to 7 = questions, 8 = form, 9 = score
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [finalScore, setFinalScore] = useState(0);

  const progress = ((currentStep) / questions.length) * 100;

  const handleSelectChoice = (points: number) => {
    setAnswers({ ...answers, [currentStep]: points });
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(questions.length); // Go to form
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom.trim() || !email.trim()) {
      setErrorMsg("Veuillez renseigner votre nom et votre adresse e-mail.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: nom.trim(),
          email: email.trim().toLowerCase(),
          responses: answers
        })
      });

      const data = await response.json();

      if (response.ok) {
        setFinalScore(data.score);
        setCurrentStep(questions.length + 1); // Go to results
      } else {
        setErrorMsg(data.message || "Une erreur est survenue lors de l'enregistrement.");
      }
    } catch (err) {
      setErrorMsg("Échec de la connexion avec le serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getScoreAssessment = (score: number) => {
    if (score < 30) {
      return {
        title: "Entropie Cognitive Sévère",
        color: "text-red-400 border-red-500/20 bg-red-500/5",
        desc: "Votre Nafs et les stimulations numériques extérieures dictent entièrement votre emploi du temps. La fatigue décisionnelle sature votre cortex préfrontal, rendant la Salat constante et le mandat de Khalifa extrêmement difficiles à honorer. Une restructuration radicale in situ est urgente."
      };
    } else if (score < 60) {
      return {
        title: "Instabilité Comportementale",
        color: "text-amber-400 border-amber-500/20 bg-amber-500/5",
        desc: "Vous possédez la foi et l'intention sincère de bien faire, mais vous manquez cruellement d'architecture et de systèmes d'engagement. Vous fonctionnez à la motivation éphémère. Dès que la fatigue s'installe, vos bonnes résolutions s'effondrent. Le protocole C.O.M.E.S. stabilisera cette trajectoire."
      };
    } else if (score < 85) {
      return {
        title: "Rectitude en Construction",
        color: "text-emerald border-emerald/20 bg-emerald/5",
        desc: "Vous avez mis en place de solides défenses comportementales. Vos intentions sont canalisées et vos Salat sont prioritaires. Cependant, des boucles de dispersion actives saturent encore occasionnellement votre mémoire de travail. Un compagnonnage (Suhba) permettra de régler ces derniers détails pour atteindre l'excellence durable."
      };
    } else {
      return {
        title: "Souveraineté Cognitive Alignée",
        color: "text-gold border-gold/20 bg-gold/5",
        desc: "Félicitations. Vous avez dompté l'entropie de votre environnement. Votre espace physique et logique est au service direct de votre âme et de votre mandat. Vous opérez dans un état de Khuchu' et de clarté intellectuelle remarquable. Maintenez ce degré élevé de Muhasaba quotidien pour préserver ce don de droiture."
      };
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-midnight-light border border-gold/20 p-8 md:p-12 rounded-sm shadow-2xl relative font-body overflow-hidden">
      {/* Ligne dorée supérieure */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* Barre de Progression Céleste (uniquement durant le quiz) */}
      {currentStep <= questions.length && (
        <div className="w-full h-1 bg-midnight mb-10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gold shadow-[0_0_8px_rgba(212,168,83,0.5)]"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {currentStep < questions.length ? (
          /* SECTION QUESTIONNAIRE */
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="space-y-8"
          >
            {/* Header Question */}
            <div className="space-y-1">
              <span className="text-[10px] tracking-[0.3em] uppercase text-emerald font-bold">
                Pilier {currentStep + 1} / {questions.length} — {questions[currentStep].category}
              </span>
              <h2 className="font-heading text-2xl md:text-3xl text-cream font-light leading-snug">
                {questions[currentStep].title}
              </h2>
            </div>

            {/* Liste des choix */}
            <div className="space-y-3.5 pt-2">
              {questions[currentStep].choices.map((choice, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectChoice(choice.points)}
                  className="w-full text-left p-5 border border-border bg-surface/50 rounded-sm hover:border-gold hover:bg-gold-muted/5 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex gap-4 items-center">
                    <span className="w-6 h-6 rounded-full border border-border/40 flex items-center justify-center text-[10px] text-cream-muted font-bold group-hover:border-gold group-hover:text-gold transition-colors">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm text-cream-muted group-hover:text-cream transition-colors leading-relaxed">
                      {choice.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Bouton de retour discret */}
            {currentStep > 0 && (
              <button
                onClick={handlePrevStep}
                className="text-[10px] tracking-widest uppercase text-cream-muted hover:text-cream cursor-pointer transition-colors duration-300"
              >
                ← Question Précédente
              </button>
            )}
          </motion.div>
        ) : currentStep === questions.length ? (
          /* SECTION FORMULAIRE */
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <span className="text-[10px] tracking-[0.35em] uppercase text-emerald font-bold block">
                Qualification Initiale
              </span>
              <h2 className="font-heading text-3xl font-light text-cream leading-tight">
                Révéler Votre Niveau de Souveraineté
              </h2>
              <p className="text-xs text-cream-muted max-w-md mx-auto leading-relaxed">
                Entrez votre identité pour générer votre indice de souveraineté cognitive et débloquer instantanément le téléchargement complet du livre de prestige.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-[0.2em] text-cream-muted font-semibold block">Votre Nom Prénom</label>
                <input
                  type="text"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="w-full bg-midnight border border-border focus:border-gold p-3.5 text-sm text-cream outline-none rounded-sm transition-colors"
                  placeholder="Ex : Mounir Byar"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-[0.2em] text-cream-muted font-semibold block">Votre Adresse E-mail</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-midnight border border-border focus:border-gold p-3.5 text-sm text-cream outline-none rounded-sm transition-colors"
                  placeholder="Ex : contact@briserlesfrontieres.fr"
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-red-400 border border-red-500/20 bg-red-500/5 p-3 text-center rounded-sm font-semibold">
                  ⚠️ {errorMsg}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                className="w-full py-4 text-center justify-center flex font-bold tracking-[0.2em]"
              >
                {isSubmitting ? "Calcul et Enregistrement..." : "Calculer Mon Indice →"}
              </Button>
            </form>
          </motion.div>
        ) : (
          /* SECTION RÉSULTAT */
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10 text-center relative py-6"
          >
            {/* Score principal circulaire */}
            <div className="space-y-3 relative z-10">
              <span className="text-[10px] tracking-[0.4em] uppercase text-cream-muted font-semibold block">
                Votre Indice Global
              </span>
              <div className="relative w-44 h-44 mx-auto flex items-center justify-center border-2 border-gold/20 rounded-full shadow-[0_0_30px_rgba(212,168,83,0.08)] bg-midnight/40">
                {/* Lueur or */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,168,83,0.1)_0%,rgba(0,0,0,0)_70%)] animate-pulse" />
                <div className="text-center z-10">
                  <span className="font-heading text-6xl font-light text-gold leading-none tracking-widest">{finalScore}</span>
                  <span className="text-xs text-cream-muted block font-semibold mt-1">% SOUVERAIN</span>
                </div>
              </div>
            </div>

            {/* Diagnostic */}
            <div className={`border p-6 rounded-sm text-left max-w-xl mx-auto space-y-3 ${getScoreAssessment(finalScore).color}`}>
              <h3 className="font-heading text-xl font-light">
                Statut : {getScoreAssessment(finalScore).title}
              </h3>
              <p className="text-xs leading-relaxed text-cream-muted font-body">
                {getScoreAssessment(finalScore).desc}
              </p>
            </div>

            {/* Call to Action Livre & Suhba */}
            <div className="space-y-6 pt-4 max-w-md mx-auto">
              <div className="bg-midnight/20 border border-border p-5 rounded-sm space-y-3">
                <span className="text-[9px] uppercase tracking-[0.2em] text-emerald font-bold block">Accès Immédiat Débloqué</span>
                <h4 className="font-heading text-lg text-cream font-light">Extrait Offert : Les Secrets du Retour vers Allah</h4>
                <p className="text-[11px] text-cream-muted leading-relaxed max-w-xs mx-auto">
                  Votre bilan est validé. Téléchargez gratuitement les <strong>deux premiers chapitres</strong> de sensibilisation pour entamer immédiatement votre réflexion.
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href="/Les-Secrets-du-Retour-vers-Allah-EXTRAIT-OFFERT.pdf"
                    download="Les-Secrets-du-Retour-vers-Allah-Extrait.pdf"
                    className="inline-flex items-center justify-center px-6 py-3 border border-emerald text-emerald hover:bg-emerald hover:text-midnight text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 w-full rounded-sm"
                  >
                    Télécharger l&apos;Extrait (PDF Gratuit) 📥
                  </a>
                  <a
                    href="/livres#secrets"
                    className="inline-flex items-center justify-center px-6 py-3 border border-gold text-gold hover:bg-gold hover:text-stone-950 text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 w-full rounded-sm"
                  >
                    Acquérir l&apos;eBook Complet (5,90 €) ➔
                  </a>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-cream-muted">
                  Besoin d&apos;une interposition structurée in situ pour corriger cette entropie ?
                </p>
                <Button variant="primary" href="/contact" className="w-full">
                  Solliciter un Bilan Personnel avec l&apos;Ingénieur
                </Button>
              </div>

              <div className="space-y-3 border-t border-border/40 pt-6">
                <p className="text-[10px] uppercase tracking-wider text-cream-muted font-semibold">➔ Étape Suivante</p>
                <Button variant="primary" href="/fondements" className="w-full shadow-lg shadow-gold/5 font-bold tracking-widest py-3 text-xs">
                  Étape 03 : Découvrir les Fondements →
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
