"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(false);
  
  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId: "protocole" }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erreur de connexion.");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("Erreur système.");
      setLoading(false);
    }
  };

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <main className="w-full bg-[#020202] text-white overflow-hidden selection:bg-white selection:text-black">
      
      {/* ════ HERO SECTION ════ */}
      <section className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 pb-32">
        {/* Glow effect minimaliste */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/40 mb-8 ml-1">
              Ingénierie Spirituelle
            </p>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-bold leading-[0.85] tracking-tighter"
          >
            DOMPTEZ <br />
            <span className="text-white/30">LE NAFS.</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 max-w-2xl"
          >
            <p className="text-lg md:text-xl text-white/50 font-body font-light leading-relaxed">
              Une refonte structurelle de votre esprit pour détruire la procrastination et ancrer une discipline inébranlable.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 flex flex-wrap gap-6"
          >
            <a href="#protocole" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-xs uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden border border-white/20 bg-transparent text-white">
              <span className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full"></span>
              <span className="relative group-hover:text-black">Découvrir le système</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ════ PROTOCOLE (BENTO GRID) ════ */}
      <section id="protocole" className="relative py-32 px-6 md:px-12 lg:px-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto w-full">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tighter">LE PROTOCOLE</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Bento 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="md:col-span-2 glass-panel p-10 flex flex-col justify-between min-h-[400px] relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">01. Origine</span>
              <div className="relative z-10 mt-auto">
                <h3 className="font-heading text-4xl md:text-5xl font-medium tracking-tight mb-4 text-gradient">La Charge Allostatique.</h3>
                <p className="text-white/50 font-light max-w-md text-sm md:text-base">
                  Comprenez la fatigue décisionnelle qui sabote votre volonté et votre prière. Une approche scientifique et spirituelle.
                </p>
              </div>
            </motion.div>

            {/* Bento 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-1 glass-panel p-10 flex flex-col justify-between min-h-[400px] group bg-white text-black hover:bg-white/90 transition-colors"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-bold">02. Action</span>
              <div className="mt-auto">
                <h3 className="font-heading text-3xl font-bold tracking-tighter mb-4">C.O.M.E.S.</h3>
                <p className="text-black/60 font-medium text-sm">
                  30 Jours de chirurgie comportementale pour restaurer la concentration.
                </p>
              </div>
            </motion.div>

            {/* Bento 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:col-span-3 glass-panel p-10 md:p-16 flex flex-col md:flex-row items-start md:items-end justify-between min-h-[300px] relative overflow-hidden group"
            >
               <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
               <div className="relative z-10">
                 <h4 className="font-heading text-6xl md:text-8xl font-bold text-white tracking-tighter">43+</h4>
                 <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold block mt-4">Vies Transformées</span>
               </div>
               <div className="relative z-10 mt-10 md:mt-0 md:text-right">
                 <span className="text-2xl md:text-4xl font-heading font-light tracking-tight text-white/60">Rejoignez la ligne de front.</span>
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ════ CONTACT / CHECKOUT ════ */}
      <section className="relative py-32 px-6 md:px-12 lg:px-24 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold mb-6 block">Accès Privé</span>
            <h2 className="font-heading text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter mb-8">
              ENTREZ DANS <br/> LA MATRICE.
            </h2>
            <p className="text-white/40 font-body font-light text-base md:text-lg leading-relaxed max-w-md">
              L'accompagnement de 9 mois est strictement réservé à ceux qui veulent détruire leur ancienne version. Pas de compromis.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel p-10 md:p-14 relative"
          >
            <div className="flex flex-col items-start space-y-8">
              <div className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-full text-white/60">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              
              <div>
                <h3 className="font-heading text-3xl font-medium tracking-tight mb-2">Accès au Protocole</h3>
                <p className="text-sm text-white/40 font-light max-w-xs leading-relaxed">
                  Paiement unique et sécurisé. Accès immédiat à l'espace membre.
                </p>
              </div>

              <button 
                onClick={handleStripeCheckout} 
                disabled={loading} 
                className="w-full group relative inline-flex items-center justify-center px-8 py-5 font-bold text-xs uppercase tracking-[0.2em] bg-white text-black transition-all duration-300 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
              >
                {loading ? "Chiffrement..." : "Sécuriser mon accès (97€)"}
              </button>
            </div>
          </motion.div>

        </div>
      </section>

    </main>
  );
}

