"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

interface GiftFormData {
  offrantNom: string;
  offrantPrenom: string;
  offrantEmail: string;
  offrantTelephone: string;
  offrantAdresse: string;
  offrantCodePostal: string;
  offrantVille: string;
  
  beneficiaireNom: string;
  beneficiairePrenom: string;
  beneficiaireEmail: string;
  beneficiaireTelephone: string;
  beneficiaireAdresse: string;
  beneficiaireCodePostal: string;
  beneficiaireVille: string;
  beneficiaireRelation: string;
  
  prestation: string;
  message: string;
}

const initialGiftData: GiftFormData = {
  offrantNom: "",
  offrantPrenom: "",
  offrantEmail: "",
  offrantTelephone: "",
  offrantAdresse: "",
  offrantCodePostal: "",
  offrantVille: "",
  
  beneficiaireNom: "",
  beneficiairePrenom: "",
  beneficiaireEmail: "",
  beneficiaireTelephone: "",
  beneficiaireAdresse: "",
  beneficiaireCodePostal: "",
  beneficiaireVille: "",
  beneficiaireRelation: "conjoint",
  
  prestation: "pack_ouvrages",
  message: ""
};

export default function Offrir() {
  const [data, setData] = useState<GiftFormData>(initialGiftData);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !data.offrantNom || !data.offrantPrenom || !data.offrantEmail || !data.offrantTelephone || !data.offrantAdresse || !data.offrantCodePostal || !data.offrantVille ||
      !data.beneficiaireNom || !data.beneficiairePrenom || !data.beneficiaireEmail || !data.beneficiaireTelephone || !data.beneficiaireAdresse || !data.beneficiaireCodePostal || !data.beneficiaireVille ||
      !data.message
    ) {
      setError("Veuillez renseigner l'ensemble des coordonnées obligatoires des deux parties.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/offrir", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offrant: {
            nom: data.offrantNom,
            prenom: data.offrantPrenom,
            email: data.offrantEmail,
            telephone: data.offrantTelephone,
            adresse: data.offrantAdresse,
            codePostal: data.offrantCodePostal,
            ville: data.offrantVille
          },
          beneficiaire: {
            nom: data.beneficiaireNom,
            prenom: data.beneficiairePrenom,
            email: data.beneficiaireEmail,
            telephone: data.beneficiaireTelephone,
            adresse: data.beneficiaireAdresse,
            codePostal: data.beneficiaireCodePostal,
            ville: data.beneficiaireVille,
            relation: data.beneficiaireRelation
          },
          prestation: data.prestation,
          message: data.message
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setData(initialGiftData);
      } else {
        const resData = await response.json();
        setError(resData.message || "Une erreur est survenue lors de la validation du cadeau.");
      }
    } catch (err) {
      setError("Impossible de se connecter au protocole d'ingénierie cadeau.");
    } finally {
      setLoading(false);
    }
  };

  const getPrestationTitle = (val: string) => {
    switch(val) {
      case "pack_ouvrages": return "Le Pack Ouvrages complets (ePub + PDF) — 18,55 €";
      case "diagnostic_souverainete": return "Bilan Complet & Diagnostic de Souveraineté — 49,00 €";
      case "mentorat_9_mois": return "Accompagnement Mentorat Privé 9 Mois (Parrainage)";
      default: return val;
    }
  };

  return (
    <div className="relative pt-40 pb-32 bg-midnight min-h-screen">
      <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(27,40,56,0.35)_0%,rgba(10,17,40,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <SectionHeading
          label="Offrir la Souveraineté"
          title="Un Cadeau d&apos;Élévation Spirituelle"
          subtitle="Permettez à un membre de votre entourage (conjoint, enfant, ami, collaborateur) de briser ses propres frontières cognitives en lui offrant nos outils de prestige."
        />

        <div className="max-w-4xl mx-auto mt-12 bg-surface/10 border border-gold/20 p-8 md:p-12 rounded-sm backdrop-blur-md relative">
          {/* Lignes dorées */}
          <div className="absolute top-0 left-12 w-20 h-px bg-gold" />
          <div className="absolute bottom-0 right-12 w-20 h-px bg-gold" />

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 font-body space-y-6"
            >
              <div className="w-16 h-16 bg-gold/10 border border-gold/20 text-gold rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h3 className="font-heading text-3xl font-light text-gold">
                Prestation Cadeau Enregistrée
              </h3>
              <p className="text-sm text-cream-muted leading-relaxed max-w-lg mx-auto">
                Votre demande de parrainage/cadeau a été transmise avec succès au Cabinet d&apos;Ingénierie. Un e-mail récapitulatif a été transmis à Mounir BYAR. Nous prendrons contact avec vous et le bénéficiaire dans les plus brefs délais pour activer la prestation de souveraineté cognitive.
              </p>
              <div className="pt-4">
                <Button variant="primary" onClick={() => setSubmitted(false)} className="px-8 py-3.5">
                  Offrir à une Autre Personne
                </Button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              
              {/* SECTION 1 : DONATEUR */}
              <div className="space-y-6">
                <div className="border-b border-border pb-3">
                  <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Pilier 01</span>
                  <h3 className="font-heading text-xl text-cream font-light mt-1">Vos Coordonnées (L&apos;Offrant)</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="offrantPrenom" className="text-[9px] uppercase tracking-wider text-cream-muted">Votre Prénom</label>
                    <input
                      required
                      type="text"
                      id="offrantPrenom"
                      name="offrantPrenom"
                      value={data.offrantPrenom}
                      onChange={handleChange}
                      placeholder="Ex: Sliman"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm transition-colors uppercase"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="offrantNom" className="text-[9px] uppercase tracking-wider text-cream-muted">Votre Nom</label>
                    <input
                      required
                      type="text"
                      id="offrantNom"
                      name="offrantNom"
                      value={data.offrantNom}
                      onChange={handleChange}
                      placeholder="Ex: Amrani"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm transition-colors uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="offrantEmail" className="text-[9px] uppercase tracking-wider text-cream-muted">Votre Email</label>
                    <input
                      required
                      type="email"
                      id="offrantEmail"
                      name="offrantEmail"
                      value={data.offrantEmail}
                      onChange={handleChange}
                      placeholder="Ex: sliman@exemple.com"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="offrantTelephone" className="text-[9px] uppercase tracking-wider text-cream-muted">Votre Numéro de Téléphone</label>
                    <input
                      required
                      type="tel"
                      id="offrantTelephone"
                      name="offrantTelephone"
                      value={data.offrantTelephone}
                      onChange={handleChange}
                      placeholder="Ex: 06 12 34 56 78"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label htmlFor="offrantAdresse" className="text-[9px] uppercase tracking-wider text-cream-muted">Votre Adresse physique</label>
                    <input
                      required
                      type="text"
                      id="offrantAdresse"
                      name="offrantAdresse"
                      value={data.offrantAdresse}
                      onChange={handleChange}
                      placeholder="Ex: 14 Avenue de la République"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="offrantCodePostal" className="text-[9px] uppercase tracking-wider text-cream-muted">Votre Code Postal</label>
                    <input
                      required
                      type="text"
                      id="offrantCodePostal"
                      name="offrantCodePostal"
                      value={data.offrantCodePostal}
                      onChange={handleChange}
                      placeholder="Ex: 51100"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="offrantVille" className="text-[9px] uppercase tracking-wider text-cream-muted">Votre Ville</label>
                    <input
                      required
                      type="text"
                      id="offrantVille"
                      name="offrantVille"
                      value={data.offrantVille}
                      onChange={handleChange}
                      placeholder="Ex: Reims"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2 : DESTINATAIRE */}
              <div className="space-y-6">
                <div className="border-b border-border pb-3">
                  <span className="text-[10px] uppercase tracking-widest text-emerald font-bold">Pilier 02</span>
                  <h3 className="font-heading text-xl text-cream font-light mt-1">Coordonnées du Bénéficiaire (Le Destinataire)</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="beneficiairePrenom" className="text-[9px] uppercase tracking-wider text-cream-muted">Son Prénom</label>
                    <input
                      required
                      type="text"
                      id="beneficiairePrenom"
                      name="beneficiairePrenom"
                      value={data.beneficiairePrenom}
                      onChange={handleChange}
                      placeholder="Ex: Bilal"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-emerald outline-none text-xs rounded-sm transition-colors uppercase"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="beneficiaireNom" className="text-[9px] uppercase tracking-wider text-cream-muted">Son Nom</label>
                    <input
                      required
                      type="text"
                      id="beneficiaireNom"
                      name="beneficiaireNom"
                      value={data.beneficiaireNom}
                      onChange={handleChange}
                      placeholder="Ex: Amrani"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-emerald outline-none text-xs rounded-sm transition-colors uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-2 md:col-span-1">
                    <label htmlFor="beneficiaireRelation" className="text-[9px] uppercase tracking-wider text-cream-muted">Lien de relation avec vous</label>
                    <select
                      id="beneficiaireRelation"
                      name="beneficiaireRelation"
                      value={data.beneficiaireRelation}
                      onChange={handleChange}
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-emerald outline-none text-xs rounded-sm"
                    >
                      <option value="conjoint">Époux / Épouse (Foyer)</option>
                      <option value="enfant">Enfant (Filiation)</option>
                      <option value="ami">Ami Proche</option>
                      <option value="collaborateur">Collaborateur Professionnel</option>
                      <option value="autre">Autre relation</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-1">
                    <label htmlFor="beneficiaireEmail" className="text-[9px] uppercase tracking-wider text-cream-muted">Son E-mail</label>
                    <input
                      required
                      type="email"
                      id="beneficiaireEmail"
                      name="beneficiaireEmail"
                      value={data.beneficiaireEmail}
                      onChange={handleChange}
                      placeholder="Ex: bilal@amrani.fr"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-emerald outline-none text-xs rounded-sm transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2 md:col-span-1">
                    <label htmlFor="beneficiaireTelephone" className="text-[9px] uppercase tracking-wider text-cream-muted">Son Téléphone</label>
                    <input
                      required
                      type="tel"
                      id="beneficiaireTelephone"
                      name="beneficiaireTelephone"
                      value={data.beneficiaireTelephone}
                      onChange={handleChange}
                      placeholder="Ex: 06 99 88 77 66"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-emerald outline-none text-xs rounded-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                  <div className="md:col-span-2 flex flex-col gap-2">
                    <label htmlFor="beneficiaireAdresse" className="text-[9px] uppercase tracking-wider text-cream-muted">Son Adresse physique</label>
                    <input
                      required
                      type="text"
                      id="beneficiaireAdresse"
                      name="beneficiaireAdresse"
                      value={data.beneficiaireAdresse}
                      onChange={handleChange}
                      placeholder="Ex: 4 Boulevard du Général de Gaulle"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-emerald outline-none text-xs rounded-sm transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="beneficiaireCodePostal" className="text-[9px] uppercase tracking-wider text-cream-muted">Son Code Postal</label>
                    <input
                      required
                      type="text"
                      id="beneficiaireCodePostal"
                      name="beneficiaireCodePostal"
                      value={data.beneficiaireCodePostal}
                      onChange={handleChange}
                      placeholder="Ex: 51100"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-emerald outline-none text-xs rounded-sm transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="beneficiaireVille" className="text-[9px] uppercase tracking-wider text-cream-muted">Sa Ville</label>
                    <input
                      required
                      type="text"
                      id="beneficiaireVille"
                      name="beneficiaireVille"
                      value={data.beneficiaireVille}
                      onChange={handleChange}
                      placeholder="Ex: Reims"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-emerald outline-none text-xs rounded-sm transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3 : PRESTATION & MESSAGE */}
              <div className="space-y-6">
                <div className="border-b border-border pb-3">
                  <span className="text-[10px] uppercase tracking-widest text-emerald font-bold">Pilier 03</span>
                  <h3 className="font-heading text-xl text-cream font-light mt-1">Prestation Offerte & Message</h3>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="prestation" className="text-[9px] uppercase tracking-wider text-cream-muted font-semibold text-emerald">Choisir la Prestation à Offrir</label>
                  <select
                    id="prestation"
                    name="prestation"
                    value={data.prestation}
                    onChange={handleChange}
                    className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm"
                  >
                    <option value="pack_ouvrages">Le Pack Ouvrages complets (ePub + PDF) — 18,55 € (Accès Immédiat)</option>
                    <option value="diagnostic_souverainete">Bilan de Souveraineté & Diagnostic complet — 49,00 €</option>
                    <option value="mentorat_9_mois">Parrainage Mentorat Privé 9 Mois (Candidature guidée)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[9px] uppercase tracking-wider text-cream-muted">Message personnel d&apos;accompagnement spirituel</label>
                  <textarea
                    required
                    id="message"
                    name="message"
                    rows={4}
                    value={data.message}
                    onChange={handleChange}
                    placeholder="Écrivez un mot d'encouragement spirituel, de motivation ou d'excellence cognitive pour le destinataire..."
                    className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs font-body rounded-sm"
                  />
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-400 font-body uppercase tracking-wider text-center">{error}</p>
              )}

              <Button type="submit" disabled={loading} className="w-full py-4 justify-center shadow-lg shadow-gold/5 font-bold tracking-[0.2em]">
                {loading ? "Traitement de l'Acquisition..." : `Valider et Offrir : ${getPrestationTitle(data.prestation)} ➔`}
              </Button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
