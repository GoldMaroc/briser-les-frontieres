"use client";

import { useState, useEffect } from "react";
import { FaTiktok, FaMagic, FaCopy, FaVideo, FaCheck, FaSave, FaList } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function TikTokStudio() {
  const [publications, setPublications] = useState<any[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [script, setScript] = useState<any>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [planning, setPlanning] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Calendrier TikTok
  const [viewStartDate, setViewStartDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const day = d.getDay() || 7; 
    if (day !== 1) d.setHours(-24 * (day - 1));
    return d;
  });
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);

  // Popup Edition
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editHook, setEditHook] = useState("");
  const [editBodyStr, setEditBodyStr] = useState("");
  const [editCta, setEditCta] = useState("");

  const fetchPlanning = () => {
    fetch("/api/admin/social/tiktok/planning")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPlanning(data.planning);
        }
      });
  };

  useEffect(() => {
    fetch("/api/admin/publications")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPublications(data.publications.filter((p: any) => p.content && p.content.length > 50));
        }
      });
    fetchPlanning();
  }, []);

  const handleGenerate = async () => {
    const article = publications.find(p => p.id === selectedArticleId);
    if (!article) return;

    setIsGenerating(true);
    setScript(null);
    setGeneratedImage(null);

    try {
      const res = await fetch("/api/admin/social/tiktok/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleTitle: article.titre || "Article sans titre",
          articleContent: article.content
        })
      });

      const data = await res.json();
      if (data.success) {
        setScript(data.script);
      } else {
        alert(data.error || "Erreur de génération");
      }
    } catch (err) {
      alert("Erreur serveur.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImage = async () => {
    if (!script?.visualPromptForHook) return;
    
    setIsGeneratingImage(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin/social/tiktok/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: script.visualPromptForHook })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur de génération d'image");
      
      setGeneratedImage(`data:image/jpeg;base64,${data.imageBase64}`);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleSaveToPlanning = async () => {
    if (!script) return;
    const article = publications.find(p => p.id === selectedArticleId);
    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/social/tiktok/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titre_source: article?.titre || "Inconnu",
          script
        })
      });
      const data = await res.json();
      if (data.success) {
        alert("Sauvegardé dans le planning !");
        fetchPlanning();
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Erreur lors de la sauvegarde.");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleStatus = async (id: number, currentStatut: string) => {
    const newStatut = currentStatut === 'Planifié' ? 'Publié' : 'Planifié';
    try {
      const res = await fetch("/api/admin/social/tiktok/planning", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, statut: newStatut })
      });
      if (res.ok) {
        if (selectedItem?.id === id) setSelectedItem({ ...selectedItem, statut: newStatut });
        fetchPlanning();
      }
    } catch (err) {
      alert("Erreur de mise à jour");
    }
  };

  // ----- Logique Drag & Drop -----
  const onDragStart = (e: React.DragEvent, id: number) => {
    setDraggedItemId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault(); 
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = async (e: React.DragEvent, targetDate: Date) => {
    e.preventDefault();
    if (!draggedItemId) return;

    // Met à jour localement pour la réactivité
    setPlanning(prev => prev.map(p => 
      p.id === draggedItemId ? { ...p, date_planification: targetDate.toISOString() } : p
    ));

    try {
      await fetch("/api/admin/social/tiktok/planning", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: draggedItemId, date_planification: targetDate.toISOString() })
      });
    } catch (err) {
      console.error(err);
      fetchPlanning();
    }
    
    setDraggedItemId(null);
  };

  // ----- Popup Edition -----
  const openPopup = (item: any) => {
    setSelectedItem(item);
    setEditHook(item.hook || "");
    // Convertir le body_json en texte lisible pour l'édition rapide
    let bodyText = "";
    if (item.body_json) {
      if (Array.isArray(item.body_json)) {
        bodyText = item.body_json.map((part: any) => part.text).join("\n\n");
      } else {
        bodyText = JSON.stringify(item.body_json);
      }
    }
    setEditBodyStr(bodyText);
    setEditCta(item.cta || "");
    setIsEditing(false);
  };

  const saveEdit = async () => {
    if (!selectedItem) return;
    try {
      // Re-formater en body_json simple ou le stocker tel quel
      const formattedBody = editBodyStr.split("\n\n").map(text => ({ type: "speech", text }));
      await fetch("/api/admin/social/tiktok/planning", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          id: selectedItem.id, 
          hook: editHook, 
          body_json: formattedBody, 
          cta: editCta 
        })
      });
      setSelectedItem({ ...selectedItem, hook: editHook, body_json: formattedBody, cta: editCta });
      setIsEditing(false);
      fetchPlanning();
    } catch (e) {
      alert("Erreur lors de la sauvegarde.");
    }
  };

  const deleteScript = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ce script ?")) return;
    try {
      await fetch(`/api/admin/social/tiktok/planning?id=${id}`, { method: "DELETE" });
      setSelectedItem(null);
      fetchPlanning();
    } catch (e) {
      alert("Erreur lors de la suppression");
    }
  };

  // ----- Génération de la grille hebdo -----
  const daysArray = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(viewStartDate);
    d.setDate(d.getDate() + i);
    daysArray.push(d);
  }

  const timeSlots = [];
  for (let h = 8; h <= 21; h++) {
    timeSlots.push(h);
  }

  return (
    <div className="relative py-32 bg-midnight min-h-screen">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_30%_0%,var(--color-midnight-light)_0%,var(--color-midnight)_70%)] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 mb-8 sm:mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-transparent rounded-2xl flex items-center justify-center border border-gold/30 shrink-0">
            <FaTiktok className="w-8 h-8 text-gold" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif text-sand-light font-bold">TikTok Studio (Faceless)</h1>
            <p className="text-sand/70 mt-2 text-sm sm:text-base">Générez des scripts viraux et des requêtes d'images IA à partir de vos articles.</p>
          </div>
        </div>

        {/* Sélection */}
        <div className="bg-midnight-light/50 border border-gold/10 p-4 sm:p-6 rounded-2xl mb-8 backdrop-blur-sm">
          <label className="block text-sm font-medium text-sand mb-2">1. Sélectionnez l'article source</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <select 
              className="flex-1 bg-midnight border border-gold/30 rounded-xl px-4 py-3 text-sand focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none w-full"
              value={selectedArticleId}
              onChange={(e) => setSelectedArticleId(e.target.value)}
            >
              <option value="">-- Choisir un article --</option>
              {publications.map(pub => (
                <option key={pub.id} value={pub.id}>{pub.titre || "Sans titre"}</option>
              ))}
            </select>
            
            <button 
              onClick={handleGenerate}
              disabled={!selectedArticleId || isGenerating}
              className="bg-gold text-midnight px-8 py-3 rounded-xl font-bold hover:bg-gold-light transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {isGenerating ? (
                <span className="animate-pulse">Analyse en cours...</span>
              ) : (
                <>
                  <FaMagic /> Générer le Script
                </>
              )}
            </button>
          </div>
        </div>

        {/* Résultat */}
        {script && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* HOOK */}
            <div className="bg-gradient-to-r from-red-900/20 to-midnight-light/50 border border-red-500/30 p-4 sm:p-6 rounded-2xl relative group">
              <h3 className="text-red-400 font-bold mb-4 pr-8 text-sm sm:text-base">
                ⏱️ Phase 1 : LE HOOK (0-3 Secondes)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-sand/50 uppercase tracking-wider mb-2 block">Texte à lire (Voix IA)</label>
                  <p className="text-xl text-white font-serif italic border-l-4 border-red-500 pl-4 py-2 bg-midnight/30 rounded-r-lg">
                    "{script.hook}"
                  </p>
                </div>
                <div>
                  <label className="text-xs text-sand/50 uppercase tracking-wider mb-2 block">Prompt Image (Midjourney/DALL-E)</label>
                  <div className="bg-white rounded p-4 text-sm font-mono text-gray-800 shadow-sm border border-gray-100 relative">
                    <span className="text-red-500 absolute top-2 left-2">🎥</span>
                    <p className="pl-6">{script.visualPromptForHook}</p>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      {!generatedImage ? (
                        <button 
                          onClick={generateImage}
                          disabled={isGeneratingImage}
                          className="w-full py-2 bg-gradient-to-r from-gold/80 to-gold text-white text-xs font-bold rounded-sm shadow-sm hover:shadow transition-all disabled:opacity-50"
                        >
                          {isGeneratingImage ? "🎨 Peinture en cours par l'IA..." : "🎨 Peindre cette image (Gratuit)"}
                        </button>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <img src={generatedImage} alt="Image générée" className="rounded-md w-full max-w-[250px] shadow-md border border-gold/30" />
                          <a 
                            href={generatedImage} 
                            download="tiktok-background.jpg"
                            className="py-1.5 px-4 bg-surface text-gold border border-gold/30 text-xs font-semibold rounded-sm hover:bg-gold/10 transition-all"
                          >
                            ⬇️ Télécharger l'image
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={() => copyToClipboard(script.hook, 'hook')} className="absolute top-4 right-4 text-sand/50 hover:text-gold transition-colors">
                {copiedSection === 'hook' ? <FaCheck className="text-green-400" /> : <FaCopy />}
              </button>
            </div>

            {/* BODY */}
            <div className="bg-midnight-light/50 border border-gold/20 p-4 sm:p-6 rounded-2xl">
              <h3 className="text-gold font-bold mb-4 pr-8 text-sm sm:text-base">
                📖 Phase 2 : LE DÉVELOPPEMENT (3-45 Secondes)
              </h3>
              
              <div className="space-y-6">
                {script.bodyParts.map((part: any, index: number) => (
                  <div key={index} className="grid md:grid-cols-2 gap-4 sm:gap-6 relative group border-b border-white/5 pb-6 pt-4 first:pt-0 last:border-0 last:pb-0">
                    <div>
                      <p className="text-lg text-sand font-serif">
                        {part.text}
                      </p>
                    </div>
                    <div>
                      <div className="bg-midnight p-4 rounded-lg flex gap-3 text-sm text-sand/80 font-mono h-full">
                        <FaVideo className="text-gold mt-1 flex-shrink-0" />
                        {part.visualPrompt}
                      </div>
                    </div>
                    <button onClick={() => copyToClipboard(part.text, `body-${index}`)} className="absolute top-0 right-0 text-sand/50 hover:text-gold transition-colors opacity-0 group-hover:opacity-100">
                      {copiedSection === `body-${index}` ? <FaCheck className="text-green-400" /> : <FaCopy />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-900/20 to-midnight-light/50 border border-blue-500/30 p-4 sm:p-6 rounded-2xl relative group">
              <h3 className="text-blue-400 font-bold mb-4 pr-8 text-sm sm:text-base">
                🎯 Phase 3 : L'APPEL À L'ACTION (45-60 Secondes)
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xl text-white font-serif font-bold border-l-4 border-blue-500 pl-4 py-2 bg-midnight/30 rounded-r-lg">
                    "{script.cta}"
                  </p>
                </div>
                <div>
                  <div className="bg-midnight p-4 rounded-lg flex gap-3 text-sm text-sand/80 font-mono">
                    <FaVideo className="text-blue-400 mt-1 flex-shrink-0" />
                    {script.visualPromptForCta}
                  </div>
                </div>
              </div>
            </div>

            {/* HASHTAGS */}
            <div className="bg-midnight-light/30 border border-white/5 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {script.hashtags.map((tag: string, index: number) => (
                  <span key={index} className="bg-midnight px-3 py-1 rounded-full text-sand/70 text-sm border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
              <button onClick={() => copyToClipboard(script.hashtags.join(" "), 'tags')} className="text-sand/50 hover:text-gold">
                {copiedSection === 'tags' ? <FaCheck className="text-green-400" /> : <FaCopy />}
              </button>
            </div>

            {/* SAUVEGARDE */}
            <div className="flex justify-center pt-8 border-t border-white/10">
              <button 
                onClick={handleSaveToPlanning}
                disabled={isSaving}
                className="bg-green-600/20 text-green-400 border border-green-500/50 px-8 py-4 rounded-xl font-bold hover:bg-green-600/40 hover:text-white transition-all flex items-center justify-center gap-3 w-full sm:w-auto shadow-[0_0_15px_rgba(34,197,94,0.2)] disabled:opacity-50"
              >
                <FaSave className="text-xl" /> {isSaving ? "Sauvegarde en cours..." : "Enregistrer ce script dans le Planning"}
              </button>
            </div>

          </motion.div>
        )}

        {/* CALENDRIER INTERACTIF TIKTOK */}
        <div className="mt-20 bg-midnight-light/50 border border-gold/10 p-6 rounded-2xl backdrop-blur-sm relative z-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h2 className="text-2xl font-serif text-sand-light font-bold flex items-center gap-3">
              <FaList className="text-gold" /> Planning Editorial (Semaine)
            </h2>
            
            <div className="flex gap-2 items-center bg-midnight border border-white/10 rounded-lg p-1">
              <button 
                className="px-3 py-1.5 text-xs text-sand-light hover:bg-white/5 rounded-md transition-colors"
                onClick={() => {
                  const d = new Date(viewStartDate);
                  d.setDate(d.getDate() - 7);
                  setViewStartDate(d);
                }}
              >
                ← Semaine préc.
              </button>
              <span className="text-sm font-bold text-gold px-2">
                {viewStartDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} - {new Date(viewStartDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              <button 
                className="px-3 py-1.5 text-xs text-sand-light hover:bg-white/5 rounded-md transition-colors"
                onClick={() => {
                  const d = new Date(viewStartDate);
                  d.setDate(d.getDate() + 7);
                  setViewStartDate(d);
                }}
              >
                Semaine suiv. →
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-white/5 rounded-xl bg-midnight/30">
            <div style={{ display: 'grid', gridTemplateColumns: `50px repeat(7, minmax(140px, 1fr))` }}>
              {/* Header Jours */}
              <div className="bg-white/5 border-b border-r border-white/5" />
              {daysArray.map((d, i) => {
                const isToday = new Date().toDateString() === d.toDateString();
                return (
                  <div key={i} className={`text-center py-3 text-xs border-b border-r border-white/5 font-bold ${isToday ? 'text-gold bg-gold/5' : 'text-sand/70'}`}>
                    {d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}
                  </div>
                );
              })}

              {/* Lignes Heures */}
              {timeSlots.map(hour => (
                <React.Fragment key={hour}>
                  <div className="flex items-center justify-end pr-2 text-[10px] text-sand/50 font-bold border-b border-r border-white/5 bg-white/5 h-16">
                    {hour}:00
                  </div>
                  {daysArray.map((d, i) => {
                    // Trouver les scripts pour cette heure et ce jour
                    const scriptsForSlot = planning.filter(p => {
                      if (!p.date_planification) return false;
                      const pDate = new Date(p.date_planification);
                      return pDate.getFullYear() === d.getFullYear() && pDate.getMonth() === d.getMonth() && pDate.getDate() === d.getDate() && pDate.getHours() === hour;
                    });

                    return (
                      <div 
                        key={i} 
                        className="border-b border-r border-white/5 h-16 relative p-1"
                        onDragOver={onDragOver}
                        onDrop={(e) => {
                          const targetDate = new Date(d);
                          targetDate.setHours(hour, 0, 0, 0);
                          onDrop(e, targetDate);
                        }}
                      >
                        {scriptsForSlot.map(script => (
                          <div 
                            key={script.id}
                            draggable
                            onDragStart={(e) => onDragStart(e, script.id)}
                            onClick={() => openPopup(script)}
                            className={`absolute inset-1 p-1.5 rounded-lg border cursor-pointer hover:border-gold/50 transition-all text-[10px] flex flex-col justify-between overflow-hidden shadow-sm ${
                              script.statut === 'Publié' ? 'bg-green-900/30 border-green-500/30' : 'bg-midnight border-white/10'
                            }`}
                          >
                            <div className="font-bold text-sand-light truncate">{script.titre_source}</div>
                            <div className="text-sand/50 truncate italic mt-0.5">"{script.hook ? script.hook.substring(0, 25) : 'Sans accroche'}..."</div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* POPUP EDITION */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={() => setSelectedItem(null)}
            >
              <div 
                className="bg-midnight border border-gold/20 rounded-2xl w-full max-w-3xl shadow-2xl flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center rounded-t-2xl">
                  <div>
                    <h3 className="text-lg font-serif text-gold font-bold">Script : {selectedItem.titre_source}</h3>
                    <p className="text-xs text-sand/50">Planifié le : {selectedItem.date_planification ? new Date(selectedItem.date_planification).toLocaleString('fr-FR') : 'Non défini'}</p>
                  </div>
                  <button onClick={() => setSelectedItem(null)} className="text-sand/50 hover:text-white text-2xl leading-none">&times;</button>
                </div>
                
                <div className="p-6 overflow-y-auto space-y-6 text-sm text-sand-light flex-1 custom-scrollbar">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-gold uppercase tracking-widest font-bold mb-2 block">Accroche (Hook)</label>
                        <textarea 
                          value={editHook} 
                          onChange={(e) => setEditHook(e.target.value)}
                          className="w-full bg-midnight-light border border-gold/30 rounded-xl p-4 text-sand-light outline-none focus:border-gold h-20"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gold uppercase tracking-widest font-bold mb-2 block">Développement (Body)</label>
                        <textarea 
                          value={editBodyStr} 
                          onChange={(e) => setEditBodyStr(e.target.value)}
                          className="w-full bg-midnight-light border border-gold/30 rounded-xl p-4 text-sand-light outline-none focus:border-gold h-48"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gold uppercase tracking-widest font-bold mb-2 block">Appel à l'action (CTA)</label>
                        <textarea 
                          value={editCta} 
                          onChange={(e) => setEditCta(e.target.value)}
                          className="w-full bg-midnight-light border border-gold/30 rounded-xl p-4 text-sand-light outline-none focus:border-gold h-20"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <h4 className="text-xs text-gold uppercase tracking-widest font-bold mb-2">Accroche (Hook)</h4>
                        <p className="italic">"{selectedItem.hook}"</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <h4 className="text-xs text-gold uppercase tracking-widest font-bold mb-2">Développement</h4>
                        <p className="whitespace-pre-wrap leading-relaxed">{selectedItem.body_json && Array.isArray(selectedItem.body_json) ? selectedItem.body_json.map((p:any)=>p.text).join('\n\n') : JSON.stringify(selectedItem.body_json)}</p>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <h4 className="text-xs text-gold uppercase tracking-widest font-bold mb-2">Appel à l'action</h4>
                        <p>"{selectedItem.cta}"</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-white/5 p-4 border-t border-white/10 flex flex-wrap gap-3 justify-end rounded-b-2xl">
                  {isEditing ? (
                    <>
                      <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm text-sand/70 hover:text-white transition-colors">Annuler</button>
                      <button onClick={saveEdit} className="px-6 py-2 text-sm bg-green-600/20 text-green-400 border border-green-500/50 rounded-lg hover:bg-green-600/40 transition-colors font-bold">Sauvegarder</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-sm border border-gold/30 text-gold rounded-lg hover:bg-gold/10 transition-colors">📝 Modifier le script</button>
                      
                      <button 
                        onClick={() => toggleStatus(selectedItem.id, selectedItem.statut)} 
                        className={`px-4 py-2 text-sm border rounded-lg transition-colors ${selectedItem.statut === 'Planifié' ? 'border-green-500/50 text-green-400 hover:bg-green-500/10' : 'border-gold/50 text-gold hover:bg-gold/10'}`}
                      >
                        {selectedItem.statut === 'Planifié' ? '✅ Marquer comme Publié' : '🔄 Remettre en Planifié'}
                      </button>
                      
                      <button onClick={() => deleteScript(selectedItem.id)} className="px-4 py-2 text-sm border border-red-500/50 text-red-500 rounded-lg hover:bg-red-500/10 transition-colors">🗑️ Supprimer</button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
