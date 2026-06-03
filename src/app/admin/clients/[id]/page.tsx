"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiPlus, FiTrash2, FiClock, FiUser } from "react-icons/fi";
import Link from "next/link";

export default function ClientProgramEditor() {
  const params = useParams();
  const clientId = params.id as string;

  const [client, setClient] = useState<any>(null);
  const [bibliotheque, setBibliotheque] = useState<any[]>([]);
  const [assignedModules, setAssignedModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Drag state
  const [draggedModule, setDraggedModule] = useState<any | null>(null);

  useEffect(() => {
    fetchData();
  }, [clientId]);

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/admin/coaching-clients/${clientId}`);
      if (res.ok) {
        const data = await res.json();
        setClient(data.client);
        setBibliotheque(data.bibliotheque);
        setAssignedModules(data.assignedModules);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (module: any) => {
    setDraggedModule(module);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Nécessaire pour autoriser le drop
  };

  const handleDrop = async (e: React.DragEvent, jourNumero: number) => {
    e.preventDefault();
    if (!draggedModule) return;

    // Ajout optimiste (Fluidité)
    const tempId = Date.now().toString();
    const newAssign = {
      id: tempId,
      module_id: draggedModule.id,
      titre_original: draggedModule.titre,
      type_module: draggedModule.type_module,
      jour_numero: jourNumero,
      status: "En cours d'enregistrement..."
    };
    
    setAssignedModules((prev) => [...prev, newAssign]);
    setDraggedModule(null);

    // Sauvegarde en base
    try {
      const res = await fetch(`/api/admin/coaching-clients/${clientId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          module_id: draggedModule.id,
          jour_numero: jourNumero
        })
      });
      if (res.ok) {
        fetchData(); // Recharger avec l'ID réel
      } else {
        // En cas d'erreur, on retire l'ajout optimiste
        setAssignedModules((prev) => prev.filter(m => m.id !== tempId));
        alert("Erreur lors de l'assignation");
      }
    } catch (err) {
      setAssignedModules((prev) => prev.filter(m => m.id !== tempId));
    }
  };

  const removeModule = async (assignationId: string) => {
    setAssignedModules((prev) => prev.filter((m) => m.id !== assignationId));
    try {
      await fetch(`/api/admin/coaching-clients/${clientId}?assignation_id=${assignationId}`, {
        method: "DELETE"
      });
    } catch (err) {
      fetchData(); // Revert si erreur
    }
  };

  if (loading) return <div className="p-8 text-center">Chargement de l'éditeur...</div>;
  if (!client) return <div className="p-8 text-center text-red-500">Client introuvable</div>;

  // Calcul du nombre de jours selon la durée du programme (30, 90, 365)
  const joursTotal = client.duree_programme?.includes("12") ? 365 : client.duree_programme?.includes("3") ? 90 : 30;
  const joursArray = Array.from({ length: joursTotal }, (_, i) => i + 1);

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto h-[calc(100vh-80px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-shrink-0">
        <div>
          <Link href="/admin/clients" className="flex items-center gap-2 text-gold-500 hover:text-gold-600 mb-2 transition-colors">
            <FiChevronLeft /> Retour aux dossiers
          </Link>
          <h1 className="text-3xl font-bold font-serif text-gray-800 dark:text-cream">
            Programme de {client.nom} {client.prenom}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-4">
            <span className="flex items-center gap-1"><FiUser/> {client.profil}</span>
            <span className="flex items-center gap-1"><FiClock/> {client.duree_programme}</span>
          </p>
        </div>
        <button className="bg-gray-900 dark:bg-white text-white dark:text-black px-6 py-2 rounded-xl font-medium shadow-lg">
          Aperçu Client
        </button>
      </div>

      <div className="flex gap-8 flex-1 min-h-0">
        {/* Colonne de Gauche : Bibliothèque (Drag Source) */}
        <div className="w-1/3 bg-white dark:bg-dark-800 rounded-2xl border border-gray-100 dark:border-white/10 shadow-xl overflow-y-auto flex flex-col">
          <div className="p-6 border-b border-gray-100 dark:border-white/10 sticky top-0 bg-white/80 dark:bg-dark-800/80 backdrop-blur-md z-10">
            <h2 className="text-xl font-bold text-gray-800 dark:text-cream">Bibliothèque de Modules</h2>
            <p className="text-sm text-gray-500 mt-1">Glissez ces blocs vers le calendrier</p>
          </div>
          <div className="p-6 space-y-4">
            {bibliotheque.length === 0 ? (
              <div className="text-center p-8 bg-gray-50 dark:bg-dark-900 rounded-xl border border-dashed border-gray-200 dark:border-white/20">
                <p className="text-gray-500 text-sm">Aucun module dans la bibliothèque.</p>
                <button className="mt-4 text-gold-500 text-sm font-medium hover:underline">+ Créer un module</button>
              </div>
            ) : (
              bibliotheque.map((mod) => (
                <motion.div
                  key={mod.id}
                  draggable
                  onDragStart={() => handleDragStart(mod)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 bg-gray-50 dark:bg-dark-900 rounded-xl border border-gray-200 dark:border-white/10 cursor-grab active:cursor-grabbing hover:border-gold-500/50 hover:shadow-lg transition-all group"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-800 dark:text-cream group-hover:text-gold-500 transition-colors">{mod.titre}</h3>
                    <span className="text-xs font-medium px-2 py-1 bg-white dark:bg-dark-800 rounded text-gray-500 shadow-sm border border-gray-100 dark:border-white/5">
                      {mod.type_module || "Standard"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">{mod.contenu}</p>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Colonne de Droite : Calendrier (Drop Target) */}
        <div className="w-2/3 bg-gray-50/50 dark:bg-dark-900/50 rounded-2xl border border-gray-100 dark:border-white/10 shadow-inner overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {joursArray.map((jour) => {
              const modulesDuJour = assignedModules.filter((m) => m.jour_numero === jour);
              
              return (
                <div 
                  key={jour}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, jour)}
                  className={`min-h-[150px] p-4 rounded-xl border-2 transition-all ${
                    draggedModule 
                      ? "border-dashed border-gold-500/50 bg-gold-500/5" 
                      : "border-solid border-gray-200 dark:border-white/10 bg-white dark:bg-dark-800"
                  }`}
                >
                  <h3 className="font-bold text-gray-400 dark:text-gray-500 mb-4 flex items-center justify-between border-b border-gray-100 dark:border-white/10 pb-2">
                    <span>Jour {jour}</span>
                    <span className="text-xs font-normal px-2 py-0.5 bg-gray-100 dark:bg-dark-900 rounded-full">
                      {modulesDuJour.length} module(s)
                    </span>
                  </h3>
                  
                  <div className="space-y-3">
                    <AnimatePresence>
                      {modulesDuJour.map((am) => (
                        <motion.div
                          key={am.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="p-3 bg-gray-50 dark:bg-dark-900 rounded-lg border border-gray-100 dark:border-white/5 relative group"
                        >
                          <p className="text-sm font-semibold text-gray-800 dark:text-cream pr-6">{am.titre_original}</p>
                          <button 
                            onClick={() => removeModule(am.id)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Retirer le module"
                          >
                            <FiTrash2 className="text-sm" />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {modulesDuJour.length === 0 && (
                      <div className="h-full flex items-center justify-center py-4">
                        <p className="text-xs text-gray-400 italic">Glissez un module ici</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
