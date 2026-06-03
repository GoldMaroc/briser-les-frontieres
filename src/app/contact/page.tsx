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
    } catch (err) {
      setError("Impossible de joindre le cabinet d'ingénierie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative pt-40 pb-32 bg-midnight min-h-screen">
      <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(27,40,56,0.35)_0%,rgba(10,17,40,0)_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* En-tête */}
        <SectionHeading
          label="Cabinet d&apos;Audit Privé"
          title="Entrer en Relation avec l&apos;Ingénieur"
          subtitle="Que ce soit pour l&apos;acquisition d&apos;un ouvrage physique, une mise en pratique du protocole de 30 jours, ou pour candidater à un accompagnement personnalisé in situ."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mt-16 max-w-5xl mx-auto">
          
          {/* Informations Cabinet à gauche */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="border-b border-border pb-6">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">Charte d&apos;Échange</span>
              <h3 className="font-heading text-2xl font-light text-cream mt-2">Discrétion & Rigueur</h3>
            </div>

            <ul className="space-y-6 text-xs text-cream-muted font-body leading-relaxed">
              <li className="flex gap-3">
                <span className="text-emerald font-bold">▪</span>
                <div>
                  <strong className="text-cream block mb-1">Secret Professionnel</strong>
                  Chaque message reçu est traité personnellement et exclusivement par Mounir BYAR. Aucun intermédiaire.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald font-bold">▪</span>
                <div>
                  <strong className="text-cream block mb-1">Réponse ciblée sous 48h</strong>
                  Nous privilégions la quality des échanges sur la quantité. Les demandes reçoivent une analyse attentive avant réponse.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald font-bold">▪</span>
                <div>
                  <strong className="text-cream block mb-1">Coordonnées de secours</strong>
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
            className="lg:col-span-7 p-8 md:p-12 border border-emerald/20 bg-surface/20 backdrop-blur-sm rounded-sm relative"
          >
            <div className="absolute top-0 right-10 w-20 h-px bg-gold" />
            <div className="absolute bottom-0 left-10 w-20 h-px bg-gold" />

            {submitted ? (
              <div className="text-center py-8 font-body">
                <span className="text-2xl text-gold font-heading mb-4 block">Message Transmis</span>
                <p className="text-sm text-cream-muted leading-relaxed">
                  Votre demande a bien été enregistrée dans notre protocole d&apos;échange sécurisé. Mounir BYAR en prendra connaissance personnellement et reviendra vers vous sous 48h.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Identité : Prénom & Nom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="prenom" className="text-[9px] uppercase tracking-wider text-cream-muted">Votre Prénom</label>
                    <input
                      required
                      type="text"
                      id="prenom"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      disabled={loading}
                      placeholder="Ex: Sliman"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm transition-colors uppercase"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="nom" className="text-[9px] uppercase tracking-wider text-cream-muted">Votre Nom</label>
                    <input
                      required
                      type="text"
                      id="nom"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      disabled={loading}
                      placeholder="Ex: Amrani"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm transition-colors uppercase"
                    />
                  </div>
                </div>

                {/* Coordonnées : Email & Téléphone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[9px] uppercase tracking-wider text-cream-muted">Email Personnel / Contact</label>
                    <input
                      required
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      placeholder="Ex: sliman@exemple.com"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="telephone" className="text-[9px] uppercase tracking-wider text-cream-muted">Téléphone de Contact</label>
                    <input
                      required
                      type="tel"
                      id="telephone"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      disabled={loading}
                      placeholder="Ex: 06 12 34 56 78"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Adresse Physique */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="adresse" className="text-[9px] uppercase tracking-wider text-cream-muted">Adresse physique</label>
                  <input
                    required
                    type="text"
                    id="adresse"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    disabled={loading}
                    placeholder="Ex: 14 Avenue de la République"
                    className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm transition-colors"
                  />
                </div>

                {/* Code Postal & Ville */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="codePostal" className="text-[9px] uppercase tracking-wider text-cream-muted">Code Postal</label>
                    <input
                      required
                      type="text"
                      id="codePostal"
                      value={codePostal}
                      onChange={(e) => setCodePostal(e.target.value)}
                      disabled={loading}
                      placeholder="Ex: 51100"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="ville" className="text-[9px] uppercase tracking-wider text-cream-muted">Ville de Résidence</label>
                    <input
                      required
                      type="text"
                      id="ville"
                      value={ville}
                      onChange={(e) => setVille(e.target.value)}
                      disabled={loading}
                      placeholder="Ex: Reims"
                      className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Objet de la Demande */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="typeRelation" className="text-[9px] uppercase tracking-wider text-cream-muted font-semibold text-emerald">Objet de la Demande</label>
                  <select
                    id="typeRelation"
                    value={typeRelation}
                    onChange={(e) => {
                      setTypeRelation(e.target.value);
                      if (e.target.value !== "livre") {
                        setLivreSelection("aucun");
                      } else {
                        setFormuleAccompagnement("individuel");
                      }
                    }}
                    disabled={loading}
                    className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm"
                  >
                    <option value="accompagnement_9_mois">Postuler au Protocole d&apos;Accompagnement de 9 Mois</option>
                    <option value="retour_spirituel">Échange pour un Retour vers Allah (Salat / Foi)</option>
                    <option value="livre">Acquérir un ouvrage / version numérique (Payant)</option>
                    <option value="autre">Autre demande</option>
                  </select>
                </div>

                {/* Sélections Conditionnelles selon l'objet de la demande */}
                <div className="grid grid-cols-1 gap-4">
                  {(typeRelation === "accompagnement_9_mois" || typeRelation === "retour_spirituel") && (
                    <div className="flex flex-col gap-2">
                      <label htmlFor="formuleAccompagnement" className="text-[9px] uppercase tracking-wider text-cream-muted font-semibold text-emerald">Format de l&apos;Accompagnement</label>
                      <select
                        id="formuleAccompagnement"
                        value={formuleAccompagnement}
                        onChange={(e) => setFormuleAccompagnement(e.target.value)}
                        disabled={loading}
                        className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm"
                      >
                        <option value="individuel">Accompagnement Individuel (1 personne)</option>
                        <option value="famille">Accompagnement Familles (Foyer / Couple)</option>
                        <option value="groupe">Accompagnement Collectif / Groupes</option>
                      </select>
                    </div>
                  )}

                  {typeRelation === "livre" && (
                    <div className="flex flex-col gap-2">
                      <label htmlFor="livreSelection" className="text-[9px] uppercase tracking-wider text-cream-muted font-semibold text-gold">Sélectionner l&apos;Ouvrage</label>
                      <select
                        id="livreSelection"
                        value={livreSelection}
                        onChange={(e) => setLivreSelection(e.target.value)}
                        disabled={loading}
                        className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs rounded-sm"
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
                  <label htmlFor="message" className="text-[9px] uppercase tracking-wider text-cream-muted">Description de votre Situation / Message</label>
                  <textarea
                    required
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                    placeholder="Détaillez votre demande en toute franchise. Quelle impasse traversez-vous ?"
                    className="px-4 py-3 bg-midnight text-cream border border-border focus:border-gold outline-none text-xs font-body rounded-sm"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-400 font-body uppercase tracking-wider text-center">{error}</p>
                )}

                <Button type="submit" disabled={loading} className="w-full mt-4 py-4 justify-center shadow-lg shadow-emerald/5">
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
