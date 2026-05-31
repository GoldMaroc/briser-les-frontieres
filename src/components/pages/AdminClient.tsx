"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

interface Candidature {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  localisation: string; // rétrocompatibilité
  fatigueDecisionnelle: string;
  chargeAllostatique: string;
  salatImpact: string;
  interpositionAccord: boolean;
  motivation: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

interface Audit {
  id: string;
  nom: string;
  email: string;
  score: number;
  responses: Record<string, string>;
  created_at: string;
}

interface SubmittedTestimonial {
  id: string;
  nom: string;
  categorie: "homme" | "femme" | "famille" | "groupe";
  periode: string;
  message: string;
  approved: boolean;
  created_at: string;
  localisation?: string;
}

interface ContactMessage {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  codePostal: string;
  ville: string;
  typeRelation: string;
  formuleAccompagnement: string;
  livreSelection: string;
  message: string;
  created_at: string;
}

interface GiftRequest {
  id: string;
  offrant: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
    codePostal: string;
    ville: string;
  };
  beneficiaire: {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    adresse: string;
    codePostal: string;
    ville: string;
    relation: string;
  };
  prestation: string;
  message: string;
  created_at: string;
}

type TabType = "candidatures" | "audits" | "messages" | "gifts" | "newsletter" | "testimonials";

export default function AdminClient() {
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [loginStep, setLoginStep] = useState<1 | 2>(1); // 1 = main password, 2 = OTP double factor
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("candidatures");
  
  const [data, setData] = useState<{
    subscribers: Subscriber[];
    candidatures: Candidature[];
    audits: Audit[];
    testimonials: SubmittedTestimonial[];
    contacts: ContactMessage[];
    gifts: GiftRequest[];
  }>({
    subscribers: [],
    candidatures: [],
    audits: [],
    testimonials: [],
    contacts: [],
    gifts: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [expandedCand, setExpandedCand] = useState<string | null>(null);
  const [expandedMsg, setExpandedMsg] = useState<string | null>(null);
  const [expandedGift, setExpandedGift] = useState<string | null>(null);

  // Essayer d'utiliser les clés mémorisées
  useEffect(() => {
    const savedPassword = localStorage.getItem("blf_admin_password");
    // Si déjà connecté dans cette session de navigation, on peut bypasser, sinon on force l'OTP à chaque reconnexion logicielle
    if (savedPassword && !isAuthenticated) {
      setPassword(savedPassword);
    }
  }, []);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() })
      });
      const resData = await response.json();

      if (response.ok) {
        setSuccessMsg(resData.message);
        setLoginStep(2); // Transition vers l'étape de saisie de l'OTP
      } else {
        setErrorMsg(resData.message || "Code secret incorrect.");
      }
    } catch (err) {
      setErrorMsg("Impossible de joindre le serveur pour valider la clé d'accès.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim()) return;

    setIsLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await fetch("/api/admin/data", {
        method: "GET",
        headers: {
          "X-Admin-Password": password.trim(),
          "X-Admin-Otp": otpCode.trim()
        }
      });
      const resData = await response.json();

      if (response.ok) {
        setData(resData.data);
        setIsAuthenticated(true);
        localStorage.setItem("blf_admin_password", password.trim());
      } else {
        setErrorMsg(resData.message || "Code OTP de sécurité incorrect ou expiré.");
      }
    } catch (err) {
      setErrorMsg("Impossible de valider la double authentification auprès du serveur.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("blf_admin_password");
    setIsAuthenticated(false);
    setLoginStep(1);
    setPassword("");
    setOtpCode("");
    setData({ subscribers: [], candidatures: [], audits: [], testimonials: [], contacts: [], gifts: [] });
  };

  const handleCandidatureAction = async (id: string, status: "approved" | "rejected") => {
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const response = await fetch("/api/admin/action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": password
        },
        body: JSON.stringify({ action: "updateCandidature", id, status })
      });

      const resData = await response.json();
      if (response.ok) {
        setSuccessMsg(resData.message);
        setData((prev) => ({
          ...prev,
          candidatures: prev.candidatures.map((c) => (c.id === id ? { ...c, status } : c))
        }));
      } else {
        setErrorMsg(resData.message || "Échec de la mise à jour.");
      }
    } catch (err) {
      setErrorMsg("Erreur lors de l'enregistrement de l'action.");
    }
  };

  const handleDeleteItem = async (id: string, actionType: "deleteCandidature" | "deleteAudit" | "deleteContact" | "deleteGift") => {
    if (!confirm("Voulez-vous vraiment supprimer définitivement cet élément ? Cette action est irréversible.")) return;
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const response = await fetch("/api/admin/action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": password
        },
        body: JSON.stringify({ action: actionType, id })
      });

      const resData = await response.json();
      if (response.ok) {
        setSuccessMsg(resData.message);
        setData((prev) => {
          if (actionType === "deleteCandidature") {
            return { ...prev, candidatures: prev.candidatures.filter((c) => c.id !== id) };
          } else if (actionType === "deleteAudit") {
            return { ...prev, audits: prev.audits.filter((a) => a.id !== id) };
          } else if (actionType === "deleteContact") {
            return { ...prev, contacts: prev.contacts.filter((c) => c.id !== id) };
          } else {
            return { ...prev, gifts: prev.gifts.filter((g) => g.id !== id) };
          }
        });
      } else {
        setErrorMsg(resData.message || "Échec de la suppression.");
      }
    } catch (err) {
      setErrorMsg("Erreur lors de la suppression.");
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cet abonné de la liste ?")) return;
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const response = await fetch("/api/admin/action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": password
        },
        body: JSON.stringify({ action: "deleteSubscriber", id })
      });

      const resData = await response.json();
      if (response.ok) {
        setSuccessMsg(resData.message);
        setData((prev) => ({
          ...prev,
          subscribers: prev.subscribers.filter((s) => s.id !== id)
        }));
      } else {
        setErrorMsg(resData.message || "Échec de la suppression.");
      }
    } catch (err) {
      setErrorMsg("Erreur lors de la suppression.");
    }
  };

  const handleTestimonialAction = async (id: string, action: "approveTestimonial" | "deleteTestimonial") => {
    if (action === "deleteTestimonial" && !confirm("Voulez-vous vraiment supprimer définitivement ce témoignage ?")) return;
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const response = await fetch("/api/admin/action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": password
        },
        body: JSON.stringify({ action, id })
      });

      const resData = await response.json();
      if (response.ok) {
        setSuccessMsg(resData.message);
        setData((prev) => {
          if (action === "approveTestimonial") {
            return {
              ...prev,
              testimonials: prev.testimonials.map((t) => (t.id === id ? { ...t, approved: true } : t))
            };
          } else {
            return {
              ...prev,
              testimonials: prev.testimonials.filter((t) => t.id !== id)
            };
          }
        });
      } else {
        setErrorMsg(resData.message || "Échec de l'action sur le témoignage.");
      }
    } catch (err) {
      setErrorMsg("Erreur de connexion lors de l'action.");
    }
  };

  const handleExportCSV = () => {
    if (data.subscribers.length === 0) return;
    let csvContent = "data:text/csv;charset=utf-8,ID,Email,Date d'inscription\n";
    data.subscribers.forEach((s) => {
      csvContent += `${s.id},${s.email},${s.created_at}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Abonnes_Newsletter_BLF_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (!isAuthenticated) {
    /* ÉCRAN DE DOUBLE AUTHENTIFICATION OTP SÉCURISÉ */
    return (
      <div className="max-w-md mx-auto bg-midnight-light backdrop-blur-xl border border-gold/20 p-8 md:p-12 rounded-sm shadow-2xl relative font-body mt-20">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        
        <div className="text-center space-y-3 mb-8">
          <span className="text-[10px] tracking-[0.35em] uppercase text-gold font-bold block">
            Accès Hautement Sécurisé
          </span>
          <h2 className="font-heading text-3xl font-light text-cream leading-tight">
            Console Cabinet BLF
          </h2>
          <p className="text-xs text-cream-muted leading-relaxed">
            {loginStep === 1 
              ? "Saisissez la clé d'accès principale pour initier le protocole de vérification de souveraineté administrative."
              : "Double Facteur Activé : Un code OTP secret unique a été expédié à l'adresse byarmounir@gmail.com."}
          </p>
        </div>

        {loginStep === 1 ? (
          /* ÉTAPE 1 : CLÉ D'ACCÈS */
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-[0.2em] text-cream-muted font-semibold block">Clé d'accès principale</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-midnight border border-border focus:border-gold p-3.5 text-sm text-cream outline-none rounded-sm transition-colors text-center tracking-widest"
                placeholder="••••••••••••••"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-red-400 border border-red-500/20 bg-red-500/5 p-3 text-center rounded-sm font-semibold">
                ⚠️ {errorMsg}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              variant="primary"
              className="w-full py-4 text-center justify-center flex font-bold tracking-[0.2em]"
            >
              {isLoading ? "Vérification..." : "Générer OTP de Sécurité →"}
            </Button>
          </form>
        ) : (
          /* ÉTAPE 2 : CODE OTP DOUBLE FACTEUR */
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-[0.2em] text-emerald font-semibold block text-center">Entrez le code OTP reçu par e-mail</label>
              <input
                type="text"
                required
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                className="w-full bg-midnight border border-border focus:border-gold p-3.5 text-2xl text-gold outline-none rounded-sm transition-colors text-center tracking-[0.4em] font-mono"
                placeholder="••••••"
              />
            </div>

            {successMsg && (
              <p className="text-[10px] text-emerald bg-emerald-muted/5 border border-emerald/20 p-2.5 text-center rounded-sm">
                {successMsg}
              </p>
            )}

            {errorMsg && (
              <p className="text-xs text-red-400 border border-red-500/20 bg-red-500/5 p-3 text-center rounded-sm font-semibold">
                ⚠️ {errorMsg}
              </p>
            )}

            <div className="space-y-3">
              <Button
                type="submit"
                disabled={isLoading || otpCode.length !== 6}
                variant="primary"
                className="w-full py-4 text-center justify-center flex font-bold tracking-[0.2em]"
              >
                {isLoading ? "Vérification double facteur..." : "Valider l'Accès Administrateur ✓"}
              </Button>
              
              <button
                type="button"
                onClick={() => setLoginStep(1)}
                className="w-full text-center text-[10px] text-cream-muted hover:text-cream tracking-wider uppercase underline transition-colors cursor-pointer py-1"
              >
                ← Retourner au mot de passe
              </button>
            </div>
          </form>
        )}
      </div>
    );
  }

  /* INTERFACE TABLEAU DE BORD ADMIN MULTI-ONGLETS AVEC CRUD COMPLET */
  return (
    <div className="space-y-8 font-body">
      
      {/* Header Admin */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-border pb-6 gap-4">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] tracking-[0.3em] uppercase text-emerald font-bold">Cabinet de Pilotage</span>
          <h2 className="font-heading text-3xl text-cream font-light">Administration des Cohortes</h2>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 border border-red-500/30 text-red-400 text-[10px] uppercase tracking-widest font-semibold hover:bg-red-500 hover:text-white transition-all cursor-pointer rounded-sm"
        >
          Déconnexion ✕
        </button>
      </div>

      {/* Alertes de notifications temporaires */}
      {successMsg && (
        <div className="p-4 border border-emerald/20 bg-emerald/5 text-emerald text-xs text-center rounded-sm">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="p-4 border border-red-500/20 bg-red-500/5 text-red-400 text-xs text-center rounded-sm">
          {errorMsg}
        </div>
      )}

      {/* Onglets de Navigation Multi-colonnes (6 onglets) */}
      <div className="flex flex-wrap border-b border-border gap-1">
        {[
          { key: "candidatures", label: `Candidatures (${data.candidatures.length})` },
          { key: "audits", label: `Audits Souveraineté (${data.audits.length})` },
          { key: "messages", label: `Messages Reçus (${data.contacts?.length || 0})` },
          { key: "gifts", label: `Cadeaux Offerts (${data.gifts?.length || 0})` },
          { key: "newsletter", label: `Newsletter (${data.subscribers.length})` },
          { key: "testimonials", label: `Avis Modération (${data.testimonials.length})` }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key as TabType); setSuccessMsg(""); setErrorMsg(""); }}
            className={`py-3.5 px-4 text-[10px] sm:text-xs uppercase tracking-widest font-semibold cursor-pointer border-b-2 transition-all ${
              activeTab === tab.key
                ? "border-gold text-gold font-bold bg-gold-muted/5"
                : "border-transparent text-cream-muted hover:text-cream"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENU ONGLETS */}
      <div className="bg-midnight-light border border-border p-6 rounded-sm min-h-[400px]">
        <AnimatePresence mode="wait">
          
          {/* 1. TABLEAU DES CANDIDATURES MENTORAT */}
          {activeTab === "candidatures" && (
            <motion.div
              key="candidatures"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {data.candidatures.length === 0 ? (
                <p className="text-sm text-cream-muted italic text-center py-16">Aucun dossier de candidature déposé pour le moment.</p>
              ) : (
                <div className="space-y-4">
                  {data.candidatures.map((c) => (
                    <div
                      key={c.id}
                      className={`border p-6 rounded-sm transition-all duration-300 ${
                        c.status === "approved"
                          ? "border-emerald/30 bg-emerald-muted/5"
                          : c.status === "rejected"
                          ? "border-border bg-midnight/20"
                          : "border-gold/30 bg-gold-muted/5"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/40 pb-4 mb-4">
                        <div className="space-y-1">
                          <h3 className="font-heading text-xl text-cream font-light">
                            {c.prenom || ""} {c.nom}
                          </h3>
                          <p className="text-xs text-cream-muted">
                            Code Postal : <span className="text-gold font-semibold uppercase">{c.codePostal || "NON COLLECTÉ"}</span> — {c.ville || c.localisation || "Ville non renseignée"}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border ${
                            c.status === "approved"
                              ? "border-emerald/40 text-emerald bg-emerald-muted/10"
                              : c.status === "rejected"
                              ? "border-border/60 text-cream-muted"
                              : "border-gold/40 text-gold bg-gold-muted/10"
                          }`}>
                            {c.status === "approved" ? "Approuvé" : c.status === "rejected" ? "Refusé" : "En attente"}
                          </span>
                          <button
                            onClick={() => setExpandedCand(expandedCand === c.id ? null : c.id)}
                            className="px-3 py-1.5 border border-border text-[9px] uppercase tracking-widest font-semibold hover:border-gold hover:text-gold cursor-pointer rounded-sm"
                          >
                            {expandedCand === c.id ? "Masquer ▲" : "Dossier Complet ▼"}
                          </button>
                        </div>
                      </div>

                      {/* Corps détaillé déplié */}
                      {expandedCand === c.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-6 pt-2 font-body"
                        >
                          {/* Coordonnées détaillées de souveraineté */}
                          <div className="bg-midnight/40 border border-border/60 p-4 rounded-sm space-y-2">
                            <span className="text-[9px] uppercase tracking-wider text-emerald font-semibold block">Coordonnées de Souveraineté :</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs leading-relaxed">
                              <p><strong className="text-cream-muted">E-mail :</strong> <a href={`mailto:${c.email}`} className="text-gold underline">{c.email}</a></p>
                              <p><strong className="text-cream-muted">Téléphone :</strong> {c.telephone || "Non renseigné"}</p>
                              <p><strong className="text-cream-muted">Localité :</strong> {c.codePostal || ""} {c.ville || c.localisation || "Non fournie"}</p>
                              <p className="sm:col-span-2 md:col-span-3"><strong className="text-cream-muted">Adresse physique :</strong> {c.adresse || "Non fournie"}</p>
                            </div>
                          </div>

                          {/* Diagnostic cognitif */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-border/40 pb-5">
                            <div className="p-3 bg-midnight border border-border rounded-sm">
                              <span className="text-[9px] uppercase text-cream-muted block mb-1">Fatigue Décisionnelle</span>
                              <strong className="text-xs text-cream uppercase">{c.fatigueDecisionnelle}</strong>
                            </div>
                            <div className="p-3 bg-midnight border border-border rounded-sm">
                              <span className="text-[9px] uppercase text-cream-muted block mb-1">Charge Allostatique</span>
                              <strong className="text-xs text-cream uppercase">{c.chargeAllostatique}</strong>
                            </div>
                            <div className="p-3 bg-midnight border border-border rounded-sm">
                              <span className="text-[9px] uppercase text-cream-muted block mb-1">Impact sur la Salat</span>
                              <strong className="text-xs text-cream uppercase">{c.salatImpact}</strong>
                            </div>
                          </div>

                          {/* Motivation */}
                          <div className="space-y-1.5">
                            <span className="text-[9px] uppercase tracking-wider text-gold font-semibold block">Motivation & Objectifs :</span>
                            <p className="text-xs leading-relaxed text-cream-muted whitespace-pre-line p-4 bg-midnight/30 border border-border/60 rounded-sm max-h-60 overflow-y-auto">
                              {c.motivation}
                            </p>
                          </div>

                          {/* Date, accord & suppression */}
                          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-cream-muted border-t border-border/40 pt-4 gap-4">
                            <span>Dossier soumis le : {formatDate(c.created_at)}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-emerald">✔ Accord d'interposition in situ validé</span>
                              <button
                                onClick={() => handleDeleteItem(c.id, "deleteCandidature")}
                                className="px-3 py-1.5 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-all text-[9px] uppercase tracking-widest font-bold cursor-pointer rounded-sm"
                              >
                                Supprimer le Dossier 🗑
                              </button>
                            </div>
                          </div>

                          {/* Actions de qualification */}
                          {c.status === "pending" && (
                            <div className="flex justify-end gap-3 pt-4">
                              <button
                                onClick={() => handleCandidatureAction(c.id, "rejected")}
                                className="px-5 py-2 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-[10px] uppercase tracking-wider font-semibold cursor-pointer transition-all rounded-sm"
                              >
                                Rejeter la candidature
                              </button>
                              <button
                                onClick={() => handleCandidatureAction(c.id, "approved")}
                                className="px-5 py-2 border border-emerald text-emerald hover:bg-emerald hover:text-midnight text-[10px] uppercase tracking-wider font-semibold cursor-pointer transition-all rounded-sm"
                              >
                                Approuver le candidat
                              </button>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* 2. TABLEAU DES AUDITS SOUVERAINETÉ */}
          {activeTab === "audits" && (
            <motion.div
              key="audits"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {data.audits.length === 0 ? (
                <p className="text-sm text-cream-muted italic text-center py-16">Aucun bilan de souveraineté cognitive enregistré.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border text-cream-muted uppercase tracking-widest text-[9px]">
                        <th className="py-4 px-4 font-semibold">Candidat</th>
                        <th className="py-4 px-4 font-semibold">Email</th>
                        <th className="py-4 px-4 font-semibold text-center">Indice Global</th>
                        <th className="py-4 px-4 font-semibold">Date d'audit</th>
                        <th className="py-4 px-4 font-semibold text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.audits.map((a) => (
                        <tr key={a.id} className="border-b border-border hover:bg-midnight/20 transition-all">
                          <td className="py-4 px-4 font-heading text-sm text-cream font-light">{a.nom}</td>
                          <td className="py-4 px-4 text-cream-muted font-mono">{a.email}</td>
                          <td className="py-4 px-4 text-center">
                            <span className={`font-semibold px-3 py-1 rounded-full border text-[10px] ${
                              a.score < 30
                                ? "border-red-500/30 text-red-400 bg-red-500/5"
                                : a.score < 60
                                ? "border-amber-500/30 text-amber-400 bg-amber-500/5"
                                : a.score < 85
                                ? "border-emerald/30 text-emerald bg-emerald/5"
                                : "border-gold/30 text-gold bg-gold/5"
                            }`}>
                              {a.score} %
                            </span>
                          </td>
                          <td className="py-4 px-4 text-cream-muted">{formatDate(a.created_at)}</td>
                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => handleDeleteItem(a.id, "deleteAudit")}
                              className="px-2.5 py-1 border border-red-500/20 text-red-400 hover:border-red-500 hover:text-white transition-all text-[9px] uppercase tracking-wider font-semibold cursor-pointer rounded-sm"
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* 3. TABLEAU DES MESSAGES DE CONTACT */}
          {activeTab === "messages" && (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {(!data.contacts || data.contacts.length === 0) ? (
                <p className="text-sm text-cream-muted italic text-center py-16">Aucun message situationnel de contact reçu.</p>
              ) : (
                <div className="space-y-4">
                  {data.contacts.map((contact) => (
                    <div key={contact.id} className="border border-border p-6 rounded-sm bg-midnight/10 hover:border-gold/30 transition-all duration-300">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/40 pb-4 mb-4">
                        <div className="space-y-1">
                          <span className="text-[8px] uppercase tracking-widest text-emerald font-bold bg-emerald-muted/10 border border-emerald/20 px-2 py-0.5 rounded">
                            Objet : {contact.typeRelation}
                          </span>
                          <h3 className="font-heading text-xl text-cream font-light pt-1">
                            {contact.prenom} {contact.nom}
                          </h3>
                          <p className="text-xs text-cream-muted">
                            Code Postal : <span className="text-gold font-semibold uppercase">{contact.codePostal || "NON COLLECTÉ"}</span> — {contact.ville || "Ville non fournie"}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setExpandedMsg(expandedMsg === contact.id ? null : contact.id)}
                            className="px-3 py-1.5 border border-border text-[9px] uppercase tracking-widest font-semibold hover:border-gold hover:text-gold cursor-pointer rounded-sm"
                          >
                            {expandedMsg === contact.id ? "Masquer ▲" : "Lire le Message ▼"}
                          </button>
                        </div>
                      </div>

                      {expandedMsg === contact.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-4 pt-2 font-body"
                        >
                          {/* Coordonnées détaillées du contact */}
                          <div className="bg-midnight/40 border border-border/60 p-4 rounded-sm space-y-2">
                            <span className="text-[9px] uppercase tracking-wider text-emerald font-semibold block">Coordonnées de l'Interlocuteur :</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs leading-relaxed">
                              <p><strong className="text-cream-muted">Email :</strong> <a href={`mailto:${contact.email}`} className="text-gold underline">{contact.email}</a></p>
                              <p><strong className="text-cream-muted">Téléphone :</strong> {contact.telephone || "Non fourni"}</p>
                              <p><strong className="text-cream-muted">Ville :</strong> {contact.codePostal || ""} {contact.ville || "Non fournie"}</p>
                              <p className="sm:col-span-2 md:col-span-3"><strong className="text-cream-muted">Adresse physique :</strong> {contact.adresse || "Non fournie"}</p>
                            </div>
                          </div>

                          {/* Message */}
                          <div className="space-y-1.5">
                            <span className="text-[9px] uppercase tracking-wider text-gold font-semibold block">Message Situationnel :</span>
                            <p className="text-xs leading-relaxed text-cream-muted whitespace-pre-line p-4 bg-midnight/30 border border-border/60 rounded-sm italic">
                              « {contact.message} »
                            </p>
                          </div>

                          {/* Infos additionnelles */}
                          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-cream-muted border-t border-border/40 pt-4 gap-4">
                            <span>Reçu le : {formatDate(contact.created_at)}</span>
                            <div className="flex gap-3">
                              {contact.formuleAccompagnement && contact.formuleAccompagnement !== "aucune" && (
                                <span className="px-2 py-0.5 border border-border text-emerald rounded text-[9px] uppercase font-bold">Format: {contact.formuleAccompagnement}</span>
                              )}
                              {contact.livreSelection && contact.livreSelection !== "aucun" && (
                                <span className="px-2 py-0.5 border border-border text-gold rounded text-[9px] uppercase font-bold">Livre: {contact.livreSelection}</span>
                              )}
                              <button
                                onClick={() => handleDeleteItem(contact.id, "deleteContact")}
                                className="px-2.5 py-1 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all text-[9px] uppercase font-bold cursor-pointer rounded-sm"
                              >
                                Supprimer Message 🗑
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* 4. TABLEAU DES PRESTATIONS CADEAUX OFFERTES */}
          {activeTab === "gifts" && (
            <motion.div
              key="gifts"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {(!data.gifts || data.gifts.length === 0) ? (
                <p className="text-sm text-cream-muted italic text-center py-16">Aucune demande de prestation offerte enregistrée.</p>
              ) : (
                <div className="space-y-4">
                  {data.gifts.map((gift) => (
                    <div key={gift.id} className="border border-border p-6 rounded-sm bg-midnight/10 hover:border-gold/30 transition-all duration-300">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/40 pb-4 mb-4">
                        <div className="space-y-1">
                          <span className="text-[8px] uppercase tracking-widest text-gold font-bold bg-gold-muted/10 border border-gold/20 px-2.5 py-0.5 rounded">
                            OFFRE : {gift.prestation}
                          </span>
                          <h3 className="font-heading text-xl text-cream font-light pt-1">
                            De {gift.offrant.prenom} {gift.offrant.nom} ➔ Pour {gift.beneficiaire.prenom} {gift.beneficiaire.nom}
                          </h3>
                          <p className="text-xs text-cream-muted">
                            Lien de relation : <span className="text-gold uppercase font-semibold">{gift.beneficiaire.relation}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setExpandedGift(expandedGift === gift.id ? null : gift.id)}
                            className="px-3 py-1.5 border border-border text-[9px] uppercase tracking-widest font-semibold hover:border-gold hover:text-gold cursor-pointer rounded-sm"
                          >
                            {expandedGift === gift.id ? "Masquer ▲" : "Détails du Cadeau ▼"}
                          </button>
                        </div>
                      </div>

                      {expandedGift === gift.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-6 pt-2 font-body"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Donateur */}
                            <div className="bg-midnight/40 border border-border/60 p-4 rounded-sm space-y-2">
                              <span className="text-[9px] uppercase tracking-wider text-gold font-semibold block">L'Offrant (Donateur) :</span>
                              <div className="text-xs leading-relaxed space-y-1">
                                <p><strong className="text-cream-muted">Identité :</strong> {gift.offrant.prenom} {gift.offrant.nom}</p>
                                <p><strong className="text-cream-muted">Email :</strong> <a href={`mailto:${gift.offrant.email}`} className="text-gold underline">{gift.offrant.email}</a></p>
                                <p><strong className="text-cream-muted">Téléphone :</strong> {gift.offrant.telephone || "Non fourni"}</p>
                                <p><strong className="text-cream-muted">Adresse :</strong> {gift.offrant.adresse || "Non fournie"}, {gift.offrant.codePostal || ""} {gift.offrant.ville || ""}</p>
                              </div>
                            </div>

                            {/* Bénéficiaire */}
                            <div className="bg-midnight/40 border border-border/60 p-4 rounded-sm space-y-2">
                              <span className="text-[9px] uppercase tracking-wider text-emerald font-semibold block">Le Bénéficiaire (Destinataire) :</span>
                              <div className="text-xs leading-relaxed space-y-1">
                                <p><strong className="text-cream-muted">Identité :</strong> {gift.beneficiaire.prenom} {gift.beneficiaire.nom}</p>
                                <p><strong className="text-cream-muted">Email :</strong> <a href={`mailto:${gift.beneficiaire.email}`} className="text-gold underline">{gift.beneficiaire.email}</a></p>
                                <p><strong className="text-cream-muted">Téléphone :</strong> {gift.beneficiaire.telephone || "Non fourni"}</p>
                                <p><strong className="text-cream-muted">Adresse :</strong> {gift.beneficiaire.adresse || "Non fournie"}, {gift.beneficiaire.codePostal || ""} {gift.beneficiaire.ville || ""}</p>
                              </div>
                            </div>
                          </div>

                          {/* Message d'accompagnement */}
                          <div className="space-y-1.5">
                            <span className="text-[9px] uppercase tracking-wider text-gold font-semibold block">Message d'Accompagnement Spirituel :</span>
                            <p className="text-xs leading-relaxed text-cream-muted whitespace-pre-line p-4 bg-midnight/30 border border-border/60 rounded-sm italic">
                              « {gift.message} »
                            </p>
                          </div>

                          {/* Date & Action */}
                          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-cream-muted border-t border-border/40 pt-4 gap-4">
                            <span>Enregistré le : {formatDate(gift.created_at)}</span>
                            <button
                              onClick={() => handleDeleteItem(gift.id, "deleteGift")}
                              className="px-2.5 py-1 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all text-[9px] uppercase font-bold cursor-pointer rounded-sm"
                            >
                              Supprimer Commande Cadeau 🗑
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* 5. TABLEAU NEWSLETTER */}
          {activeTab === "newsletter" && (
            <motion.div
              key="newsletter"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {data.subscribers.length > 0 && (
                <div className="flex justify-end pb-2">
                  <button
                    onClick={handleExportCSV}
                    className="px-4 py-2 border border-gold text-gold text-[10px] uppercase tracking-widest font-semibold hover:bg-gold hover:text-midnight cursor-pointer transition-all rounded-sm flex items-center gap-2"
                  >
                    Exporter la liste (.CSV) 📊
                  </button>
                </div>
              )}

              {data.subscribers.length === 0 ? (
                <p className="text-sm text-cream-muted italic text-center py-16">Aucun abonné premium pour le moment.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-border text-cream-muted uppercase tracking-widest text-[9px]">
                        <th className="py-4 px-4 font-semibold">Email</th>
                        <th className="py-4 px-4 font-semibold">Inscrit le</th>
                        <th className="py-4 px-4 font-semibold text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.subscribers.map((s) => (
                        <tr key={s.id} className="border-b border-border hover:bg-midnight/20 transition-all">
                          <td className="py-4 px-4 text-cream font-mono">{s.email}</td>
                          <td className="py-4 px-4 text-cream-muted">{formatDate(s.created_at)}</td>
                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => handleDeleteSubscriber(s.id)}
                              className="px-2.5 py-1 border border-red-500/20 text-red-400 hover:border-red-500 hover:text-white transition-all text-[9px] uppercase tracking-wider font-semibold cursor-pointer rounded-sm"
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* 6. TABLEAU DES AVIS (TÉMOIGNAGES) */}
          {activeTab === "testimonials" && (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {(!data.testimonials || data.testimonials.length === 0) ? (
                <p className="text-sm text-cream-muted italic text-center py-16">Aucun témoignage déposé par les utilisateurs pour le moment.</p>
              ) : (
                <div className="space-y-4">
                  {data.testimonials.map((t) => (
                    <div
                      key={t.id}
                      className={`border p-6 rounded-sm transition-all duration-300 ${
                        t.approved
                          ? "border-emerald/30 bg-emerald-muted/5"
                          : "border-gold/30 bg-gold-muted/5"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/40 pb-4 mb-4">
                        <div className="space-y-1">
                          <h3 className="font-heading text-xl text-cream font-light">
                            {t.nom}
                            {t.localisation && <span className="text-xs text-cream-muted font-semibold font-body"> — {t.localisation}</span>}
                          </h3>
                          <p className="text-xs text-cream-muted">
                            Catégorie : <span className="text-gold capitalize">{t.categorie}</span> — {t.periode}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border ${
                            t.approved
                              ? "border-emerald/40 text-emerald bg-emerald-muted/10"
                              : "border-gold/40 text-gold bg-gold-muted/10"
                          }`}>
                            {t.approved ? "En Ligne (Approuvé)" : "À Modérer (En attente)"}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4 font-body">
                        <p className="text-xs leading-relaxed text-cream-muted whitespace-pre-line p-4 bg-midnight/30 border border-border/60 rounded-sm italic">
                          « {t.message} »
                        </p>
                        
                        <div className="flex justify-between items-center text-[10px] text-cream-muted pt-2 border-t border-border/20">
                          <span>Soumis le : {formatDate(t.created_at)}</span>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleTestimonialAction(t.id, "deleteTestimonial")}
                              className="px-4 py-2 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-[9px] uppercase tracking-wider font-semibold cursor-pointer transition-all rounded-sm"
                            >
                              Supprimer
                            </button>
                            {!t.approved && (
                              <button
                                onClick={() => handleTestimonialAction(t.id, "approveTestimonial")}
                                className="px-4 py-2 border border-emerald text-emerald hover:bg-emerald hover:text-midnight text-[9px] uppercase tracking-wider font-semibold cursor-pointer transition-all rounded-sm"
                              >
                                Approuver & Publier
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
