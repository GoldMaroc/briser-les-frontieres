"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";

type TabType = "accueil" | "programme" | "support" | "commandes" | "profil" | "allie";

export default function EspaceClient() {
  const [activeTab, setActiveTab] = useState<TabType>("accueil");

  // Fausses données pour la présentation visuelle
  const mockUser = {
    prenom: "Mounir",
    genre: "homme", // ou "femme"
    prochainRdv: "Mardi 14 Juin - 18h00",
    progression: 35,
  };

  const menuItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: "accueil",
      label: "Vue d'ensemble",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: "programme",
      label: "Mon Programme",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: "allie",
      label: "Trouver un(e) Allié(e)",
      icon: (
        <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: "support",
      label: "Accompagnement",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      id: "commandes",
      label: "Mes Achats",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      id: "profil",
      label: "Profil & Sécurité",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-midnight font-body flex flex-col md:flex-row">
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-72 bg-surface/50 border-r border-border backdrop-blur-md flex flex-col">
        {/* Logo Area */}
        <div className="p-8 border-b border-border/50 text-center">
          <div className="text-[10px] tracking-[0.3em] uppercase text-gold font-bold mb-1">
            Accès Client
          </div>
          <h2 className="font-heading text-xl text-cream font-light tracking-wide">
            Briser Les Frontières
          </h2>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-sm transition-all text-sm tracking-widest ${
                activeTab === item.id
                  ? "bg-gold/10 text-gold border border-gold/20"
                  : "text-cream-muted hover:bg-surface hover:text-cream border border-transparent"
              }`}
            >
              {item.icon}
              {item.label}
              {item.id === "allie" && (
                <span className="ml-auto w-2 h-2 rounded-full bg-gold animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        {/* User Mini Profile & Logout */}
        <div className="p-4 border-t border-border/50">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-400/10 rounded-sm transition-colors tracking-widest">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 h-screen overflow-y-auto p-6 md:p-12 relative">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {activeTab === "accueil" && (
            <motion.div
              key="accueil"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <header className="space-y-2 mb-12">
                <h1 className="text-4xl font-heading font-light text-cream">
                  Bienvenue, {mockUser.prenom}
                </h1>
                <p className="text-cream-muted text-sm tracking-wide">
                  Heureux de vous revoir sur le chemin de la purification.
                </p>
              </header>

              {/* Prochain RDV Card */}
              <div className="bg-surface/40 border border-gold/20 p-8 rounded-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-gold font-bold block mb-2">
                      Prochain appel avec Mounir
                    </span>
                    <div className="text-2xl text-cream font-light mb-1">
                      {mockUser.prochainRdv}
                    </div>
                    <p className="text-sm text-cream-muted">
                      Préparez vos questions et assurez-vous d&apos;être dans un endroit calme.
                    </p>
                  </div>
                  <Button variant="primary" className="shrink-0">
                    Lien Visio (Zoom)
                  </Button>
                </div>
              </div>

              {/* Mot du Coach */}
              <div className="bg-surface/30 border border-border p-8 rounded-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                    M
                  </div>
                  <div>
                    <h3 className="text-cream font-bold text-sm tracking-widest">LE MOT DU COACH</h3>
                    <p className="text-[10px] text-cream-muted uppercase tracking-widest">Message épinglé</p>
                  </div>
                </div>
                <p className="text-cream-muted text-sm leading-relaxed italic">
                  &quot;N&apos;oubliez pas que la constance est la clé de tout succès spirituel. Ne sous-estimez jamais les petites actions faites chaque jour avec une intention pure. Je suis fier de vos avancées, continuez ainsi.&quot;
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === "programme" && (
            <motion.div
              key="programme"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <header className="space-y-2 mb-8">
                <h1 className="text-3xl font-heading font-light text-cream">
                  Programme Quotidien
                </h1>
                <p className="text-cream-muted text-sm tracking-wide">
                  Vos pratiques assignées. Cochez-les pour valider votre journée.
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Carte Pratique 1 */}
                <div className="bg-surface/40 border border-border hover:border-gold/30 p-6 rounded-sm transition-all flex flex-col h-full group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-bold bg-emerald-400/10 px-2 py-1 rounded-sm">
                      Matin & Soir
                    </span>
                    <button className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="text-xl text-cream font-heading mb-2">Les 3 Protectrices</h3>
                  <p className="text-sm text-cream-muted mb-6 flex-1">
                    Sourates Al-Ikhlas, Al-Falaq, An-Nas. À réciter 3 fois chacune après le Fajr et le Maghrib.
                  </p>
                  <button className="text-[10px] uppercase tracking-widest text-gold hover:underline self-start">
                    Lire le détail & Phonétique →
                  </button>
                </div>

                {/* Carte Pratique 2 */}
                <div className="bg-surface/40 border border-border hover:border-gold/30 p-6 rounded-sm transition-all flex flex-col h-full group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-blue-400 font-bold bg-blue-400/10 px-2 py-1 rounded-sm">
                      Méditation (10min)
                    </span>
                    <button className="w-6 h-6 rounded-full bg-gold text-midnight flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="text-xl text-cream font-heading mb-2">Exercice de Respiration & Muraqabah</h3>
                  <p className="text-sm text-cream-muted mb-6 flex-1">
                    Prendre conscience de la présence divine. Nettoyer son cœur des rancœurs du jour.
                  </p>
                  <button className="text-[10px] uppercase tracking-widest text-gold hover:underline self-start">
                    Écouter l&apos;audio guide →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "allie" && (
            <motion.div
              key="allie"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-surface/40 border border-gold/30 p-8 md:p-12 rounded-sm text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
                
                <div className="w-20 h-20 mx-auto bg-midnight border border-gold/50 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                  <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>

                <h1 className="text-3xl font-heading font-light text-cream mb-4">
                  Trouver {mockUser.genre === "homme" ? "un Frère" : "une Sœur"} (Allié)
                </h1>
                
                <p className="text-sm text-cream-muted leading-relaxed max-w-xl mx-auto mb-10">
                  L&apos;isolement est la plus grande arme de l&apos;ego (Nafs). Le système d&apos;intelligence artificielle de Briser les Frontières calcule la proximité géographique entre nos membres. <br/><br/>
                  <span className="text-gold">Règle stricte :</span> Un frère pour un frère, une sœur pour une sœur. La mise en relation finale est approuvée manuellement par Mounir.
                </p>

                <div className="space-y-8 bg-midnight/50 p-6 border border-border rounded-sm">
                  
                  <div className="text-left space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-cream-muted font-bold block">
                      Ma recherche
                    </label>
                    <div className="flex flex-col md:flex-row gap-4">
                      <label className="flex-1 flex items-center gap-3 p-4 border border-gold/40 bg-gold/5 rounded-sm cursor-pointer">
                        <input type="radio" name="recherche" className="accent-gold" defaultChecked />
                        <span className="text-sm text-cream font-medium tracking-wide">Une personne (Binôme)</span>
                      </label>
                      <label className="flex-1 flex items-center gap-3 p-4 border border-border bg-surface/30 rounded-sm cursor-pointer hover:border-gold/40 transition-colors">
                        <input type="radio" name="recherche" className="accent-gold" />
                        <span className="text-sm text-cream font-medium tracking-wide">Un groupe (Cercle)</span>
                      </label>
                    </div>
                  </div>

                  <div className="text-left space-y-4">
                    <label className="text-[10px] uppercase tracking-[0.15em] text-cream-muted font-bold block">
                      Rayon géographique acceptable
                    </label>
                    <input type="range" min="5" max="200" defaultValue="50" className="w-full accent-gold h-1 bg-surface rounded-lg appearance-none cursor-pointer" />
                    <div className="flex justify-between text-xs text-cream-muted">
                      <span>5 km</span>
                      <span className="text-gold font-bold">50 km</span>
                      <span>France entière</span>
                    </div>
                  </div>

                  <Button variant="primary" className="w-full py-4 text-center justify-center font-bold tracking-[0.2em]">
                    SOUMETTRE MA DEMANDE À L&apos;IA
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "profil" && (
            <motion.div
              key="profil"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl mx-auto space-y-8"
            >
               <header className="space-y-2 mb-8">
                <h1 className="text-3xl font-heading font-light text-cream">
                  Profil & Sécurité
                </h1>
                <p className="text-cream-muted text-sm tracking-wide">
                  Gérez vos informations personnelles et votre mot de passe.
                </p>
              </header>

              <div className="bg-surface/40 border border-border p-8 rounded-sm space-y-6">
                 <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.15em] text-cream-muted font-semibold block">Nouveau Mot de passe</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-midnight/50 border border-border focus:border-gold/60 p-3.5 text-sm text-cream outline-none rounded-sm transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-[0.15em] text-cream-muted font-semibold block">Confirmer le Mot de passe</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-midnight/50 border border-border focus:border-gold/60 p-3.5 text-sm text-cream outline-none rounded-sm transition-all" />
                </div>
                <Button variant="ghost" className="w-full justify-center">Mettre à jour la sécurité</Button>
              </div>
            </motion.div>
          )}

          {/* Fallback for other tabs not completely styled yet */}
          {(activeTab === "support" || activeTab === "commandes") && (
            <motion.div
              key="others"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-cream-muted space-y-4"
            >
              <svg className="w-16 h-16 text-border" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <p className="text-sm tracking-widest uppercase">Module en cours de développement</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
