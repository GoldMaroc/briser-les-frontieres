"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { Turnstile } from "@marsidev/react-turnstile";

interface FormData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  fatigueDecisionnelle: string;
  chargeAllostatique: string;
  salatImpact: string;
  interpositionAccord: boolean;
  motivation: string;
}

const initialData: FormData = {
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  adresse: "",
  codePostal: "",
  ville: "",
  fatigueDecisionnelle: "moderee",
  chargeAllostatique: "moyenne",
  salatImpact: "parfois",
  interpositionAccord: false,
  motivation: ""
};

export default function CandidatureForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const isTurnstileConfigured = Boolean(
    turnstileSiteKey &&
    turnstileSiteKey !== "1x00000000000000000000AA" &&
    !turnstileSiteKey.startsWith("1x000000")
  );

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      nextStep();
      return;
    }

    if (isTurnstileConfigured && !turnstileToken) {
      setError("Veuillez patienter pendant la validation anti-spam ou rafraîchir la page.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/candidature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const resData = await response.json();
        setError(resData.message || "Une erreur est survenue lors de l'enregistrement de votre candidature.");
      }
    } catch (err) {
      setError("Impossible de joindre le serveur d'ingénierie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto border border-emerald/20 bg-surface/20 backdrop-blur-md p-8 md:p-12 rounded-sm relative">
      
      {/* Lignes structurelles dorées */}
      <div className="absolute top-0 left-8 w-16 h-px bg-gold/50" />
      <div className="absolute bottom-0 right-8 w-16 h-px bg-gold/50" />

      {/* Barre de progression des étapes */}
      <div className="flex justify-between items-center mb-10">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center flex-1 last:flex-none">
            <div
              className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs transition-all duration-300 font-heading ${
                step >= s
                  ? "border-gold bg-gold text-midnight"
                  : "border-border text-cream-muted"
              }`}
            >
              {s}
            </div>
            {s < 4 && (
              <div
                className={`h-px flex-1 mx-4 transition-all duration-300 ${
                  step > s ? "bg-gold" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12 font-body"
        >
          <span className="text-3xl text-gold font-heading mb-4 block">Candidature Enregistrée</span>
          <p className="text-sm text-cream-muted leading-relaxed max-w-md mx-auto mb-8">
            Votre dossier de qualification est désormais en cours d&apos;analyse. L&apos;Ingénieur Mounir BYAR examinera vos réponses sous 48 heures. Si votre profil présente les prérequis d&apos;interposition comportementale, vous recevrez une invitation de planification stratégique.
          </p>
          <div className="p-4 border border-emerald/20 bg-emerald-muted/10 text-emerald text-xs tracking-wider uppercase inline-block rounded-sm">
            Numéro d&apos;audit généré avec succès.
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            
            {/* Étape 1 : Coordonnées Complètes & Profil */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="border-b border-border pb-4 mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-emerald font-semibold">Étape 1 sur 4</span>
                  <h3 className="font-heading text-2xl font-light text-cream mt-1">Coordonnées de Souveraineté</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="prenom" className="text-xs uppercase tracking-wider text-cream-muted">Votre Prénom</label>
                    <input
                      required
                      type="text"
                      id="prenom"
                      name="prenom"
                      value={data.prenom}
                      onChange={handleChange}
                      placeholder="Ex: Sliman"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs tracking-wider uppercase transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="nom" className="text-xs uppercase tracking-wider text-cream-muted">Votre Nom</label>
                    <input
                      required
                      type="text"
                      id="nom"
                      name="nom"
                      value={data.nom}
                      onChange={handleChange}
                      placeholder="Ex: Amrani"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs tracking-wider uppercase transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-wider text-cream-muted">Email de Contact</label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      placeholder="Ex: contact@amrani-clinique.fr"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs tracking-wider transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="telephone" className="text-xs uppercase tracking-wider text-cream-muted">Numéro de Téléphone</label>
                    <input
                      required
                      type="tel"
                      id="telephone"
                      name="telephone"
                      value={data.telephone}
                      onChange={handleChange}
                      placeholder="Ex: 06 12 34 56 78"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs tracking-wider transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="adresse" className="text-xs uppercase tracking-wider text-cream-muted">Adresse physique</label>
                  <input
                    required
                    type="text"
                    id="adresse"
                    name="adresse"
                    value={data.adresse}
                    onChange={handleChange}
                    placeholder="Ex: 14 Avenue de la Grande République, Bâtiment B"
                    className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs tracking-wider transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="codePostal" className="text-xs uppercase tracking-wider text-cream-muted">Code Postal</label>
                    <input
                      required
                      type="text"
                      id="codePostal"
                      name="codePostal"
                      value={data.codePostal}
                      onChange={handleChange}
                      placeholder="Ex: 51100"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs tracking-wider transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="ville" className="text-xs uppercase tracking-wider text-cream-muted">Ville de Résidence</label>
                    <input
                      required
                      type="text"
                      id="ville"
                      name="ville"
                      value={data.ville}
                      onChange={handleChange}
                      placeholder="Ex: Reims"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs tracking-wider transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Étape 2 : Diagnostic de Souveraineté Cognitive */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="border-b border-border pb-4 mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-emerald font-semibold">Étape 2 sur 4</span>
                  <h3 className="font-heading text-2xl font-light text-cream mt-1">Diagnostic Cognitif & Entropie</h3>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="fatigueDecisionnelle" className="text-xs uppercase tracking-wider text-cream-muted">Niveau de Fatigue Décisionnelle</label>
                  <select
                    id="fatigueDecisionnelle"
                    name="fatigueDecisionnelle"
                    value={data.fatigueDecisionnelle}
                    onChange={handleChange}
                    className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs tracking-wider transition-colors"
                  >
                    <option value="faible">Faible (Clarté préservée)</option>
                    <option value="moderee">Modérée (Hésitations en fin de journée)</option>
                    <option value="haute">Haute (Difficultés systématiques de choix)</option>
                    <option value="extreme">Extrême (Procrastination critique, épuisement)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="chargeAllostatique" className="text-xs uppercase tracking-wider text-cream-muted">Charge allostatique estimée (Stress & Entropie physique)</label>
                  <select
                    id="chargeAllostatique"
                    name="chargeAllostatique"
                    value={data.chargeAllostatique}
                    onChange={handleChange}
                    className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs tracking-wider transition-colors"
                  >
                    <option value="basse">Basse (Environnement structuré)</option>
                    <option value="moyenne">Moyenne (Désorganisation modérée)</option>
                    <option value="haute">Haute (Environnement et sommeil dégradés)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="salatImpact" className="text-xs uppercase tracking-wider text-cream-muted">L&apos;entropie quotidienne affecte-t-elle votre présence dans la Salat ?</label>
                  <select
                    id="salatImpact"
                    name="salatImpact"
                    value={data.salatImpact}
                    onChange={handleChange}
                    className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs tracking-wider transition-colors"
                  >
                    <option value="rarement">Rarement (Khuchu&apos; maintenu)</option>
                    <option value="parfois">Parfois (Pensées parasites fréquentes)</option>
                    <option value="systematiquement">Systématiquement (Perte de concentration totale)</option>
                  </select>
                </div>
              </motion.div>
            )}

            {/* Étape 3 : Accord & Motivation */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="border-b border-border pb-4 mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-emerald font-semibold">Étape 3 sur 4</span>
                  <h3 className="font-heading text-2xl font-light text-cream mt-1">Interposition & Motivation</h3>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="motivation" className="text-xs uppercase tracking-wider text-cream-muted">Pourquoi souhaitez-vous engager ce protocole comportemental ?</label>
                  <textarea
                    required
                    id="motivation"
                    name="motivation"
                    rows={4}
                    value={data.motivation}
                    onChange={handleChange}
                    placeholder="Décrivez vos attentes vis-à-vis de l'Ingénierie de la Souveraineté..."
                    className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs tracking-wider transition-colors font-body"
                  />
                </div>

                <div className="flex items-start gap-3 p-4 border border-gold/20 bg-gold-muted/5 rounded-sm">
                  <input
                    required
                    type="checkbox"
                    id="interpositionAccord"
                    name="interpositionAccord"
                    checked={data.interpositionAccord}
                    onChange={handleChange}
                    className="mt-1 accent-gold"
                  />
                  <label htmlFor="interpositionAccord" className="text-xs text-cream-muted leading-relaxed font-body">
                    J&apos;accepte le principe d&apos;une interposition stratégique in situ (audit matériel de mon espace de travail/foyer) par l&apos;Ingénieur Mounir BYAR afin de structurer mon environnement.
                  </label>
                </div>
              </motion.div>
            )}

            {/* Étape 4 : Validation finale */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="border-b border-border pb-4 mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-emerald font-semibold">Étape 4 sur 4</span>
                  <h3 className="font-heading text-2xl font-light text-cream mt-1">Validation des Engagements</h3>
                </div>

                <div className="bg-surface/10 border border-border p-6 rounded-sm space-y-4">
                  <h4 className="font-heading text-lg text-gold font-light">Récapitulatif de Qualification</h4>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs font-body">
                    <div className="col-span-2">
                      <span className="text-cream-muted block">Candidat :</span>
                      <span className="text-cream font-medium uppercase">{data.prenom} {data.nom}</span>
                    </div>
                    <div>
                      <span className="text-cream-muted block">Téléphone :</span>
                      <span className="text-cream font-medium">{data.telephone}</span>
                    </div>
                    <div>
                      <span className="text-cream-muted block">Code Postal :</span>
                      <span className="text-cream font-medium uppercase">{data.codePostal}</span>
                    </div>
                    <div>
                      <span className="text-cream-muted block">Ville :</span>
                      <span className="text-cream font-medium uppercase">{data.ville}</span>
                    </div>
                    <div>
                      <span className="text-cream-muted block">Interposition spatiale :</span>
                      <span className="text-cream font-medium uppercase">
                        {data.interpositionAccord ? "Acceptée" : "Refusée"}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-cream-muted leading-relaxed font-body">
                  En soumettant ce formulaire, vous attestez de l&apos;exactitude des données et de votre volonté sincère de vous engager dans un audit de souveraineté cognitive. Zéro engagement financier n&apos;est requis à cette étape.
                </p>

                {isTurnstileConfigured && (
                  <div className="flex justify-center mt-6">
                    <Turnstile
                      siteKey={turnstileSiteKey!}
                      onSuccess={(token) => setTurnstileToken(token)}
                      options={{ theme: "dark" }}
                    />
                  </div>
                )}
              </motion.div>
            )}

          </AnimatePresence>

          {error && (
            <p className="text-xs text-red-400 font-body uppercase tracking-wider">{error}</p>
          )}

          {/* Boutons de navigation du formulaire */}
          <div className="flex justify-between items-center pt-6 border-t border-border mt-8">
            {step > 1 ? (
              <Button type="button" variant="ghost" onClick={prevStep} disabled={loading}>
                Précédent
              </Button>
            ) : (
              <div />
            )}

            <Button type="submit" disabled={loading || (step === 4 && isTurnstileConfigured && !turnstileToken)} className="shadow-lg shadow-emerald/5">
              {step === 4 ? (loading ? "Traitement..." : "Soumettre la candidature") : "Continuer"}
            </Button>
          </div>

        </form>
      )}

    </div>
  );
}
