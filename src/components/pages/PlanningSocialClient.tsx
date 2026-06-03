"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

type PubStatus = 'draft' | 'pending_validation' | 'to_modify' | 'approved' | 'published' | 'cancelled';
type PubGoal = 'convertir' | 'informer' | 'fideliser' | 'communaute';

interface Publication {
  id: string;
  titre: string;
  theme: string;
  objectif: PubGoal;
  attente: string;
  content: string;
  platforms: string[];
  status: PubStatus;
  scheduled_for: string;
  created_at: string;
  published_at?: string;
}

export default function PlanningSocialClient() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingBatch, setGeneratingBatch] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("Toutes");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["linkedin", "X"]);
  const [platformTemperatures, setPlatformTemperatures] = useState<Record<string, number>>({
    linkedin: 0.3, X: 0.8, tiktok: 0.7, instagram: 0.6, facebook: 0.5
  });

  // State for the Post Detail Popup
  const [selectedPub, setSelectedPub] = useState<Publication | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Drag and drop state
  const [draggedPubId, setDraggedPubId] = useState<string | null>(null);

  // Vue calendrier (day vs week vs month)
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    // Si semaine, on se cale sur lundi
    const day = d.getDay() || 7; 
    if (day !== 1) d.setHours(-24 * (day - 1));
    return d;
  });

  // Metrics state
  const [metrics, setMetrics] = useState<{ views?: number; clicks?: number; engagementTrend?: string; error?: string; topPost?: string; flopPost?: string; analysis?: string }>({});
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  const getDaysArray = () => {
    const days = [];
    const count = viewMode === "day" ? 1 : viewMode === "week" ? 7 : 28;
    for (let i = 0; i < count; i++) {
      const d = new Date(startDate);
      d.setDate(d.getDate() + i);
      days.push(d);
    }
    return days;
  };

  useEffect(() => {
    fetchPublications();
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoadingMetrics(true);
      const res = await fetch("/api/admin/social/metrics");
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
      } else {
        setMetrics({ error: "Erreur d'accès aux données réelles" });
      }
    } catch (e) {
      setMetrics({ error: "Aucune donnée disponible" });
    } finally {
      setLoadingMetrics(false);
    }
  };

  const fetchPublications = async () => {
    try {
      const res = await fetch("/api/admin/publications");
      if (res.ok) {
        const data = await res.json();
        setPublications(data.publications);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // Hardcoded strategic categories
  const baseCategories = ["Souveraineté", "Khalifa", "Éveil Spirituel", "Discipline (Nafs)", "Méthode C.O.M.E.S", "Offre / Conversion"];
  const dynamicCategories = Array.from(new Set(publications.map(p => p.theme))).filter(c => !baseCategories.includes(c));
  const categories = ["Toutes", ...baseCategories, ...dynamicCategories];
  
  const filteredPublications = filterCategory === "Toutes" ? publications : publications.filter(p => p.theme === filterCategory);

  const availablePlatforms = [
    { id: "linkedin", label: "LinkedIn" },
    { id: "X", label: "X" },
    { id: "tiktok", label: "TikTok" },
    { id: "instagram", label: "Instagram" },
    { id: "facebook", label: "Facebook" }
  ];

  const togglePlatform = (p: string) => {
    if (selectedPlatforms.includes(p)) setSelectedPlatforms(selectedPlatforms.filter(id => id !== p));
    else setSelectedPlatforms([...selectedPlatforms, p]);
  };

  const updateTemperature = (p: string, val: number) => {
    setPlatformTemperatures(prev => ({ ...prev, [p]: val }));
  };

  const handleGenerateBatch = async () => {
    if (selectedPlatforms.length === 0) {
      alert("Veuillez sélectionner au moins un réseau social cible.");
      return;
    }
    if (!confirm("L'IA va analyser vos métriques et générer une douzaine de publications pour le mois à venir. Cela peut prendre 30 secondes. Continuer ?")) return;
    
    setGeneratingBatch(true);
    try {
      const resAI = await fetch("/api/admin/publications/generate-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          metrics, 
          platforms: selectedPlatforms, 
          temperatures: platformTemperatures,
          category: filterCategory !== "Toutes" ? filterCategory : undefined 
        })
      });
      const dataAI = await resAI.json();
      
      if (!resAI.ok) throw new Error(dataAI.error || "Erreur IA");

      const generatedPosts = dataAI.posts;
      
      const now = new Date();
      for (let i = 0; i < generatedPosts.length; i++) {
        const post = generatedPosts[i];
        const postDate = new Date(now);
        postDate.setDate(now.getDate() + (i * 2) + 1);
        postDate.setHours(10, 0, 0, 0);
        
        // Use platforms returned by AI or fallback to selectedPlatforms
        const finalPlatforms = post.platforms || selectedPlatforms;

        await fetch("/api/admin/publications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            theme: filterCategory !== "Toutes" ? filterCategory : (post.theme || "Thème Auto"),
            titre: post.titre || "Sans titre",
            objectif: post.objectif || "informer",
            attente: post.attente || "Engagement",
            platforms: finalPlatforms,
            content: post.content,
            status: "pending_validation",
            scheduled_for: postDate.toISOString(),
          })
        });
      }

      fetchPublications();
      alert("La stratégie a été générée avec succès ! L'agenda est rempli.");
    } catch (e: any) {
      alert("Erreur: " + e.message);
    } finally {
      setGeneratingBatch(false);
    }
  };

  const updateStatus = async (id: string, status: PubStatus) => {
    try {
      await fetch("/api/admin/publications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
      if (selectedPub && selectedPub.id === id) {
        setSelectedPub({ ...selectedPub, status });
      }
      fetchPublications();
    } catch (e) {
      console.error(e);
    }
  };

  const saveEdit = async () => {
    if (!selectedPub) return;
    try {
      await fetch("/api/admin/publications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedPub.id, content: editContent })
      });
      setSelectedPub({ ...selectedPub, content: editContent });
      setIsEditing(false);
      fetchPublications();
    } catch (e) {
      console.error(e);
    }
  };

  const deletePub = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer cette publication ?")) return;
    try {
      await fetch(`/api/admin/publications?id=${id}`, {
        method: "DELETE"
      });
      setSelectedPub(null);
      fetchPublications();
    } catch (e) {
      console.error(e);
    }
  };

  const onDragStart = (e: React.DragEvent, id: string) => {
    setDraggedPubId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault(); 
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = async (e: React.DragEvent, targetDate: Date) => {
    e.preventDefault();
    if (!draggedPubId) return;

    const newDate = new Date(targetDate);
    newDate.setHours(12, 0, 0, 0);

    setPublications(prev => prev.map(p => 
      p.id === draggedPubId ? { ...p, scheduled_for: newDate.toISOString() } : p
    ));

    try {
      await fetch("/api/admin/publications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: draggedPubId, scheduled_for: newDate.toISOString() })
      });
    } catch (err) {
      console.error(err);
      fetchPublications();
    }
    
    setDraggedPubId(null);
  };

  const openPopup = (pub: Publication) => {
    setSelectedPub(pub);
    setEditContent(pub.content);
    setIsEditing(false);
  };

  const getPlatformColors = (platforms: string[]) => {
    if (!platforms || platforms.length === 0) return "bg-surface/50 border-border";
    if (platforms.includes("linkedin") && platforms.includes("X")) return "bg-gradient-to-r from-[#0A66C2]/20 to-zinc-700/40 border-gold/30";
    if (platforms.includes("tiktok")) return "bg-pink-900/10 border-cyan-500/30";
    if (platforms.includes("instagram")) return "bg-gradient-to-br from-purple-900/20 to-pink-600/20 border-pink-500/30";
    if (platforms.includes("facebook")) return "bg-blue-900/20 border-blue-600/30";
    if (platforms.includes("linkedin")) return "bg-[#0A66C2]/10 border-[#0A66C2]/30";
    if (platforms.includes("X")) return "bg-zinc-800/40 border-zinc-600/50";
    return "bg-surface/50 border-border";
  };

  const renderAgendaCell = (date: Date) => {
    const isToday = new Date().toDateString() === date.toDateString();
    
    const dayPubs = filteredPublications.filter(p => {
      const pDate = new Date(p.scheduled_for);
      return pDate.getFullYear() === date.getFullYear() &&
             pDate.getMonth() === date.getMonth() &&
             pDate.getDate() === date.getDate();
    });

    return (
      <div 
        key={date.toISOString()}
        className={`border ${isToday ? 'border-gold/50 bg-gold/5' : 'border-border bg-surface/30'} p-2 rounded-sm ${viewMode === 'week' ? 'min-h-[300px]' : viewMode === 'month' ? 'min-h-[120px]' : 'min-h-[500px]'} flex flex-col transition-all`}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, date)}
      >
        <div className={`text-center font-bold mb-2 ${isToday ? 'text-gold' : 'text-cream-muted'} text-xs`}>
          {date.toLocaleDateString('fr-FR', { weekday: viewMode === 'week' || viewMode === 'day' ? 'long' : 'short', day: 'numeric', month: viewMode === 'week' || viewMode === 'day' ? 'short' : undefined })}
        </div>
        
        <div className="flex-1 space-y-2 overflow-y-auto">
          {dayPubs.map(pub => {
            const platformColor = getPlatformColors(pub.platforms);
            let statusDot = "bg-zinc-500";
            if (pub.status === "pending_validation") statusDot = "bg-gold";
            else if (pub.status === "approved") statusDot = "bg-emerald";

            return (
              <div 
                key={pub.id} 
                draggable
                onDragStart={(e) => onDragStart(e, pub.id)}
                onClick={() => openPopup(pub)}
                className={`p-2 rounded-sm border cursor-pointer hover:border-gold/50 transition-all ${platformColor} relative text-xs shadow-sm`}
              >
                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${statusDot}`} title={pub.status} />
                <div className="font-bold text-cream truncate pr-4">{pub.titre}</div>
                {viewMode !== 'month' && (
                  <div className="text-cream-muted line-clamp-3 mt-1 opacity-90">{pub.content}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) return <div className="text-center py-10 text-cream">Chargement de l'Agent Autonome...</div>;

  return (
    <div className="space-y-6 animate-fade-in relative">
      
      {/* Tableau de bord Analytics & Stratégie */}
      <div className="bg-surface/30 border border-border p-6 rounded-sm flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="flex-1 w-full">
          <h2 className="text-xl font-heading text-cream mb-2 flex items-center gap-2">
            🧠 Agent Stratège (Autonome)
          </h2>
          <p className="text-sm text-cream-muted mb-4">
            L'IA analyse, planifie et publie. Sélectionnez une catégorie pour orienter la génération.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            {metrics.error ? (
              <div className="bg-midnight border border-red-500/30 p-3 rounded flex-1 min-w-[240px]">
                <div className="text-xs text-red-400 uppercase">Données Réelles (API)</div>
                <div className="text-sm font-bold text-red-500 mt-1">{metrics.error}</div>
                <div className="text-[10px] text-cream-muted mt-1">Impossible de récupérer les statistiques officielles.</div>
              </div>
            ) : (
              <>
                <div className="bg-midnight border border-border p-3 rounded flex-1 min-w-[120px]">
                  <div className="text-xs text-cream-muted uppercase">Vues (Réelles)</div>
                  <div className="text-xl font-bold text-gold">{loadingMetrics ? "..." : metrics.views}</div>
                </div>
                <div className="bg-midnight border border-border p-3 rounded flex-1 min-w-[120px]">
                  <div className="text-xs text-cream-muted uppercase">Tendance</div>
                  <div className={`text-xl font-bold ${metrics.engagementTrend === 'up' ? 'text-emerald' : 'text-red-400'}`}>
                    {loadingMetrics ? "..." : (metrics.engagementTrend === 'up' ? '↗ Hausse' : '↘ Baisse')}
                  </div>
                </div>
              </>
            )}
            <div className="bg-midnight border border-border p-3 rounded flex-1 min-w-[150px]">
              <div className="text-xs text-cream-muted uppercase mb-1">Catégorie cible</div>
              <select 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full bg-surface text-cream border border-border rounded p-1 text-xs outline-none focus:border-gold/50 mb-3"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="text-xs text-cream-muted uppercase mb-1">Réseaux cibles</div>
              <div className="flex flex-col gap-3">
                {availablePlatforms.map(p => {
                  const isSelected = selectedPlatforms.includes(p.id);
                  return (
                    <div key={p.id} className="flex flex-col gap-1">
                      <label className="flex items-center gap-2 text-[11px] cursor-pointer hover:text-gold transition font-bold">
                        <input 
                          type="checkbox" 
                          checked={isSelected} 
                          onChange={() => togglePlatform(p.id)}
                          className="accent-gold w-3.5 h-3.5 cursor-pointer"
                        />
                        {p.label}
                      </label>
                      {isSelected && (
                        <div className="pl-6 flex items-center gap-2">
                          <span className="text-[9px] text-cream-muted uppercase w-20">Température</span>
                          <input 
                            type="range" 
                            min="0" max="1" step="0.1" 
                            value={platformTemperatures[p.id] || 0.5}
                            onChange={(e) => updateTemperature(p.id, parseFloat(e.target.value))}
                            className="w-24 accent-gold"
                          />
                          <span className="text-[10px] text-gold font-mono">{platformTemperatures[p.id] || 0.5}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-center gap-3">
          <Button onClick={handleGenerateBatch} variant="primary" className="py-4 px-8 text-sm shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            {generatingBatch ? "Réflexion Stratégique..." : "Générer la Stratégie"}
          </Button>
          
          <a href="/api/admin/social/linkedin/auth" className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-[#0A66C2] text-white text-xs font-bold rounded hover:bg-[#004182] transition shadow-md">
            🔗 Connecter LinkedIn
          </a>
          
          <span className="text-[10px] text-cream-muted mt-1 italic">Analyse & Génération par Mistral-Large</span>
        </div>
      </div>

      {/* IA Performance Analysis */}
      {metrics.analysis && !metrics.error && (
        <div className="bg-surface/30 border border-gold/30 p-4 rounded-sm">
          <h3 className="text-sm font-bold text-gold uppercase tracking-wider mb-3 flex items-center gap-2">
            📊 Analyse Cognitive des Performances
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
            <div className="bg-emerald/10 border border-emerald/30 p-3 rounded">
              <span className="text-emerald font-bold uppercase block mb-1">↑ Top Post (Meilleur engagement)</span>
              <p className="text-cream italic">"{metrics.topPost}"</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 p-3 rounded">
              <span className="text-red-400 font-bold uppercase block mb-1">↓ Flop Post (Moins d'engagement)</span>
              <p className="text-cream italic">"{metrics.flopPost}"</p>
            </div>
          </div>
          <div className="bg-midnight p-3 rounded border border-border">
            <span className="text-gold font-bold text-[10px] uppercase block mb-1">🧠 Déduction de l'Agent</span>
            <p className="text-cream-muted leading-relaxed text-sm">{metrics.analysis}</p>
          </div>
        </div>
      )}

      {/* Agenda Calendar */}
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <div className="flex gap-2 bg-surface p-1 rounded-sm border border-border">
            <button 
              onClick={() => {
                setViewMode('day');
                setStartDate(new Date());
              }}
              className={`px-3 py-1 text-xs rounded-sm transition ${viewMode === 'day' ? 'bg-gold/20 text-gold' : 'text-cream-muted hover:text-cream'}`}
            >
              Vue Jour
            </button>
            <button 
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 text-xs rounded-sm transition ${viewMode === 'week' ? 'bg-gold/20 text-gold' : 'text-cream-muted hover:text-cream'}`}
            >
              Vue Semaine
            </button>
            <button 
              onClick={() => {
                setViewMode('month');
                const d = new Date(startDate);
                setStartDate(d);
              }}
              className={`px-3 py-1 text-xs rounded-sm transition ${viewMode === 'month' ? 'bg-gold/20 text-gold' : 'text-cream-muted hover:text-cream'}`}
            >
              Vue Mois
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <Button 
              variant="ghost" 
              className="px-2 py-1 text-xs border border-border"
              onClick={() => {
                const d = new Date(startDate);
                d.setDate(d.getDate() - (viewMode === 'day' ? 1 : viewMode === 'week' ? 7 : 28));
                setStartDate(d);
              }}
            >
              ← Précédent
            </Button>
            <span className="text-cream text-sm font-bold w-40 text-center">
              {startDate.toLocaleDateString('fr-FR', { day: viewMode === 'day' ? 'numeric' : undefined, month: 'long', year: 'numeric' })}
            </span>
            <Button 
              variant="ghost" 
              className="px-2 py-1 text-xs border border-border"
              onClick={() => {
                const d = new Date(startDate);
                d.setDate(d.getDate() + (viewMode === 'day' ? 1 : viewMode === 'week' ? 7 : 28));
                setStartDate(d);
              }}
            >
              Suivant →
            </Button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
          <div className="flex flex-wrap gap-4 text-[10px] text-cream-muted uppercase tracking-wider">
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-[#0A66C2] rounded"></div> LinkedIn</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-zinc-400 rounded"></div> X</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded"></div> Instagram</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-cyan-500 border border-pink-500 rounded"></div> TikTok</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-600 rounded"></div> Facebook</span>
          </div>
          <div className="flex gap-4 text-[10px] text-cream-muted uppercase tracking-wider">
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-gold rounded"></div> Validation</span>
            <span className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald rounded"></div> Approuvé</span>
          </div>
        </div>

        <div className={`grid gap-2 ${viewMode === 'day' ? 'grid-cols-1' : viewMode === 'week' ? 'grid-cols-1 sm:grid-cols-7' : 'grid-cols-2 sm:grid-cols-7'}`}>
          {getDaysArray().map(date => renderAgendaCell(date))}
        </div>
      </div>

      {/* POPUP MODAL */}
      {selectedPub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-midnight border border-gold/30 rounded-md w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-surface/80 p-4 border-b border-border flex justify-between items-center">
              <h3 className="text-xl font-heading text-gold truncate pr-4">{selectedPub.titre}</h3>
              <button onClick={() => setSelectedPub(null)} className="text-cream-muted hover:text-cream text-2xl leading-none">&times;</button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-cream flex-1">
              {/* IA Reasoning section */}
              <div className="bg-surface/40 p-4 rounded border border-border/50">
                <h4 className="text-xs text-gold uppercase tracking-wider font-bold mb-3">Analyse de l'Agent</h4>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-cream-muted block mb-1">Réseaux Ciblés :</span>
                    <span className="font-bold">{selectedPub.platforms.join(" & ")}</span>
                  </div>
                  <div>
                    <span className="text-cream-muted block mb-1">Thème Stratégique :</span>
                    <span className="font-bold text-cream">{selectedPub.theme}</span>
                  </div>
                  <div>
                    <span className="text-cream-muted block mb-1">Objectif :</span>
                    <span className="font-bold">{selectedPub.objectif}</span>
                  </div>
                  <div>
                    <span className="text-cream-muted block mb-1">Attente (Résultat visé) :</span>
                    <span className="font-bold text-emerald">{selectedPub.attente}</span>
                  </div>
                  <div>
                    <span className="text-cream-muted block mb-1">Date planifiée :</span>
                    <span className="font-bold">{new Date(selectedPub.scheduled_for).toLocaleString("fr-FR")}</span>
                  </div>
                  <div>
                    <span className="text-cream-muted block mb-1">Statut :</span>
                    <span className="font-bold uppercase tracking-wider border px-2 py-0.5 rounded text-[10px] inline-block border-gold text-gold">
                      {selectedPub.status}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs text-cream-muted uppercase tracking-wider mb-2">Contenu de la publication</h4>
                {isEditing ? (
                  <textarea 
                    value={editContent} 
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full bg-surface border border-gold/50 rounded p-4 min-h-[200px] text-cream outline-none focus:ring-1 focus:ring-gold"
                  />
                ) : (
                  <div className="bg-surface/20 border border-border rounded p-4 min-h-[150px] whitespace-pre-wrap leading-relaxed text-cream/90">
                    {selectedPub.content}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-surface/80 p-4 border-t border-border flex flex-wrap gap-3 justify-end">
              {isEditing ? (
                <>
                  <Button onClick={() => setIsEditing(false)} variant="ghost" className="text-sm">Annuler</Button>
                  <Button onClick={saveEdit} variant="primary" className="text-sm bg-emerald text-white border-none hover:bg-emerald/80">Sauvegarder</Button>
                </>
              ) : (
                <>
                  <Button onClick={() => setIsEditing(true)} variant="ghost" className="text-sm border-border hover:border-gold">📝 Modifier</Button>
                  
                  {selectedPub.status !== "approved" && (
                    <Button onClick={() => updateStatus(selectedPub.id, "approved")} variant="ghost" className="text-sm border-emerald/50 text-emerald hover:bg-emerald/10">✅ Approuver</Button>
                  )}
                  {selectedPub.status === "approved" && (
                    <Button onClick={() => updateStatus(selectedPub.id, "pending_validation")} variant="ghost" className="text-sm border-gold/50 text-gold hover:bg-gold/10">⏳ Mettre en attente</Button>
                  )}
                  
                  <Button onClick={() => {
                    alert("L'Agent IA a bien noté que ce sujet est hors sujet. Il ne reproduira plus cette erreur stratégique.");
                    updateStatus(selectedPub.id, "cancelled");
                  }} variant="ghost" className="text-sm border-orange-500/50 text-orange-400 hover:bg-orange-500/10">🚫 Hors Sujet</Button>
                  
                  <Button onClick={() => deletePub(selectedPub.id)} variant="ghost" className="text-sm border-red-500/50 text-red-500 hover:bg-red-500/10">🗑️ Supprimer</Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
