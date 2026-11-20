"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ProtectedEmail from "@/components/ui/ProtectedEmail";

export default function Contact() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [adresse, setAdresse] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [ville, setVille] = useState("");
  
  const [typeRelation, setTypeRelation] = useState("accompagnement_9_mois");
  const [formuleAccompagnement, setFormuleAccompagnement] = useState("individuel");
  const [livreSelection, setLivreSelection] = useState("secrets");
  const [message, setMessage] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const sujetParam = params.get("sujet");
      const livreParam = params.get("livre");

      if (sujetParam === "livre") {
        setTypeRelation("livre");
        if (livreParam) {
          setLivreSelection(livreParam);
        }
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !nom || !prenom || !telephone || !adresse || !codePostal || !ville || !message) {
      setError("Veuillez remplir l'ensemble des coordonnées obligatoires.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          nom, 
          prenom,
          email, 
          telephone,
          adresse,
          codePostal,
          ville,
          typeRelation, 
          formuleAccompagnement: (typeRelation === "accompagnement_9_mois" || typeRelation === "retour_spirituel") ? formuleAccompagnement : "aucune",
          livreSelection: typeRelation === "livre" ? livreSelection : "aucun",
          message
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setNom("");
        setPrenom("");
        setEmail("");
        setTelephone("");
        setAdresse("");
        setCodePostal("");
        setVille("");
        setMessage("");
      } else {
        const data = await response.json();
        setError(data.message || "Une erreur est survenue lors de l'envoi.");
      }
    } catch {
      setError("Impossible de joindre le cabinet d'ingénierie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative pt-32 sm:pt-40 pb-28 sm:pb-32 bg-[var(--bg)] text-[var(--text-primary)] min-h-screen transition-colors duration-280">
      
      {/* Halo doré subtil */}
      <div className="absolute top-0 left-0 right-0 h-[450px] bg-[radial-gradient(circle_at_50%_0%,rgba(184,142,62,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* En-tête */}
        <SectionHeading
          label="Cabinet d'Audit Privé"
          title="Entrer en Relation avec l'Ingénieur"
          subtitle="Que ce soit pour l'acquisition d'un ouvrage physique, une mise en pratique du protocole de 30 jours, ou pour candidater à un accompagnement personnalisé in situ."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-12 sm:mt-16 max-w-5xl mx-auto">
          
          {/* Informations Cabinet à gauche */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="border-b border-[var(--border)] pb-6">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#B88E3E] dark:text-[#D4A853]">Charte d&apos;Échange</span>
              <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] mt-2">Discrétion &amp; Rigueur</h3>
            </div>

            <ul className="space-y-6 text-xs text-[var(--text-secondary)] font-sans leading-relaxed">
              <li className="flex gap-3">
                <span className="text-[#B88E3E] dark:text-[#D4A853] font-bold">▪</span>
                <div>
                  <strong className="text-[var(--text-primary)] block mb-1">Secret Professionnel</strong>
                  Chaque message reçu est traité personnellement et exclusivement par Mounir BYAR. Aucun intermédiaire.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-[#B88E3E] dark:text-[#D4A853] font-bold">▪</span>
                <div>
                  <strong className="text-[var(--text-primary)] block mb-1">Réponse ciblée sous 48h</strong>
                  Nous privilégions la qualité des échanges sur la quantité. Les demandes reçoivent une analyse attentive avant réponse.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-[#B88E3E] dark:text-[#D4A853] font-bold">▪</span>
                <div>
                  <strong className="text-[var(--text-primary)] block mb-1">Coordonnées directes</strong>
                  En cas d&apos;urgence relative à l&apos;application du protocole de 30 jours, utilisez l&apos;adresse directe : <ProtectedEmail />
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Formulaire de Contact à droite */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 p-6 sm:p-10 border border-[var(--border)] bg-[var(--surface)] shadow-md rounded-2xl relative"
          >
            <div className="absolute top-0 right-10 w-20 h-px bg-[#B88E3E] dark:bg-[#D4A853]" />
            <div className="absolute bottom-0 left-10 w-20 h-px bg-[#B88E3E] dark:bg-[#D4A853]" />

            {submitted ? (
              <div className="text-center py-8 font-sans">
                <span className="text-2xl text-[#B88E3E] dark:text-[#D4A853] font-heading font-bold mb-4 block">Message Transmis</span>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Votre demande a bien été enregistrée dans notre protocole d&apos;échange sécurisé. Mounir BYAR en prendra connaissance personnellement et reviendra vers vous sous 48h.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Identité : Prénom & Nom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="prenom" className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Votre Prénom</label>
                    <input
                      required
                      type="text"
                      id="prenom"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      disabled={loading}
                      placeholder="Ex: Sliman"
                      className="px-4 py-3 bg-[var(--bg)] text-[var(--text-primary)] border border-[var(--border)] focus:border-[#B88E3E] dark:focus:border-[#D4A853] outline-none text-xs rounded-xl transition-colors uppercase"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="nom" className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Votre Nom</label>
                    <input
                      required
                      type="text"
                      id="nom"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      disabled={loading}
                      placeholder="Ex: Amrani"
                      className="px-4 py-3 bg-[var(--bg)] text-[var(--text-primary)] border border-[var(--border)] focus:border-[#B88E3E] dark:focus:border-[#D4A853] outline-none text-xs rounded-xl transition-colors uppercase"
                    />
                  </div>
                </div>

                {/* Coordonnées : Email & Téléphone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Email Personnel / Contact</label>
                    <input
                      required
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      placeholder="Ex: sliman@exemple.com"
                      className="px-4 py-3 bg-[var(--bg)] text-[var(--text-primary)] border border-[var(--border)] focus:border-[#B88E3E] dark:focus:border-[#D4A853] outline-none text-xs rounded-xl transition-colors lowercase"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="telephone" className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Téléphone de Contact</label>
                    <input
                      required
                      type="tel"
                      id="telephone"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      disabled={loading}
                      placeholder="Ex: 06 12 34 56 78"
                      className="px-4 py-3 bg-[var(--bg)] text-[var(--text-primary)] border border-[var(--border)] focus:border-[#B88E3E] dark:focus:border-[#D4A853] outline-none text-xs rounded-xl transition-colors"
                    />
                  </div>
                </div>

                {/* Localisation : Adresse, CP, Ville */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="adresse" className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Adresse Physique</label>
                  <input
                    required
                    type="text"
                    id="adresse"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    disabled={loading}
                    placeholder="Ex: 14 Avenue de la République"
                    className="px-4 py-3 bg-[var(--bg)] text-[var(--text-primary)] border border-[var(--border)] focus:border-[#B88E3E] dark:focus:border-[#D4A853] outline-none text-xs rounded-xl transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="codePostal" className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Code Postal</label>
                    <input
                      required
                      type="text"
                      id="codePostal"
                      value={codePostal}
                      onChange={(e) => setCodePostal(e.target.value)}
                      disabled={loading}
                      placeholder="Ex: 51100"
                      className="px-4 py-3 bg-[var(--bg)] text-[var(--text-primary)] border border-[var(--border)] focus:border-[#B88E3E] dark:focus:border-[#D4A853] outline-none text-xs rounded-xl transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="ville" className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Ville de Résidence</label>
                    <input
                      required
                      type="text"
                      id="ville"
                      value={ville}
                      onChange={(e) => setVille(e.target.value)}
                      disabled={loading}
                      placeholder="Ex: Reims"
                      className="px-4 py-3 bg-[var(--bg)] text-[var(--text-primary)] border border-[var(--border)] focus:border-[#B88E3E] dark:focus:border-[#D4A853] outline-none text-xs rounded-xl transition-colors uppercase"
                    />
                  </div>
                </div>

                {/* Type de Demande */}
                <div className="space-y-4 pt-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="typeRelation" className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Nature de la Démarche</label>
                    <select
                      id="typeRelation"
                      value={typeRelation}
                      onChange={(e) => setTypeRelation(e.target.value)}
                      disabled={loading}
                      className="px-4 py-3 bg-[var(--bg)] text-[var(--text-primary)] border border-[var(--border)] focus:border-[#B88E3E] dark:focus:border-[#D4A853] outline-none text-xs rounded-xl"
                    >
                      <option value="accompagnement_9_mois">Candidater à l&apos;Accompagnement Privé (Mounir Byar)</option>
                      <option value="retour_spirituel">Diagnostic &amp; Protocole de Restructuration</option>
                      <option value="livre">Acquisition &amp; Consultation d&apos;un Traité Écrit</option>
                      <option value="autre">Autre Demande Officielle</option>
                    </select>
                  </div>

                  {(typeRelation === "accompagnement_9_mois" || typeRelation === "retour_spirituel") && (
                    <div className="flex flex-col gap-2">
                      <label htmlFor="formuleAccompagnement" className="text-[11px] font-semibold uppercase tracking-wider text-[#B88E3E] dark:text-[#D4A853]">Format de l&apos;Accompagnement</label>
                      <select
                        id="formuleAccompagnement"
                        value={formuleAccompagnement}
                        onChange={(e) => setFormuleAccompagnement(e.target.value)}
                        disabled={loading}
                        className="px-4 py-3 bg-[var(--bg)] text-[var(--text-primary)] border border-[var(--border)] focus:border-[#B88E3E] dark:focus:border-[#D4A853] outline-none text-xs rounded-xl"
                      >
                        <option value="individuel">Accompagnement Individuel (1 personne)</option>
                        <option value="famille">Accompagnement Familles (Foyer / Couple)</option>
                        <option value="groupe">Accompagnement Collectif / Groupes</option>
                      </select>
                    </div>
                  )}

                  {typeRelation === "livre" && (
                    <div className="flex flex-col gap-2">
                      <label htmlFor="livreSelection" className="text-[11px] font-semibold uppercase tracking-wider text-[#B88E3E] dark:text-[#D4A853]">Sélectionner l&apos;Ouvrage</label>
                      <select
                        id="livreSelection"
                        value={livreSelection}
                        onChange={(e) => setLivreSelection(e.target.value)}
                        disabled={loading}
                        className="px-4 py-3 bg-[var(--bg)] text-[var(--text-primary)] border border-[var(--border)] focus:border-[#B88E3E] dark:focus:border-[#D4A853] outline-none text-xs rounded-xl"
                      >
                        <option value="secrets">Les Secrets du Retour vers Allah — Format ePub (5,90 €)</option>
                        <option value="rahman">Ar-Rahman : La Mer sans Rivage — Format PDF (12,65 €)</option>
                        <option value="pack">Pack Intégral (ePub + PDF) (18,55 €)</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Message situationnel */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">Description de votre Situation / Message</label>
                  <textarea
                    required
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                    placeholder="Détaillez votre demande en toute franchise. Quelle impasse traversez-vous ?"
                    className="px-4 py-3 bg-[var(--bg)] text-[var(--text-primary)] border border-[var(--border)] focus:border-[#B88E3E] dark:focus:border-[#D4A853] outline-none text-xs font-sans rounded-xl"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-500 font-mono uppercase tracking-wider text-center">{error}</p>
                )}

                <Button type="submit" disabled={loading} className="w-full mt-4 py-4 justify-center">
                  {loading ? "Validation..." : "Transmettre au Cabinet"}
                </Button>

              </form>
            )}

          </motion.div>

        </div>
      </div>
    </div>
  );
}
