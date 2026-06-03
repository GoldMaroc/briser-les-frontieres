"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { useTimeTheme } from "@/components/ui/TimeThemeProvider";
import { testimonials, Testimonial } from "@/lib/testimonials";


export default function Home() {
  const {
    activeTheme,
    setActiveTheme,
    isFocusMode,
    setIsFocusMode,
    isAudioPlaying,
    setIsAudioPlaying,
    nextPrayer,
    locationName,
    setManualOverride
  } = useTimeTheme();

  // États pour les témoignages interactifs (43 avis + avis dynamiques approuvés)
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>(testimonials);
  const [activeTab, setActiveTab] = useState<'homme' | 'femme' | 'famille' | 'groupe'>("homme");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentTestimonialPage, setCurrentTestimonialPage] = useState(1);

  // Réinitialiser la page quand on change d'onglet
  useEffect(() => {
    setCurrentTestimonialPage(1);
  }, [activeTab]);

  // États pour laisser un avis
  const [revNom, setRevNom] = useState("");
  const [revLocalisation, setRevLocalisation] = useState("");
  const [revCat, setRevCat] = useState<'homme' | 'femme' | 'famille' | 'groupe'>("homme");
  const [revPeriod, setRevPeriod] = useState("Protocole 9 Mois");
  const [revMsg, setRevMsg] = useState("");
  const [revLoading, setRevLoading] = useState(false);
  const [revSubmitted, setRevSubmitted] = useState(false);
  const [revError, setRevError] = useState("");

  // Récupérer et fusionner les témoignages réels approuvés
  useEffect(() => {
    const fetchApprovedTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials");
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.testimonials) {
            // Fusionner les témoignages statiques et dynamiques approuvés
            setAllTestimonials([...testimonials, ...data.testimonials]);
          }
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des avis approuvés :", err);
      }
    };
    fetchApprovedTestimonials();
  }, [revSubmitted]);

  // États pour les formulaires et modales
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [message, setMessage] = useState("");
  const [accompagnementSelect, setAccompagnementSelect] = useState("9mois");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoStep, setVideoStep] = useState(0);

  // Position souris pour la géométrie sacrée interactive
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const gridContainerRef = useRef<HTMLDivElement>(null);

  // Calculateur de temps de vie (At-Taswîf)
  const [ageInput, setAgeInput] = useState(30);
  const [showCountdown, setShowCountdown] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [remainingSalats, setRemainingSalats] = useState(0);

  // Pour la Surat Az-Zumar
  const zumarSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: zumarSectionRef,
    offset: ["start end", "end start"],
  });

  const textOpacity1 = useTransform(scrollYProgress, [0.2, 0.35], [0.1, 1]);
  const textOpacity2 = useTransform(scrollYProgress, [0.35, 0.5], [0.1, 1]);
  const textOpacity3 = useTransform(scrollYProgress, [0.5, 0.65], [0.1, 1]);

  // Gérer la position de la souris relative au conteneur de la grille
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gridContainerRef.current) return;
    const rect = gridContainerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Compteur d'existence réactif
  useEffect(() => {
    if (!showCountdown) return;

    // Espérance de vie moyenne estimée à 79 ans
    const averageLifespanYears = 79;
    const yearsRemaining = Math.max(0, averageLifespanYears - ageInput);
    let seconds = yearsRemaining * 365.25 * 24 * 60 * 60;
    setRemainingSeconds(seconds);
    setRemainingSalats(yearsRemaining * 365.25 * 5); // 5 prières par jour

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [ageInput, showCountdown]);

  // Gérer les étapes de la vidéo immersive
  useEffect(() => {
    if (!isVideoOpen) {
      setVideoStep(0);
      return;
    }

    const t1 = setTimeout(() => setVideoStep(1), 4000);   // Verset Arabe
    const t2 = setTimeout(() => setVideoStep(2), 11000);  // Traduction Française
    const t3 = setTimeout(() => setVideoStep(3), 20000);  // Choc de conscience
    const t4 = setTimeout(() => setVideoStep(4), 32000);  // Call to action

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isVideoOpen]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !nom || !message) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, message, accompagnement: accompagnementSelect }),
      });

      if (response.ok) {
        setSubmitted(true);
        setNom("");
        setEmail("");
        setMessage("");
      } else {
        const data = await response.json();
        setError(data.message || "Une erreur est survenue.");
      }
    } catch (err) {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!revNom || !revMsg) return;

    setRevLoading(true);
    setRevError("");

    try {
      const response = await fetch("/api/testimonials/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: revNom,
          categorie: revCat,
          periode: revPeriod,
          message: revMsg,
          localisation: revLocalisation,
        }),
      });

      if (response.ok) {
        setRevSubmitted(true);
        setRevNom("");
        setRevLocalisation("");
        setRevMsg("");
      } else {
        const data = await response.json();
        setRevError(data.message || "Une erreur est survenue.");
      }
    } catch (err) {
      setRevError("Impossible de se connecter au serveur.");
    } finally {
      setRevLoading(false);
    }
  };


  return (
    <div className={`relative overflow-hidden bg-midnight text-cream ${isFocusMode ? "focus-layout-active" : ""}`}>
      
      {/* ═══════════════════════════════════════════
          SECTION 1 : HERO IMMERSIF ET CINÉMATOGRAPHIQUE
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 bg-midnight">
        

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-20 text-center flex flex-col items-center">
          
          <motion.span
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald bg-emerald-muted px-5 py-2 rounded-full border border-emerald/20 mb-8 font-body"
          >
            Renouer avec Allah
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-medium leading-[1.2] tracking-wide text-cream max-w-5xl"
          >
            Restaurez votre souveraineté intellectuelle et domptez votre Nafs pour retrouver une prière (Salat) inébranlable et assumer votre mandat de Khalifa.
          </motion.h1>

          {/* BOUTON D&apos;ÉVEIL DE CONSCIENCE CENTRAL */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="mt-12 flex flex-col items-center gap-6"
          >
            <button
              onClick={() => setIsVideoOpen(true)}
              className="group relative flex items-center justify-center p-6 border-2 border-emerald text-emerald rounded-full font-heading text-lg tracking-widest uppercase hover:bg-emerald hover:text-midnight transition-all duration-500 shadow-xl shadow-emerald/10 cursor-pointer bg-midnight"
            >
              <span className="absolute inset-0 rounded-full border border-emerald/40 animate-ping opacity-75" />
              Écouter l&apos;Appel — 90 secondes
            </button>
            <span className="text-[10px] tracking-[0.2em] text-cream-muted uppercase font-body font-bold">Pour les croyants cherchant à renouer avec la Prière et la constance</span>
          </motion.div>

        </div>

        {/* Petite flèche animée */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-60">
          <span className="text-[9px] tracking-[0.25em] uppercase text-emerald font-body font-bold">Commencer l&apos;Audit</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald animate-bounce" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MODALE VIDÉO D&apos;ÉVEIL DE CONSCIENCE (PLEIN ÉCRAN)
          ═══════════════════════════════════════════ */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-stone-950 p-6 selection:bg-gold/20"
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-6 right-6 text-stone-400 hover:text-stone-100 text-xl font-bold cursor-pointer transition-colors p-3 font-body z-50"
              aria-label="Fermer la modale"
            >
              ✕ Fermer
            </button>

            {/* Effet sonore en tâche de fond pour la modale */}
            <iframe 
              src="https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1&mute=0&controls=0&loop=1&start=100" 
              className="absolute w-0 h-0 opacity-0 pointer-events-none"
              allow="autoplay"
            />

            <div className="max-w-4xl w-full text-center relative px-4 min-h-[400px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {videoStep === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="space-y-4"
                  >
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gold mx-auto mb-4" />
                    <p className="text-xs tracking-widest text-gold uppercase font-body font-semibold">Alignement des fréquences...</p>
                  </motion.div>
                )}

                {videoStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="space-y-6"
                  >
                    <h3 className="font-heading text-4xl sm:text-6xl text-gold leading-normal font-light" dir="rtl">
                      أَلَمْ يَأْنِ لِلَّذِينَ آمَنُوا أَن تَخْشَعَ قُلُوبُهُمْ لِذِكْرِ اللَّهِ...
                    </h3>
                  </motion.div>
                )}

                {videoStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="space-y-6"
                  >
                    <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-semibold block font-body">
                      Sourate Al-Hadid (57:16)
                    </span>
                    <h2 className="font-heading text-3xl sm:text-5xl font-light text-stone-100 leading-tight">
                      « Le moment n’est-il pas venu pour ceux qui ont cru, que leurs cœurs s’humilient à l’évocation d’Allah et devant ce qui est descendu de la vérité... ? »
                    </h2>
                  </motion.div>
                )}

                {videoStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="space-y-8 max-w-2xl font-body"
                  >
                    <span className="text-[10px] tracking-[0.4em] uppercase text-stone-500 font-semibold block">
                      L&apos;illusion d&apos;At-Taswîf
                    </span>
                    <h3 className="font-heading text-2xl sm:text-4xl text-stone-200 font-light leading-relaxed">
                      Tu te dis &quot;demain&quot;. Tu te dis &quot;plus tard&quot;.<br />
                      Chaque jour est une érosion de ta volonté. Mais la mort ne négocie pas son calendrier.
                    </h3>
                    <p className="text-stone-400 text-sm leading-relaxed">
                      Chaque Salat reportée, chaque thread inachevé avec ton Créateur est une capitulation de ton Nafs. Es-tu prêt à rendre ton compte final dans cette posture ?
                    </p>
                  </motion.div>
                )}

                {videoStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="space-y-8"
                  >
                    <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-semibold block font-body">
                      Prendre ses responsabilités radicalement
                    </span>
                    <h3 className="font-heading text-4xl sm:text-6xl text-stone-100 font-light">
                      Fends la mer de ton quotidien.
                    </h3>
                    <p className="text-stone-400 text-sm font-body max-w-md mx-auto leading-relaxed">
                      Ne subis plus. Agis. Le protocole C.O.M.E.S. est conçu pour briser tes blocages comportementaux et spirituels en 30 jours.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                      <Button onClick={() => { setIsVideoOpen(false); window.location.href="/livres#secrets"; }} variant="primary">
                        Se procurer l&apos;eBook (dès 5,90 €)
                      </Button>
                      <button 
                        onClick={() => { setIsVideoOpen(false); window.location.href="#contact-comes"; }} 
                        className="px-8 py-3 border border-stone-700 text-stone-300 hover:text-stone-100 text-xs tracking-[0.15em] uppercase hover:border-gold transition-all duration-300 cursor-pointer"
                      >
                        Solliciter un contact privé
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════
          SECTION 2 : LA GÉOMÉTRIE SACRÉE INTERACTIVE (Grille d&apos;Ordre Céleste)
          ═══════════════════════════════════════════ */}
      <section
        ref={gridContainerRef}
        onMouseMove={handleMouseMove}
        className="relative py-28 bg-midnight border-y border-border cursor-crosshair overflow-hidden"
      >
        {/* Grille géométrique interactive SVG */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="mouse-glow" cx={`${mousePos.x}px`} cy={`${mousePos.y}px`} r="300px" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#mouse-glow)" />
            
            {/* Cercles de proportions de Fibonacci basés sur le centre */}
            <circle cx="50%" cy="50%" r="80" fill="none" stroke="var(--color-border)" strokeWidth="0.5" />
            <circle cx="50%" cy="50%" r="130" fill="none" stroke="var(--color-border)" strokeWidth="0.5" />
            <circle cx="50%" cy="50%" r="210" fill="none" stroke="var(--color-border)" strokeWidth="0.5" />
            <circle cx="50%" cy="50%" r="340" fill="none" stroke="var(--color-border)" strokeWidth="0.5" />
            
            {/* Lignes diagonales reliant les pôles */}
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="var(--color-border)" strokeWidth="0.3" strokeDasharray="5,5" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="var(--color-border)" strokeWidth="0.3" strokeDasharray="5,5" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="var(--color-border)" strokeWidth="0.3" />
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="var(--color-border)" strokeWidth="0.3" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <SectionHeading
            label="Sciences & Rigueur"
            title="L&apos;Harmonie de l&apos;Ordre Divin"
            subtitle="Le C.O.M.E.S. n&apos;est pas une méthode émotionnelle ou improvisée. C&apos;est une ingénierie rigoureuse de réduction de l&apos;entropie psychologique, s&apos;appuyant sur l&apos;équilibre universel et mathématique voulu par le Créateur."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <Card
              variant="bordered"
              label="Axiome 01"
              title="Souveraineté"
              description="Neutralisation de la fatigue décisionnelle par l'automatisation comportementale. Le Nafs (ego) sature la bande passante cognitive par des micro-choix parasites. La routine rituelle de la Salat fait barrière."
              index={1}
            />
            <Card
              variant="bordered"
              label="Axiome 02"
              title="Design Spatial"
              description="Application de la loi de proximité environnementale. Nous modifions physiquement et numériquement votre cadre de vie pour rendre la désobéissance difficile et le bien immédiat et fluide."
              index={2}
            />
            <Card
              variant="bordered"
              label="Axiome 03"
              title="Chronobiologie"
              description="Alignement chirurgical sur le rythme de rotation terrestre. L'aube comme pivot métabolique. La régulation du cortisol et de l'adénosine par l'exposition lumineuse au Fajr."
              index={3}
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2.5 : LE SPECTACLE DE LA CRÉATION (Monde Végétal Réaliste et Véritable Vidéo)
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-28 overflow-hidden bg-surface border-y border-border">
        
        {/* Monde naturel réaliste avec véritable vidéo en boucle fluide */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-10">
          <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 filter grayscale"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-dense-wild-jungle-with-lush-greenery-41484-large.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-20 text-center flex flex-col items-center">
          
          {/* Cadre de prestige en verre dépoli (Glassmorphism) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="backdrop-blur-xl bg-midnight/90 border border-emerald/15 p-8 md:p-14 rounded-sm shadow-2xl space-y-8"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald bg-emerald-muted/20 px-5 py-2 rounded-full border border-emerald/10 font-body">
              Contemplation — Al-Khaliq
            </span>

            {/* Versets sublimes sur la perfection divine */}
            <div className="space-y-6">
              <h3 className="font-heading text-3xl sm:text-5xl text-cream font-medium leading-loose tracking-wide" dir="rtl">
                الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ <br />
                ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ
              </h3>
              
              <div className="w-16 h-px bg-emerald/30 mx-auto" />
              
              <h4 className="font-heading text-xl sm:text-2xl font-light text-emerald italic leading-relaxed max-w-3xl mx-auto">
                « Celui qui a créé sept cieux superposés sans que tu voies de disproportion en la création du Tout-Miséricordieux. Ramène ton regard : y vois-tu une quelconque faille ? Puis ramène ton regard à deux fois : le regard te reviendra humilié, fatigué. »
              </h4>
              
              <p className="text-[10px] uppercase text-cream-muted tracking-[0.3em] font-bold font-body">
                Sourate Al-Mulk (67:3-4)
              </p>
            </div>

            <p className="mt-8 text-sm text-cream-muted font-body leading-relaxed max-w-2xl mx-auto font-medium">
              Une perfection absolue, dénuée de la moindre brèche. La nature sauvage — la richesse de ce monde végétal verdoyant, chaque envolée d&apos;oiseau sauvage, la trajectoire délicate des insectes et papillons multicolores dans la lumière filtrante — témoigne avec force de cette harmonie mathématique et vivante. Contempler la création est le remède ultime de la conscience contre l&apos;entropie de l&apos;âme.
            </p>
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 2.6 : TÉMOIGNAGES & RÉCITS DE TRANSFORMATION (43 Avis Interactifs & Dynamiques)
          ═══════════════════════════════════════════ */}
      <section className="relative py-32 bg-midnight border-b border-border overflow-hidden">
        
        {/* Fond décoratif en filigrane */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,168,83,0.025)_0%,rgba(0,0,0,0)_80%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          <SectionHeading
            label="Muhasaba & Rédemption"
            title="43 Récits de Transformation"
            subtitle="Découvrez les témoignages authentiques d'hommes, de femmes, de familles et de cohortes qui ont restauré leur souveraineté spirituelle et cognitive en sortant de l'illusion de l'At-Taswîf (procrastination) grâce au protocole C.O.M.E.S."
          />

          {/* Onglets interactifs de catégories avec compteurs */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
            {(['homme', 'femme', 'famille', 'groupe'] as const).map((cat) => {
              const count = allTestimonials.filter(t => t.category === cat).length;
              const labels = {
                homme: "Hommes",
                femme: "Femmes",
                famille: "Familles",
                groupe: "Groupes d'amis"
              };
              const isActive = activeTab === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-6 py-3 border text-xs font-semibold uppercase tracking-[0.15em] font-body transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "border-gold text-gold bg-gold/5"
                      : "border-border text-cream-muted hover:border-border-hover hover:text-cream"
                  }`}
                >
                  {labels[cat]} <span className="text-[10px] text-gold ml-1">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Carousel de témoignages */}
          {(() => {
            const filtered = allTestimonials.filter(t => t.category === activeTab);

            return (
              <div className="space-y-6">
                <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                <div className="relative group">
                  {/* Boutons de navigation PC */}
                  {filtered.length > 1 && (
                    <>
                      <button onClick={() => carouselRef.current?.scrollBy({ left: -400, behavior: 'smooth' })} className="hidden md:flex absolute -left-6 top-[45%] -translate-y-1/2 z-10 w-12 h-12 bg-white border border-border shadow-sm rounded-full items-center justify-center text-emerald hover:bg-emerald hover:text-white transition-all duration-300 cursor-pointer text-xl">
                        ←
                      </button>
                      <button onClick={() => carouselRef.current?.scrollBy({ left: 400, behavior: 'smooth' })} className="hidden md:flex absolute -right-6 top-[45%] -translate-y-1/2 z-10 w-12 h-12 bg-white border border-border shadow-sm rounded-full items-center justify-center text-emerald hover:bg-emerald hover:text-white transition-all duration-300 cursor-pointer text-xl">
                        →
                      </button>
                    </>
                  )}

                  <motion.div
                    ref={carouselRef}
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 scroll-smooth hide-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                  {filtered.map((t) => (
                    <div
                      key={t.id}
                      className="w-[85vw] sm:w-[450px] flex-shrink-0 snap-center group p-8 border border-border bg-surface/30 rounded-sm transition-all duration-500 hover:border-emerald/30 hover:-translate-y-1 flex flex-col justify-between"
                    >
                      <div className="space-y-6">
                        {/* Haut de carte : Nom et Éléments techniques */}
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <h4 className="font-heading text-lg sm:text-xl text-cream group-hover:text-emerald transition-colors duration-300">
                              {t.name}
                            </h4>
                            {t.role && (
                              <p className="text-xs text-cream-muted font-body italic mt-1">{t.role}</p>
                            )}
                          </div>
                          
                          <div className="flex flex-col items-end gap-1.5 font-body">
                            {t.score !== undefined && (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald px-2.5 py-1 border border-emerald/20 rounded-full bg-emerald-muted/5">
                                Audit : {t.score}%
                              </span>
                            )}
                            {t.period && (
                              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald px-2.5 py-1 border border-emerald/20 rounded-full bg-emerald-muted/5">
                                {t.period}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Corps : Texte de témoignage */}
                        <p className="text-sm text-cream-muted leading-relaxed font-body italic before:content-['«_'] after:content-['_»']">
                          {t.text}
                        </p>
                      </div>

                      {/* Bas de carte : Localisation */}
                      {t.location && (
                        <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-[10px] uppercase tracking-wider text-emerald font-body">
                          <span>Localisation</span>
                          <span className="text-cream-muted font-bold">{t.location}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
                </div>

                {/* Indicateur de défilement */}
                {filtered.length > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-2 opacity-50">
                    <span className="text-[10px] uppercase tracking-widest text-cream-muted font-bold">← Glisser horizontalement pour voir plus d&apos;avis →</span>
                  </div>
                )}
              </div>
            );
          })()}

          {/* ────────────────────────────────────────────────────────
              SOUS-SECTION : FORMULAIRE LAISSER UN AVIS
              ──────────────────────────────────────────────────────── */}
          <div className="mt-24 border-t border-border/50 pt-20 max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-gold mb-3 block font-body">
                Partagez votre parcours
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-light text-cream">
                Laisser un Témoignage
              </h3>
              <p className="mt-4 text-xs text-cream-muted leading-relaxed font-body max-w-md mx-auto">
                Votre retour sincère aide les croyants à briser leurs propres frontières cognitives. Chaque témoignage est relu et validé de manière confidentielle avant d&apos;être publié.
              </p>
            </div>

            {revSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 border border-emerald/20 bg-emerald-muted/5 text-center space-y-4 rounded-sm"
              >
                <div className="w-12 h-12 rounded-full border border-emerald/30 flex items-center justify-center mx-auto text-emerald">
                  ✓
                </div>
                <h4 className="font-heading text-xl font-light text-cream">Témoignage transmis avec succès</h4>
                <p className="text-xs text-cream-muted font-body leading-relaxed max-w-sm mx-auto">
                  Barakallahu feekum pour votre retour. Mounir Byar étudiera votre message avec attention avant sa publication officielle sur le Kosmos.
                </p>
                <button
                  onClick={() => setRevSubmitted(false)}
                  className="mt-4 text-[10px] uppercase tracking-wider text-gold hover:text-gold-light font-bold font-body cursor-pointer"
                >
                  Déposer un autre avis
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-6 font-body">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Champ Nom */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="rev-nom" className="text-[9px] uppercase tracking-wider text-cream-muted font-semibold">Votre Prénom ou Identité</label>
                    <input
                      required
                      type="text"
                      id="rev-nom"
                      value={revNom}
                      onChange={(e) => setRevNom(e.target.value)}
                      disabled={revLoading}
                      placeholder="Ex: Yacine, Leïla, La Famille M..."
                      className="px-4 py-3 bg-surface/30 text-cream placeholder-cream-muted/30 border border-border focus:border-gold outline-none text-xs transition-colors rounded-sm"
                    />
                  </div>

                  {/* Champ Categorie */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="rev-cat" className="text-[9px] uppercase tracking-wider text-cream-muted font-semibold">Vous êtes :</label>
                    <select
                      id="rev-cat"
                      value={revCat}
                      onChange={(e) => setRevCat(e.target.value as any)}
                      disabled={revLoading}
                      className="px-4 py-3 bg-surface/30 text-cream border border-border focus:border-gold outline-none text-xs transition-colors rounded-sm cursor-pointer"
                    >
                      <option value="homme">Un Homme particulier</option>
                      <option value="femme">Une Femme particulière</option>
                      <option value="famille">Une Famille / Un Couple</option>
                      <option value="groupe">Un Groupe d&apos;amis</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Champ Période / Accompagnement */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="rev-period" className="text-[9px] uppercase tracking-wider text-cream-muted font-semibold">Accompagnement Suivi</label>
                    <select
                      id="rev-period"
                      value={revPeriod}
                      onChange={(e) => setRevPeriod(e.target.value)}
                      disabled={revLoading}
                      className="px-4 py-3 bg-surface/30 text-cream border border-border focus:border-gold outline-none text-xs transition-colors rounded-sm cursor-pointer"
                    >
                      <option value="Protocole 9 Mois">Protocole de 9 Mois — Accompagnement Complet</option>
                      <option value="Protocole 3 Mois">Protocole de 3 Mois — Structure Intense</option>
                      <option value="Protocole 1 Mois">Protocole de 1 Mois — Réajustement & Doutes</option>
                      <option value="Audit de Souveraineté">Audit de Souveraineté — Bilan initial</option>
                    </select>
                  </div>

                  {/* Champ Localisation (Ville / Commune) */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="rev-localisation" className="text-[9px] uppercase tracking-wider text-cream-muted font-semibold">Votre Ville / Commune</label>
                    <input
                      required
                      type="text"
                      id="rev-localisation"
                      value={revLocalisation}
                      onChange={(e) => setRevLocalisation(e.target.value)}
                      disabled={revLoading}
                      placeholder="Ex: Chartres, Cormontreuil, Gueux..."
                      className="px-4 py-3 bg-surface/30 text-cream placeholder-cream-muted/30 border border-border focus:border-gold outline-none text-xs transition-colors rounded-sm"
                    />
                  </div>
                </div>

                {/* Champ Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="rev-message" className="text-[9px] uppercase tracking-wider text-cream-muted font-semibold">Votre Récit (Pourquoi étiez-vous perdu ? Quel est l&apos;impact de la Salat ?)</label>
                  <textarea
                    required
                    id="rev-message"
                    rows={4}
                    value={revMsg}
                    onChange={(e) => setRevMsg(e.target.value)}
                    disabled={revLoading}
                    placeholder="Parlez avec sincérité de vos blocages résolus (At-Taswîf, prière saccadée, doutes, péchés abandonnés, retour au Fajr...) et de votre renouveau spirituel..."
                    className="px-4 py-3 bg-surface/30 text-cream placeholder-cream-muted/30 border border-border focus:border-gold outline-none text-xs transition-colors rounded-sm leading-relaxed"
                  />
                </div>

                {revError && (
                  <p className="text-xs text-red-500 font-semibold text-center">{revError}</p>
                )}

                <button
                  type="submit"
                  disabled={revLoading}
                  className="w-full py-4 border border-gold/40 text-gold text-xs tracking-[0.15em] uppercase hover:bg-gold hover:text-stone-950 transition-all duration-400 font-bold cursor-pointer inline-flex justify-center items-center gap-2 rounded-sm"
                >
                  {revLoading ? "Transmission confidentielle..." : "Soumettre mon témoignage pour validation"}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 3 : LA PROCRASTINATION DE VIE (At-Taswîf)
          ═══════════════════════════════════════════ */}


      <section className="relative py-28 bg-stone-50 border-b border-stone-200 text-stone-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
          
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold bg-gold-muted/15 px-4 py-1.5 rounded-full border border-gold/10 mb-6 font-body">
            At-Taswîf (La Procrastination Spirituelle)
          </span>

          <h2 className="font-heading text-4xl sm:text-5xl font-light text-stone-950 max-w-3xl leading-tight">
            « Prends garde au "Plus Tard", car c&apos;est l&apos;arme absolue d&apos;Iblis pour vider ton existence. »
          </h2>

          <p className="mt-8 text-sm text-stone-600 font-body leading-relaxed max-w-xl">
            Nous repoussons continuellement notre retour sincère vers Allah, supposant que le sablier de notre existence est infini. C&apos;est une défaillance de souveraineté cognitive. Brisons l&apos;illusion matérielle immédiatement.
          </p>

          {/* CALCULATEUR / COMPTEUR D&apos;EXISTENCE */}
          <div className="mt-12 p-8 border border-stone-200 bg-stone-100/50 rounded-sm w-full max-w-lg shadow-sm">
            <h4 className="font-heading text-lg font-semibold text-stone-900 mb-6">Calcule ton audit de vie estimé</h4>
            
            {!showCountdown ? (
              <div className="space-y-5 font-body">
                <div className="flex flex-col gap-2 items-center">
                  <label htmlFor="age-selector" className="text-xs text-stone-500 uppercase tracking-wider">Quel est ton âge biologique actuel ?</label>
                  <input
                    id="age-selector"
                    type="number"
                    min="15"
                    max="78"
                    value={ageInput}
                    onChange={(e) => setAgeInput(Number(e.target.value))}
                    className="w-20 px-3 py-2 bg-white text-stone-950 border border-stone-300 text-center font-bold outline-none focus:border-gold"
                  />
                </div>
                <Button onClick={() => setShowCountdown(true)} variant="primary" className="py-3 px-8 text-xs font-semibold">
                  Lancer l&apos;Audit temporel
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 font-body"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white border border-stone-200">
                    <span className="text-[10px] uppercase text-stone-400 block tracking-widest mb-1">Secondes Estimées</span>
                    <span className="font-heading text-xl font-light text-stone-900 tracking-wider">
                      {remainingSeconds.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-4 bg-white border border-stone-200">
                    <span className="text-[10px] uppercase text-stone-400 block tracking-widest mb-1">Salats Restantes</span>
                    <span className="font-heading text-xl font-light text-stone-900 tracking-wider">
                      {remainingSalats.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Choc psychologique et spirituel sur le temps restant réel */}
                <div className="p-5 bg-stone-950 text-stone-100 border border-gold/40 text-left rounded-sm space-y-4">
                  <span className="text-[9px] uppercase tracking-widest text-gold font-bold block">Avertissement de l&apos;Ingénieur</span>
                  <p className="text-xs text-stone-300 leading-relaxed font-body">
                    <strong>Attention :</strong> Ce capital estimé de <strong className="text-gold">{remainingSalats.toLocaleString()} prières</strong> est une pure projection statistique théorique. 
                  </p>
                  <p className="text-xs text-stone-300 leading-relaxed font-body italic border-l border-gold pl-3">
                    « Qui te garantit que ce chiffre n&apos;est pas une illusion ? Qui te dit qu&apos;il ne te reste pas <strong>qu&apos;une seule prière</strong> à accomplir ? Une seule maintenant. Peut-être la prochaine Salat de ta journée. Ou peut-être aucune. »
                  </p>

                  <div className="pt-2 border-t border-stone-800 space-y-2">
                    <p className="font-heading text-sm text-stone-200 text-center leading-loose tracking-wide" dir="rtl">
                      أَفَرَأَيْتَ الَّذِي كَفَرَ بِآيَاتِنَا وَقَالَ لَأُوتَيَنَّ مَالًا وَوَلَدًا * أَطَّلَعَ الْغَيْبَ أَمِ اتَّخَذَ عِندَ الرَّحْمَنِ عَهْدًا
                    </p>
                    <p className="text-[10px] italic leading-relaxed text-stone-400 text-center">
                      {"« As-tu vu celui qui ne croit pas à Nos versets et dit : \"On me donnera certes des biens et des enfants ?\" * A-t-il pénétré l'Inconnaissable, ou a-t-il pris un engagement (un contrat) auprès du Tout-Miséricordieux ? »"}
                      <span className="block text-[9px] uppercase tracking-widest text-gold font-bold mt-1">(Sourate Maryam, 19:77-78)</span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-center gap-6 pt-2">
                  <button
                    onClick={() => setShowCountdown(false)}
                    className="text-[10px] uppercase text-stone-400 hover:text-stone-950 font-semibold cursor-pointer tracking-wider"
                  >
                    Réinitialiser l&apos;audit
                  </button>
                  <button
                    onClick={() => { window.location.href="#contact-comes"; }}
                    className="text-[10px] uppercase text-gold hover:text-stone-950 font-semibold cursor-pointer tracking-wider border-b border-gold"
                  >
                    Postuler au Protocole de 9 Mois
                  </button>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 4 : L&apos;INTERPELLATION INTIME — SURAT AZ-ZUMAR (OBSIDIENNE / SOMBRE SACRÉ)
          ═══════════════════════════════════════════ */}
      <section
        ref={zumarSectionRef}
        className="relative py-36 bg-stone-950 text-stone-100 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(212,168,83,0.06)_0%,rgba(0,0,0,0)_75%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-16 relative z-10 flex flex-col items-center">
          
          <span className="text-[10px] tracking-[0.4em] uppercase text-gold font-semibold block font-body">
            L&apos;Appel Sacré
          </span>

          <div className="space-y-12">
            
            {/* Verset en Arabe */}
            <motion.h3
              style={{ opacity: textOpacity1 }}
              className="font-heading text-4xl sm:text-6xl text-stone-300 font-light leading-loose tracking-wide"
              dir="rtl"
            >
              قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ
            </motion.h3>

            {/* Traduction Partie I */}
            <motion.h2
              style={{ opacity: textOpacity2 }}
              className="font-heading text-3xl sm:text-5xl font-light text-gold leading-tight tracking-wide"
            >
              {"« Dis : \"Ô Mes serviteurs qui avez commis des excès à votre propre détriment, ne désespérez pas de la miséricorde d'Allah...\" »"}
            </motion.h2>

            {/* Traduction Partie II */}
            <motion.p
              style={{ opacity: textOpacity3 }}
              className="font-body text-sm sm:text-base text-stone-400 max-w-2xl mx-auto leading-relaxed"
            >
              {"« ...Car Allah pardonne tous les péchés. Oui, c'est Lui le Pardonneur, le Très Miséricordieux.\" (Az-Zumar 39:53) »"}
              <span className="block text-[10px] uppercase text-gold tracking-widest mt-4 font-semibold">
                Il s&apos;adresse à toi, aujourd&apos;hui. Pas à un autre. Reviens.
              </span>
            </motion.p>

          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SECTION 5 : FORMULAIRE DE CONTACT PROTOCOLE C.O.M.E.S.
          ═══════════════════════════════════════════ */}
      <section id="contact-comes" className="relative py-28 bg-stone-50 border-t border-stone-200 text-stone-900">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-emerald mb-4 block font-body">
              Muhasaba & Accompagnement
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl font-light text-stone-950">
              Solliciter un Accompagnement Privé
            </h2>
            <p className="mt-6 text-sm text-stone-600 leading-relaxed font-body max-w-xl mx-auto">
              Que ce soit pour le **Protocole de 30 Jours** (eBook) ou pour postuler à notre accompagnement ultime, le **Protocole de 9 Mois** (compagnonnage intense et interposition behavioriste), déposez votre demande.
            </p>
          </div>

          <div className="relative p-10 md:p-16 border border-stone-200 bg-white shadow-sm rounded-sm max-w-2xl mx-auto">
            <div className="absolute top-0 left-10 w-24 h-px bg-gold" />
            <div className="absolute bottom-0 right-10 w-24 h-px bg-gold" />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-emerald/5 border border-emerald/20 text-emerald text-xs tracking-wider uppercase text-center rounded-sm max-w-md mx-auto font-body font-semibold"
              >
                Votre demande a été enregistrée en toute discrétion. Mounir BYAR reprendra contact avec vous.
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6 max-w-md mx-auto font-body">
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="nom-field" className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Identité / Prénom</label>
                  <input
                    required
                    type="text"
                    id="nom-field"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    disabled={loading}
                    placeholder="Ex: Yacine, Dr. Sliman..."
                    className="px-4 py-3 bg-stone-50 text-stone-950 placeholder-stone-400/40 border border-stone-200 focus:border-gold outline-none text-xs transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email-field" className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Adresse Email</label>
                  <input
                    required
                    type="email"
                    id="email-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    placeholder="Ex: contact@votre-domaine.com"
                    className="px-4 py-3 bg-stone-50 text-stone-950 placeholder-stone-400/40 border border-stone-200 focus:border-gold outline-none text-xs transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="accompagnement-select" className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Protocole Souhaité</label>
                  <select
                    id="accompagnement-select"
                    value={accompagnementSelect}
                    onChange={(e) => setAccompagnementSelect(e.target.value)}
                    disabled={loading}
                    className="px-4 py-3 bg-stone-50 text-stone-950 border border-stone-200 focus:border-gold outline-none text-xs transition-colors cursor-pointer"
                  >
                    <option value="9mois">Protocole de 9 Mois — Accompagnement Complet</option>
                    <option value="30jours">Protocole de 30 Jours — Validation d&apos;eBook</option>
                    <option value="autre">Autre Demande spécifique</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message-field" className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">Votre Situation / Vos Obstacles</label>
                  <textarea
                    required
                    id="message-field"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                    placeholder="Qu&apos;est-ce qui sabote votre constance (Salat/spiritualité) ? Pourquoi repoussez-vous à plus tard ? Expliquez brièvement en toute franchise..."
                    className="px-4 py-3 bg-stone-50 text-stone-950 placeholder-stone-400/40 border border-stone-200 focus:border-gold outline-none text-xs transition-colors leading-relaxed"
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-500 font-semibold text-center">{error}</p>
                )}

                <Button type="submit" disabled={loading} className="w-full py-4 text-center justify-center">
                  {loading ? "Transmission confidentielle..." : "Soumettre ma candidature confidentielle"}
                </Button>
              </form>
            )}

            <p className="mt-8 text-center text-[9px] text-stone-400 max-w-xs mx-auto leading-relaxed">
              Secret professionnel strict. Vos échanges avec Mounir BYAR sont confidentiels, sécurisés et encryptés de bout en bout.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION TRANSITION PARCOURS LINÉAIRE */}
      <section className="relative py-20 bg-stone-950 border-t border-gold/15 text-center">
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-semibold block">➔ Passer à la phase supérieure</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-light text-stone-100">
            Étape 02 : Lancez Votre Diagnostic
          </h2>
          <p className="text-sm text-stone-400 font-body max-w-lg mx-auto leading-relaxed">
            Vous avez pris conscience de la Matrice mondaine. Il est temps d&apos;auditer précisément l&apos;état d&apos;entropie de votre esprit, de votre temps et de votre Salat.
          </p>
          <Button href="/audit" variant="primary" className="shadow-lg shadow-gold/5 font-bold tracking-widest px-10 py-4">
            Commencer le Bilan Gratuit →
          </Button>
        </div>
      </section>

    </div>
  );
}
