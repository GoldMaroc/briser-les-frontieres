"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    
    try {
      const response = await fetch("/api/client/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (response.ok) {
        // Redirection vers le dashboard
        window.location.href = data.redirect || "/espace-client";
      } else {
        setErrorMsg(data.message || "Erreur de connexion.");
        setIsLoading(false);
      }
    } catch (err) {
      setErrorMsg("Impossible de joindre le serveur d'authentification.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-midnight relative flex items-center justify-center overflow-hidden font-body pt-20 pb-12 px-4">
      {/* Gradients de fond prestigieux */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gold/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Box Principale */}
        <div className="bg-surface/40 backdrop-blur-2xl border border-gold/20 p-8 sm:p-12 rounded-sm shadow-2xl relative">
          
          {/* Ligne dorée supérieure */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

          {/* En-tête */}
          <div className="text-center space-y-4 mb-10">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-midnight border border-gold/30 mb-2 shadow-[0_0_30px_rgba(212,175,55,0.15)]"
            >
              <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </motion.div>
            
            <div>
              <span className="text-[10px] tracking-[0.35em] uppercase text-gold font-bold block mb-2">
                Accès Réservé
              </span>
              <h1 className="font-heading text-3xl font-light text-cream">
                Espace Client
              </h1>
            </div>
            
            <p className="text-xs text-cream-muted leading-relaxed">
              Connectez-vous pour accéder à votre programme d'accompagnement, vos invocations et vos ressources exclusives.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 border border-red-500/20 bg-red-500/5 text-red-400 text-xs text-center rounded-sm font-semibold">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-[0.15em] text-cream-muted font-semibold block">
                Adresse E-mail
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-midnight/50 border border-border focus:border-gold/60 p-3.5 text-sm text-cream outline-none rounded-sm transition-all placeholder:text-cream-muted/30"
                placeholder="votre@email.com"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-[0.15em] text-cream-muted font-semibold block">
                  Mot de passe
                </label>
                <button type="button" className="text-[10px] text-gold/80 hover:text-gold hover:underline tracking-wider transition-colors">
                  Oublié ?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-midnight/50 border border-border focus:border-gold/60 p-3.5 pr-12 text-sm text-cream outline-none rounded-sm transition-all placeholder:text-cream-muted/30 tracking-widest"
                  placeholder="••••••••••••"
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

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading || !email || !password}
                variant="primary"
                className="w-full py-4 text-center justify-center flex font-bold tracking-[0.2em] relative overflow-hidden group"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-midnight" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connexion en cours...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">Accéder à mon espace →</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Footer Card */}
          <div className="mt-8 pt-6 border-t border-border/50 text-center">
            <p className="text-[10px] text-cream-muted/60">
              Protégé par cryptage de bout en bout.<br />
              Seuls les membres initiés y ont accès.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
