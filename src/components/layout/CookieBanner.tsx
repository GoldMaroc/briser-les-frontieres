"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const consent = localStorage.getItem("blf_cookies_consent");
    if (!consent) {
      // Afficher le bandeau après 1.5 seconde
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("blf_cookies_consent", "accepted");
    setVisible(false);
  };

  const handleRefuse = () => {
    localStorage.setItem("blf_cookies_consent", "refused");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50 p-6 bg-midnight-light/95 backdrop-blur-xl border border-gold/30 rounded-sm shadow-[0_15px_40px_rgba(0,0,0,0.5)] font-body"
        >
          {/* Ligne supérieure dorée */}
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-bold">
                Gestion de la Confidentialité
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
            </div>
            
            <h3 className="font-heading text-lg font-light text-cream">
              Souveraineté des Données
            </h3>
            
            <p className="text-[11px] text-cream-muted leading-relaxed">
              En poursuivant votre navigation, vous acceptez l&apos;activation de traceurs techniques strictement nécessaires au bon fonctionnement de l&apos;audit cognitif ainsi qu&apos;à la sécurisation et au chiffrement de vos coordonnées. Vous pouvez consentir ou refuser leur activation.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <div className="flex gap-3">
                <button
                  onClick={handleRefuse}
                  className="w-1/2 py-2.5 bg-transparent border border-cream-muted/30 text-cream-muted text-[10px] uppercase tracking-[0.15em] font-semibold hover:border-cream-muted/60 hover:text-cream transition-all rounded-sm cursor-pointer text-center"
                >
                  Refuser ✕
                </button>
                <button
                  onClick={handleAccept}
                  className="w-1/2 py-2.5 bg-gold text-midnight text-[10px] uppercase tracking-[0.15em] font-bold hover:bg-gold-light transition-all rounded-sm cursor-pointer shadow-lg shadow-gold/5 text-center"
                >
                  Accepter ✓
                </button>
              </div>
              <a
                href="/conditions-generales"
                className="text-center text-[10px] text-gold hover:text-gold-light hover:underline uppercase tracking-widest block pt-1 font-semibold"
              >
                Voir les Conditions Générales
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
