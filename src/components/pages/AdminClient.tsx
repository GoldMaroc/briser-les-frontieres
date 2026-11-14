"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import PlanningSocialClient from "./PlanningSocialClient";

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
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

type TabType = "candidatures" | "audits" | "messages" | "gifts" | "newsletter" | "testimonials" | "planning" | "planning_linkedin_perso" | "planning_linkedin_page" | "planning_X" | "planning_tiktok" | "planning_instagram" | "planning_facebook";

export default function AdminClient() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loginStep, setLoginStep] = useState<1 | 2>(1); // 1 = main password, 2 = OTP double factor
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes en secondes (300s)
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

  // States for Popups (Voir en grand)
  const [popupMsg, setPopupMsg] = useState<ContactMessage | null>(null);
  const [popupCand, setPopupCand] = useState<Candidature | null>(null);

  // Vérifier au montage si l'administrateur a déjà une session active (via le cookie HTTP-Only)
  useEffect(() => {
    const checkActiveSession = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/admin/data", { method: "GET" });
        if (response.ok) {
          const resData = await response.json();
          setData(resData.data);
          setIsAuthenticated(true);
          
          // Récupérer le mot de passe mémorisé pour compatibilité d'affichage locale
          const savedPassword = localStorage.getItem("blf_admin_password");
          if (savedPassword) {
            setPassword(savedPassword);
          }
        } else {
          // Si pas de session valide, nettoyer le local storage pour forcer une nouvelle double auth
          localStorage.removeItem("blf_admin_password");
        }
      } catch (err) {
        console.warn("Échec de la détection de session active.");
      } finally {
        setIsLoading(false);
      }
    };
    checkActiveSession();
  }, []);

  // Compte à rebours de 5 minutes (300s) pour la validité de l'OTP
  useEffect(() => {
    if (loginStep !== 2) return;
    
    setTimeLeft(300); // Réinitialiser le compteur à 5 minutes
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setErrorMsg("Le code OTP de sécurité a expiré. Veuillez générer un nouveau code.");
          setLoginStep(1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [loginStep]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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

  const handleLogout = async () => {
    localStorage.removeItem("blf_admin_password");
    setIsAuthenticated(false);
    setLoginStep(1);
    setPassword("");
    setOtpCode("");
    setData({ subscribers: [], candidatures: [], audits: [], testimonials: [], contacts: [], gifts: [] });
    
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (err) {
      console.warn("Échec de la révocation réseau de la session.");
    }
  };

  const handleCandidatureAction = async (id: string, status: "approved" | "rejected") => {
    setErrorMsg("");
    setSuccessMsg("");

    let reason = "";
    if (status === "rejected") {
      const inputReason = prompt("Veuillez saisir le motif de refus de la candidature (ce motif sera envoyé par e-mail au candidat) :");
      if (inputReason === null) return; // Annulé par l'administrateur
      if (!inputReason.trim()) {
        alert("Le motif de refus est obligatoire pour rejeter une candidature.");
        return;
      }
      reason = inputReason.trim();
    }

    try {
      const response = await fetch("/api/admin/action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": password
        },
        body: JSON.stringify({ action: "updateCandidature", id, status, reason })
      });

      const resData = await response.json();
      if (response.ok) {
        setSuccessMsg(resData.message);
        setData((prev) => ({
          ...prev,
          candidatures: prev.candidatures.map((c) => (c.id === id ? { ...c, status } : c))
        }));
      } else {
        if (response.status === 401) {
          await handleLogout();
          setErrorMsg("Votre session administrative a expiré. Veuillez vous reconnecter.");
        } else {
          setErrorMsg(resData.message || "Échec de la mise à jour.");
        }
      }
    } catch (err) {
      setErrorMsg("Erreur lors de l'enregistrement de l'action.");
    }
  };

  const handleGiftAction = async (id: string, status: "approved" | "rejected") => {
    setErrorMsg("");
    setSuccessMsg("");

    let reason = "";
    if (status === "rejected") {
      const inputReason = prompt("Veuillez saisir le motif de refus du cadeau (ce motif sera envoyé par e-mail au donateur) :");
      if (inputReason === null) return; // Annulé par l'administrateur
      if (!inputReason.trim()) {
        alert("Le motif de refus est obligatoire pour rejeter un cadeau.");
        return;
      }
      reason = inputReason.trim();
    }

    try {
      const response = await fetch("/api/admin/action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Password": password
        },
        body: JSON.stringify({ action: "updateGift", id, status, reason })
      });

      const resData = await response.json();
      if (response.ok) {
        setSuccessMsg(resData.message);
        setData((prev) => ({
          ...prev,
          gifts: prev.gifts.map((g) => (g.id === id ? { ...g, status } : g))
        }));
      } else {
        if (response.status === 401) {
          await handleLogout();
          setErrorMsg("Votre session administrative a expiré. Veuillez vous reconnecter.");
        } else {
          setErrorMsg(resData.message || "Échec de la mise à jour.");
        }
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
        if (response.status === 401) {
          await handleLogout();
          setErrorMsg("Votre session administrative a expiré. Veuillez vous reconnecter.");
        } else {
          setErrorMsg(resData.message || "Échec de la suppression.");
        }
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
        if (response.status === 401) {
          await handleLogout();
          setErrorMsg("Votre session administrative a expiré. Veuillez vous reconnecter.");
        } else {
          setErrorMsg(resData.message || "Échec de la suppression.");
        }
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
        if (response.status === 401) {
          await handleLogout();
          setErrorMsg("Votre session administrative a expiré. Veuillez vous reconnecter.");
        } else {
          setErrorMsg(resData.message || "Échec de l'action sur le témoignage.");
        }
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-midnight border border-border focus:border-gold p-3.5 pr-12 text-sm text-cream outline-none rounded-sm transition-colors text-center tracking-widest"
                  placeholder="••••••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-muted hover:text-gold transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.29 3.29m0 0a10.05 10.05 0 015.71-1.581c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.564 3.029l-.002.002" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
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
              
              {/* Compteur temps restant luxueux */}
              <div className="text-center py-2 bg-midnight/30 rounded-sm border border-border/10 my-2">
                <span className="text-[9px] uppercase tracking-[0.2em] text-cream-muted block mb-0.5">Temps restant</span>
                <span className={`text-xl font-mono font-bold tracking-wider ${timeLeft < 60 ? "text-red-400 animate-pulse" : "text-gold"}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>

              <input
                type="text"
                required
                maxLength={9}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase())}
                className="w-full bg-midnight border border-border focus:border-gold p-3.5 text-2xl text-gold outline-none rounded-sm transition-colors text-center tracking-[0.2em] font-mono"
                placeholder="•••••••••"
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
                disabled={isLoading || otpCode.length !== 9}
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
    <div className="flex flex-col flex-1 gap-6 font-body h-full min-h-0">
      
      {/* Header Admin */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-border pb-4 gap-4 shrink-0">
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

      {/* Navigation Mobile Rapide : Visible uniquement sur smartphone */}
      <div className="md:hidden flex flex-col gap-3 bg-surface/50 p-3.5 border border-gold/30 rounded-sm shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-gold font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
            Menu Rapide Mobile
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 font-semibold">
            {activeTab === "planning_instagram" ? "📸 Instagram" : 
             activeTab === "planning_facebook" ? "📘 Facebook" : 
             activeTab === "planning_linkedin_perso" ? "💼 LinkedIn (Mounir)" :
             activeTab === "planning_linkedin_page" ? "🏢 LinkedIn (Page)" :
             activeTab === "planning_X" ? "𝕏 Twitter" :
             activeTab === "candidatures" ? "📋 Candidatures" :
             activeTab === "audits" ? "🔍 Audits" :
             activeTab === "messages" ? "✉️ Messages" :
             activeTab === "gifts" ? "🎁 Cadeaux" :
             activeTab === "newsletter" ? "📰 Newsletter" :
             activeTab === "testimonials" ? "⭐ Avis" : activeTab}
          </span>
        </div>

        {/* Sélecteur déroulant complet */}
        <select
          value={activeTab}
          onChange={(e) => {
            if (e.target.value === "link_tiktok") {
              window.location.href = "/admin/social/tiktok";
            } else {
              setActiveTab(e.target.value as TabType);
              setSuccessMsg("");
              setErrorMsg("");
            }
          }}
          className="w-full bg-midnight border border-gold/40 text-cream p-3 rounded-sm text-xs font-semibold focus:outline-none focus:border-gold"
        >
          <optgroup label="Usines à Contenu (IA)">
            <option value="planning_instagram">📸 Agent Instagram (Stratégie & Publications)</option>
            <option value="planning_facebook">📘 Agent Facebook</option>
            <option value="planning_linkedin_perso">💼 Agent LinkedIn (Mounir)</option>
            <option value="planning_linkedin_page">🏢 Agent LinkedIn (Page BLF)</option>
            <option value="planning_X">𝕏 Agent X (Twitter)</option>
            <option value="link_tiktok">🎬 TikTok Studio (IA) ↗</option>
          </optgroup>
          <optgroup label="Relationnel & Ventes">
            <option value="candidatures">📋 Candidatures ({data.candidatures.length})</option>
            <option value="audits">🔍 Audits ({data.audits.length})</option>
            <option value="messages">✉️ Messages ({data.contacts?.length || 0})</option>
            <option value="gifts">🎁 Cadeaux ({data.gifts?.length || 0})</option>
          </optgroup>
          <optgroup label="Marketing & Réputation">
            <option value="newsletter">📰 Newsletter ({data.subscribers.length})</option>
            <option value="testimonials">⭐ Avis Modération ({data.testimonials.length})</option>
          </optgroup>
        </select>

        {/* Défilement horizontal des boutons réseaux sociaux */}
        <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {[
            { key: "planning_instagram", label: "📸 Instagram", highlight: true },
            { key: "planning_facebook", label: "📘 Facebook", highlight: true },
            { key: "planning_linkedin_perso", label: "💼 LinkedIn Mounir" },
            { key: "planning_linkedin_page", label: "🏢 LinkedIn Page" },
            { key: "planning_X", label: "𝕏 Twitter" },
            { key: "link_tiktok", label: "🎬 TikTok Studio ↗", isLink: "/admin/social/tiktok" },
            { key: "candidatures", label: `Candidatures (${data.candidatures.length})` },
            { key: "audits", label: `Audits (${data.audits.length})` },
            { key: "messages", label: `Messages (${data.contacts?.length || 0})` },
          ].map(tab => {
            if ("isLink" in tab && tab.isLink) {
              return (
                <a
                  key={tab.key}
                  href={tab.isLink}
                  className="shrink-0 px-3 py-1.5 text-xs font-semibold rounded-full border border-gold/40 bg-gold/10 text-gold flex items-center gap-1"
                >
                  {tab.label}
                </a>
              );
            }
            const isSelected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => { setActiveTab(tab.key as TabType); setSuccessMsg(""); setErrorMsg(""); }}
                className={`shrink-0 px-3 py-1.5 text-xs font-semibold rounded-full transition-all border ${
                  isSelected
                    ? "bg-gold text-midnight font-bold border-gold shadow-md"
                    : tab.highlight
                    ? "bg-gold/10 text-gold border-gold/30 hover:bg-gold/20"
                    : "bg-surface border-border text-cream-muted hover:text-cream"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Layout Principal: Sidebar à gauche (desktop), Contenu à droite */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        
        {/* SIDEBAR DE NAVIGATION (affichée en colonne sur desktop, ou repliable sur mobile) */}
        <div className="hidden md:flex w-full md:w-64 shrink-0 flex-col gap-6 bg-surface/30 p-4 border border-border rounded-sm overflow-y-auto custom-scrollbar">
        {[
          {
            title: "Relationnel & Ventes",
            items: [
              { key: "candidatures", label: `Candidatures`, count: data.candidatures.length },
              { key: "audits", label: `Audits`, count: data.audits.length },
              { key: "messages", label: `Messages`, count: data.contacts?.length || 0 },
              { key: "gifts", label: `Cadeaux`, count: data.gifts?.length || 0 },
            ]
          },
          {
            title: "Marketing & Réputation",
            items: [
              { key: "newsletter", label: `Newsletter`, count: data.subscribers.length },
              { key: "testimonials", label: `Avis Modération`, count: data.testimonials.length },
            ]
          },
          {
            title: "Usines à Contenu (IA)",
            items: [
              { key: "link_tiktok", label: `TikTok Studio (IA)`, count: null, isLink: "/admin/social/tiktok" },
              { key: "planning_linkedin_perso", label: `Agent LinkedIn (Mounir)`, count: null },
              { key: "planning_linkedin_page", label: `Agent LinkedIn (Page)`, count: null },
              { key: "planning_X", label: `Agent X (Twitter)`, count: null },
              { key: "planning_instagram", label: `Agent Instagram`, count: null },
              { key: "planning_facebook", label: `Agent Facebook`, count: null }
            ]
          }
        ].map((group, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <span className="text-[9px] uppercase tracking-widest text-cream-muted/50 font-bold ml-1 mb-1">
              {group.title}
            </span>
            {group.items.map((tab) => {
              if ("isLink" in tab && tab.isLink) {
                return (
                  <a
                    key={tab.key}
                    href={tab.isLink}
                    className="py-3 px-4 text-xs font-semibold cursor-pointer rounded-sm transition-all flex justify-between items-center bg-gold/10 text-gold border border-gold/30 hover:bg-gold/20"
                  >
                    <span>{tab.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/20 text-gold">↗</span>
                  </a>
                );
              }
              return (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key as TabType); setSuccessMsg(""); setErrorMsg(""); }}
                className={`py-3 px-4 text-xs font-semibold cursor-pointer rounded-sm transition-all flex justify-between items-center ${
                  activeTab === tab.key
                    ? "bg-gold/10 text-gold border border-gold/30"
                    : "text-cream-muted hover:text-cream hover:bg-surface"
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === tab.key ? 'bg-gold/20 text-gold' : 'bg-surface-alt text-cream-muted'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            )})}
          </div>
        ))}
        </div>

      {/* CONTENU ONGLETS */}
      <div className="flex-1 min-w-0 bg-midnight-light border border-border p-6 rounded-sm overflow-y-auto custom-scrollbar relative">
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
                            onClick={() => setPopupCand(c)}
                            className="px-3 py-1.5 border border-gold/50 text-gold text-[9px] uppercase tracking-widest font-bold hover:bg-gold/10 cursor-pointer rounded-sm ml-2 flex items-center gap-2"
                          >
                            <span>Ouvrir en Pop-up</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
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
              <div className="flex justify-end mb-4">
                <a href="/api/admin/data/export?type=contacts" className="text-xs font-bold px-4 py-2 border border-gold/50 text-gold hover:bg-gold/10 rounded-sm transition">
                  ⬇️ TÉLÉCHARGER EN CSV
                </a>
              </div>
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
                            onClick={() => setPopupMsg(contact)}
                            className="px-3 py-1.5 border border-gold/50 text-gold text-[9px] uppercase tracking-widest font-bold hover:bg-gold/10 cursor-pointer rounded-sm flex items-center gap-2"
                          >
                            <span>Ouvrir en Pop-up</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
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
                    <div
                      key={gift.id}
                      className={`border p-6 rounded-sm transition-all duration-300 ${
                        gift.status === "approved"
                          ? "border-emerald/30 bg-emerald-muted/5"
                          : gift.status === "rejected"
                          ? "border-border bg-midnight/20"
                          : "border-gold/30 bg-gold-muted/5"
                      }`}
                    >
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
                          <span className={`text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border ${
                            gift.status === "approved"
                              ? "border-emerald/40 text-emerald bg-emerald-muted/10"
                              : gift.status === "rejected"
                              ? "border-border/60 text-cream-muted bg-midnight/35"
                              : "border-gold/40 text-gold bg-gold-muted/10"
                          }`}>
                            {gift.status === "approved" ? "Approuvé" : gift.status === "rejected" ? "Refusé" : "En attente"}
                          </span>
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

                          {/* Actions de modération du cadeau */}
                          {gift.status === "pending" && (
                            <div className="flex justify-end gap-3 pt-4">
                              <button
                                onClick={() => handleGiftAction(gift.id, "rejected")}
                                className="px-5 py-2 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-[10px] uppercase tracking-wider font-semibold cursor-pointer transition-all rounded-sm"
                              >
                                Rejeter la Prestation
                              </button>
                              <button
                                onClick={() => handleGiftAction(gift.id, "approved")}
                                className="px-5 py-2 border border-emerald text-emerald hover:bg-emerald hover:text-midnight text-[10px] uppercase tracking-wider font-semibold cursor-pointer transition-all rounded-sm"
                              >
                                Approuver la Prestation
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

          {activeTab.startsWith("planning") && (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <PlanningSocialClient lockedPlatform={activeTab === "planning" ? undefined : activeTab.replace("planning_", "")} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* --- POP-UP DES CANDIDATURES --- */}
      <AnimatePresence>
        {popupCand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-midnight-light border border-gold/30 p-8 rounded-sm shadow-2xl max-w-4xl w-full relative max-h-[90vh] overflow-y-auto"
            >
              {/* Bouton de fermeture */}
              <button
                onClick={() => setPopupCand(null)}
                className="absolute top-6 right-6 text-cream-muted hover:text-red-400 transition-colors"
              >
                ✕ Fermer
              </button>

              <h2 className="font-heading text-3xl font-light text-cream mb-6">
                Candidature de <span className="text-gold font-semibold">{popupCand.prenom} {popupCand.nom}</span>
              </h2>

              <div className="space-y-8 font-body">
                {/* Motivation en évidence */}
                <div className="bg-midnight border border-border p-6 rounded-sm">
                  <h3 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4">Motivation & Objectifs</h3>
                  <p className="text-sm leading-relaxed text-cream whitespace-pre-line italic">
                    « {popupCand.motivation} »
                  </p>
                </div>

                {/* Diagnostics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-midnight/50 border border-border rounded-sm">
                    <span className="text-[9px] uppercase text-cream-muted block mb-2">Fatigue Décisionnelle</span>
                    <strong className="text-sm text-cream uppercase">{popupCand.fatigueDecisionnelle}</strong>
                  </div>
                  <div className="p-4 bg-midnight/50 border border-border rounded-sm">
                    <span className="text-[9px] uppercase text-cream-muted block mb-2">Charge Allostatique</span>
                    <strong className="text-sm text-cream uppercase">{popupCand.chargeAllostatique}</strong>
                  </div>
                  <div className="p-4 bg-midnight/50 border border-border rounded-sm">
                    <span className="text-[9px] uppercase text-cream-muted block mb-2">Impact sur la Salat</span>
                    <strong className="text-sm text-cream uppercase">{popupCand.salatImpact}</strong>
                  </div>
                </div>

                {/* Coordonnées */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs leading-relaxed border-t border-border/40 pt-6">
                  <p><strong className="text-emerald uppercase tracking-widest text-[9px] block mb-1">E-mail</strong> <a href={`mailto:${popupCand.email}`} className="text-gold underline text-sm">{popupCand.email}</a></p>
                  <p><strong className="text-emerald uppercase tracking-widest text-[9px] block mb-1">Téléphone</strong> <span className="text-sm text-cream">{popupCand.telephone || "Non renseigné"}</span></p>
                  <p><strong className="text-emerald uppercase tracking-widest text-[9px] block mb-1">Localité</strong> <span className="text-sm text-cream">{popupCand.codePostal || ""} {popupCand.ville || popupCand.localisation || "Non fournie"}</span></p>
                  <p className="sm:col-span-2 md:col-span-3"><strong className="text-emerald uppercase tracking-widest text-[9px] block mb-1">Adresse physique</strong> <span className="text-sm text-cream">{popupCand.adresse || "Non fournie"}</span></p>
                </div>

                {/* Actions */}
                {popupCand.status === "pending" && (
                  <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-border/40">
                    <button
                      onClick={() => { handleCandidatureAction(popupCand.id, "rejected"); setPopupCand(null); }}
                      className="px-6 py-3 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-xs uppercase tracking-wider font-semibold cursor-pointer transition-all rounded-sm"
                    >
                      Rejeter
                    </button>
                    <button
                      onClick={() => { handleCandidatureAction(popupCand.id, "approved"); setPopupCand(null); }}
                      className="px-6 py-3 border border-emerald text-emerald hover:bg-emerald hover:text-midnight text-xs uppercase tracking-wider font-semibold cursor-pointer transition-all rounded-sm"
                    >
                      Approuver le candidat
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- POP-UP DES MESSAGES DE CONTACT --- */}
      <AnimatePresence>
        {popupMsg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/80 backdrop-blur-sm overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-midnight-light border border-gold/30 p-8 rounded-sm shadow-2xl max-w-4xl w-full relative max-h-[90vh] overflow-y-auto"
            >
              {/* Bouton de fermeture */}
              <button
                onClick={() => setPopupMsg(null)}
                className="absolute top-6 right-6 text-cream-muted hover:text-red-400 transition-colors"
              >
                ✕ Fermer
              </button>

              <div className="mb-6 space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-emerald font-bold bg-emerald-muted/10 border border-emerald/20 px-3 py-1 rounded">
                  Sujet : {popupMsg.typeRelation}
                </span>
                <h2 className="font-heading text-3xl font-light text-cream mt-4">
                  Message de <span className="text-gold font-semibold">{popupMsg.prenom} {popupMsg.nom}</span>
                </h2>
              </div>

              <div className="space-y-8 font-body">
                {/* Le Message */}
                <div className="bg-midnight border border-border p-6 rounded-sm">
                  <h3 className="text-[10px] uppercase tracking-widest text-gold font-bold mb-4">Message Complet</h3>
                  <p className="text-lg leading-relaxed text-cream whitespace-pre-line">
                    « {popupMsg.message} »
                  </p>
                </div>

                {/* Formules demandées */}
                {(popupMsg.formuleAccompagnement !== "aucune" || popupMsg.livreSelection !== "aucun") && (
                  <div className="flex flex-wrap gap-4">
                    {popupMsg.formuleAccompagnement && popupMsg.formuleAccompagnement !== "aucune" && (
                      <span className="px-4 py-2 bg-emerald/10 border border-emerald/30 text-emerald rounded text-xs uppercase font-bold">Intérêt Accompagnement : {popupMsg.formuleAccompagnement}</span>
                    )}
                    {popupMsg.livreSelection && popupMsg.livreSelection !== "aucun" && (
                      <span className="px-4 py-2 bg-gold/10 border border-gold/30 text-gold rounded text-xs uppercase font-bold">Livre Sélectionné : {popupMsg.livreSelection}</span>
                    )}
                  </div>
                )}

                {/* Coordonnées */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs leading-relaxed border-t border-border/40 pt-6">
                  <p><strong className="text-emerald uppercase tracking-widest text-[9px] block mb-1">E-mail</strong> <a href={`mailto:${popupMsg.email}`} className="text-gold underline text-sm">{popupMsg.email}</a></p>
                  <p><strong className="text-emerald uppercase tracking-widest text-[9px] block mb-1">Téléphone</strong> <span className="text-sm text-cream">{popupMsg.telephone || "Non renseigné"}</span></p>
                  <p><strong className="text-emerald uppercase tracking-widest text-[9px] block mb-1">Localité</strong> <span className="text-sm text-cream">{popupMsg.codePostal || ""} {popupMsg.ville || "Non fournie"}</span></p>
                  <p className="sm:col-span-2 md:col-span-3"><strong className="text-emerald uppercase tracking-widest text-[9px] block mb-1">Adresse physique</strong> <span className="text-sm text-cream">{popupMsg.adresse || "Non fournie"}</span></p>
                </div>

                {/* Actions */}
                <div className="flex justify-end mt-8 pt-6 border-t border-border/40">
                  <button
                    onClick={() => { handleDeleteItem(popupMsg.id, "deleteContact"); setPopupMsg(null); }}
                    className="px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-xs uppercase tracking-wider font-semibold cursor-pointer transition-all rounded-sm"
                  >
                    Supprimer ce message 🗑
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      </div>
    </div>
  );
}
