"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiClock, FiCalendar, FiPrinter, FiMessageCircle, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Link from "next/link";

export default function ClientSpace() {
  const params = useParams();
  const token = params.token as string;

  const [client, setClient] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, [token]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/client/${token}`);
      if (res.ok) {
        const data = await res.json();
        setClient(data.client);
        setModules(data.modules);
        
        // Auto-expand le jour actuel (simulé ici par le jour du premier module non fait, ou jour 1)
        const firstUndone = data.modules.find((m: any) => !m.coche_action);
        if (firstUndone) setExpandedDay(firstUndone.jour_numero);
        else setExpandedDay(1);

      } else {
        setError("Lien d'accès invalide ou expiré.");
      }
    } catch (err) {
      setError("Erreur de connexion.");
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (assignationId: string, updates: any) => {
    // Optimistic UI update
    setModules(prev => prev.map(m => m.id === assignationId ? { ...m, ...updates } : m));

    try {
      await fetch('/api/client/progress', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, assignation_id: assignationId, ...updates })
      });
    } catch (err) {
      console.error("Erreur de sauvegarde", err);
    }
  };

  const generateGoogleCalendarLink = (module: any) => {
    const text = encodeURIComponent(`Protocole Souveraineté : ${module.titre_original}`);
    const details = encodeURIComponent(module.contenu || "Votre programme du jour.");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}`;
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gold-500">Chargement de votre espace...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  // Grouper les modules par jour
  const modulesByDay = modules.reduce((acc: any, module: any) => {
    const day = module.jour_numero;
    if (!acc[day]) acc[day] = [];
    acc[day].push(module);
    return acc;
  }, {});

  const totalModules = modules.length;
  const completedModules = modules.filter(m => m.coche_action).length;
  const progressPercent = totalModules === 0 ? 0 : Math.round((completedModules / totalModules) * 100);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 pb-20">
      {/* Header Client */}
      <header className="bg-white dark:bg-dark-800 shadow-sm sticky top-0 z-50 print:hidden">
        <div className="max-w-4xl mx-auto px-6 h-20 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold font-serif text-gray-800 dark:text-cream">
              Espace de {client.prenom || client.nom}
            </h1>
            <p className="text-sm text-gold-500 font-medium">Protocole de Souveraineté</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handlePrint} className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-cream transition-colors" title="Imprimer le planning">
              <FiPrinter className="text-xl" />
            </button>
            <Link href="/contact" className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <FiMessageCircle /> Contacter l'ingénieure
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 mt-8 space-y-8">
        {/* Barre de progression */}
        <div className="bg-white dark:bg-dark-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 print:hidden">
          <div className="flex justify-between items-end mb-2">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Avancement du Programme</h2>
            <span className="text-2xl font-bold text-gold-500">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 dark:bg-dark-900 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
            />
          </div>
        </div>

        {/* Liste des Jours */}
        <div className="space-y-6">
          {Object.keys(modulesByDay).sort((a,b) => Number(a) - Number(b)).map((dayStr) => {
            const day = Number(dayStr);
            const dayModules = modulesByDay[day];
            const isExpanded = expandedDay === day;
            const allCompleted = dayModules.every((m: any) => m.coche_action);

            return (
              <div key={day} className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg border border-gray-100 dark:border-white/5 overflow-hidden print:border-b print:shadow-none print:break-inside-avoid">
                {/* En-tête du Jour */}
                <button 
                  onClick={() => setExpandedDay(isExpanded ? null : day)}
                  className={`w-full p-6 flex justify-between items-center transition-colors ${allCompleted ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${allCompleted ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-gold-500/10 text-gold-500'}`}>
                      {allCompleted ? <FiCheckCircle /> : day}
                    </div>
                    <div className="text-left">
                      <h2 className="text-xl font-bold text-gray-800 dark:text-cream">Jour {day}</h2>
                      <p className="text-sm text-gray-500">{dayModules.length} module(s)</p>
                    </div>
                  </div>
                  <div className="text-gray-400 print:hidden">
                    {isExpanded ? <FiChevronUp className="text-2xl" /> : <FiChevronDown className="text-2xl" />}
                  </div>
                </button>

                {/* Contenu du Jour */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-100 dark:border-white/5"
                    >
                      <div className="p-6 space-y-8">
                        {dayModules.map((module: any) => (
                          <div key={module.id} className="space-y-4">
                            <div className="flex justify-between items-start gap-4">
                              <h3 className="text-lg font-serif font-bold text-gray-800 dark:text-cream text-balance">
                                {module.titre_original}
                              </h3>
                              <a 
                                href={generateGoogleCalendarLink(module)} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors shrink-0 print:hidden"
                              >
                                <FiCalendar /> Google Agenda
                              </a>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                              {module.contenu}
                            </p>

                            {/* Actions Interactives du Client */}
                            <div className="bg-gray-50 dark:bg-dark-900 rounded-xl p-4 space-y-4 print:hidden">
                              <div className="flex flex-wrap gap-4">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                  <input 
                                    type="checkbox" 
                                    checked={module.coche_action}
                                    onChange={(e) => updateProgress(module.id, { coche_action: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-300 text-gold-500 focus:ring-gold-500"
                                  />
                                  <span className={`font-medium transition-colors ${module.coche_action ? 'text-emerald-600 line-through' : 'text-gray-700 dark:text-gray-300 group-hover:text-gold-500'}`}>
                                    J'ai accompli cette étape
                                  </span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-500 hover:text-amber-500 transition-colors ml-auto">
                                  <input 
                                    type="checkbox" 
                                    checked={module.difficulte_signalee}
                                    onChange={(e) => updateProgress(module.id, { difficulte_signalee: e.target.checked })}
                                    className="rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                                  />
                                  <FiAlertCircle /> Signaler une difficulté
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-500 hover:text-blue-500 transition-colors">
                                  <input 
                                    type="checkbox" 
                                    checked={module.demande_report}
                                    onChange={(e) => updateProgress(module.id, { demande_report: e.target.checked })}
                                    className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                                  />
                                  <FiClock /> Reporter à demain
                                </label>
                              </div>

                              <div className="pt-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Carnet de bord (Muhâsaba)</label>
                                <textarea 
                                  placeholder="Écrivez vos réflexions, vos blocages ou vos réussites du jour..."
                                  value={module.note_client || ""}
                                  onChange={(e) => updateProgress(module.id, { note_client: e.target.value })}
                                  className="w-full h-24 bg-white dark:bg-dark-800 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-sm focus:ring-2 focus:ring-gold-500 outline-none resize-none"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
