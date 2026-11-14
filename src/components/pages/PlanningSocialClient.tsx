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

interface PlanningSocialClientProps {
  lockedPlatform?: string;
}

export default function PlanningSocialClient({ lockedPlatform }: PlanningSocialClientProps = {}) {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingBatch, setGeneratingBatch] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("Toutes");
  const [filterPlatform, setFilterPlatform] = useState<string>(lockedPlatform || "Tous");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(lockedPlatform ? [lockedPlatform] : ["linkedin_perso", "linkedin_page", "X"]);
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
  
  const filteredPublications = publications.filter(p => {
    const catMatch = filterCategory === "Toutes" || p.theme === filterCategory;
    let platMatch = filterPlatform === "Tous";
    if (!platMatch && p.platforms) {
      if (filterPlatform === "linkedin_perso" && (p.platforms.includes("linkedin") || p.platforms.includes("linkedin_perso"))) {
        platMatch = true;
      } else {
        platMatch = p.platforms.includes(filterPlatform);
      }
    }
    return catMatch && platMatch;
  });

  const platformFilterOptions = [
    { id: "Tous", label: "Tous les réseaux" },
    { id: "linkedin_perso", label: "LinkedIn (Mounir)" },
    { id: "linkedin_page", label: "LinkedIn (Page BLF)" },
    { id: "X", label: "X (Twitter)" },
    { id: "tiktok", label: "TikTok" },
    { id: "instagram", label: "Instagram" },
    { id: "facebook", label: "Facebook" }
  ];

  const availablePlatforms = [
    { id: "linkedin_perso", label: "LinkedIn (Mounir)" },
    { id: "linkedin_page", label: "LinkedIn (Page BLF)" },
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

  const publishNow = async (id: string, content: string, platforms: string[]) => {
    if (!confirm("Voulez-vous forcer la publication immédiate sur les réseaux (sans attendre la date planifiée) ?")) return;
    
    try {
      const res = await fetch("/api/admin/social/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, content, platforms })
      });
      const data = await res.json();
      
      if (data.success) {
        alert(data.message || "Publication expédiée avec succès !");
        if (selectedPub && selectedPub.id === id) {
          setSelectedPub({ ...selectedPub, status: "published" });
        }
        fetchPublications();
      } else {
        alert("Erreur: " + data.error);
      }
    } catch (e) {
      alert("Erreur technique lors de la publication.");
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
    if (!platforms || platforms.length === 0) return "bg-surface/50 border-border text-cream-muted";
    if ((platforms.includes("linkedin") || platforms.includes("linkedin_perso")) && platforms.includes("X")) return "bg-[#0A66C2]/10 border-gold/30 text-cream";
    if (platforms.includes("linkedin_page")) return "bg-sky-500/10 border-sky-500/40 text-sky-700 font-bold";
    if (platforms.includes("tiktok")) return "bg-pink-500/10 border-pink-500/30 text-pink-700";
    if (platforms.includes("instagram")) return "bg-purple-500/10 border-purple-500/30 text-purple-700";
    if (platforms.includes("facebook")) return "bg-blue-600/10 border-blue-600/30 text-blue-700";
    if (platforms.includes("linkedin") || platforms.includes("linkedin_perso")) return "bg-[#0A66C2]/10 border-[#0A66C2]/30 text-[#0A66C2] font-bold";
    if (platforms.includes("X")) return "bg-zinc-500/10 border-zinc-500/50 text-zinc-700 font-bold";
    return "bg-surface/50 border-border text-cream";
  };

  // Heures affichées dans le planning (6h - 22h)
  const timeSlots: { hour: number; half: boolean }[] = [];
  for (let h = 6; h <= 22; h++) {
    timeSlots.push({ hour: h, half: false });
    if (h < 22) timeSlots.push({ hour: h, half: true });
  }

  const getPubsForSlot = (date: Date, hour: number, half: boolean) => {
    return filteredPublications.filter(p => {
      const pDate = new Date(p.scheduled_for);
      if (pDate.getFullYear() !== date.getFullYear() || pDate.getMonth() !== date.getMonth() || pDate.getDate() !== date.getDate()) return false;
      const pH = pDate.getHours();
      const pM = pDate.getMinutes();
      if (half) return pH === hour && pM >= 30;
      return pH === hour && pM < 30;
    });
  };

  const renderMonthCell = (date: Date) => {
    const isToday = new Date().toDateString() === date.toDateString();
    const dayPubs = filteredPublications.filter(p => {
      const pDate = new Date(p.scheduled_for);
      return pDate.getFullYear() === date.getFullYear() && pDate.getMonth() === date.getMonth() && pDate.getDate() === date.getDate();
    });
    return (
      <div key={date.toISOString()} className={`border ${isToday ? 'border-gold/50 bg-gold/5' : 'border-border bg-surface/30'} p-2 rounded-sm min-h-[100px] flex flex-col`} onDragOver={onDragOver} onDrop={(e) => onDrop(e, date)}>
        <div className={`text-center font-bold mb-1 ${isToday ? 'text-gold' : 'text-cream-muted'} text-[10px]`}>
          {date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}
        </div>
        <div className="flex-1 space-y-1 overflow-y-auto">
          {dayPubs.map(pub => {
            let statusDot = "bg-zinc-500";
            if (pub.status === "pending_validation") statusDot = "bg-gold";
            else if (pub.status === "approved") statusDot = "bg-emerald";
            return (
              <div key={pub.id} draggable onDragStart={(e) => onDragStart(e, pub.id)} onClick={() => openPopup(pub)} className={`p-1 rounded-sm border cursor-pointer hover:border-gold/50 transition-all ${getPlatformColors(pub.platforms)} relative text-[10px] shadow-sm`}>
                <div className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${statusDot}`} />
                <div className="font-bold text-cream truncate pr-3">{pub.titre}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderTimeGrid = () => {
    const days = getDaysArray();
    const colCount = days.length;
    const gridCols = `56px repeat(${colCount}, 1fr)`;
    return (
      <div className="overflow-x-auto border border-border rounded-sm">
        {/* Header row with day names */}
        <div style={{ display: 'grid', gridTemplateColumns: gridCols }}>
          <div style={{ width: 56 }} className="bg-surface/50 border-b border-border border-r border-r-border/30" />
          {days.map(d => {
            const isToday = new Date().toDateString() === d.toDateString();
            return (
              <div key={d.toISOString()} className={`text-center py-2 text-xs font-bold border-b border-border ${isToday ? 'text-gold bg-gold/5' : 'text-cream-muted'}`}>
                {d.toLocaleDateString('fr-FR', { weekday: colCount === 1 ? 'long' : 'short', day: 'numeric', month: 'short' })}
              </div>
            );
          })}
        </div>
        {/* Time rows */}
        <div style={{ display: 'grid', gridTemplateColumns: gridCols }}>
          {timeSlots.map(slot => (
            <React.Fragment key={`${slot.hour}-${slot.half}`}>
              {/* Time label */}
              <div 
                className={`flex items-start justify-end pr-2 border-r border-r-border/30 bg-surface/30 ${slot.half ? 'border-t border-t-border/20' : 'border-t border-t-border/60'}`}
                style={{ height: slot.half ? 28 : 44 }}
              >
                {!slot.half && (
                  <span className="text-[11px] font-bold text-cream mt-1">{String(slot.hour).padStart(2, '0')}:00</span>
                )}
                {slot.half && (
                  <span className="text-[9px] text-cream-muted/50 mt-0.5">30</span>
                )}
              </div>
              {/* Day cells for this time slot */}
              {days.map(d => {
                const pubs = getPubsForSlot(d, slot.hour, slot.half);
                return (
                  <div
                    key={`${d.toISOString()}-${slot.hour}-${slot.half}`}
                    className={`relative ${slot.half ? 'border-t border-dashed border-t-border/15' : 'border-t border-t-border/40'} border-l border-l-border/20`}
                    style={{ height: slot.half ? 28 : 44 }}
                    onDragOver={onDragOver}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (!draggedPubId) return;
                      const nd = new Date(d);
                      nd.setHours(slot.hour, slot.half ? 30 : 0, 0, 0);
                      setPublications(prev => prev.map(p => p.id === draggedPubId ? { ...p, scheduled_for: nd.toISOString() } : p));
                      fetch("/api/admin/publications", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: draggedPubId, scheduled_for: nd.toISOString() }) }).catch(console.error);
                      setDraggedPubId(null);
                    }}
                  >
                    {pubs.map(pub => {
                      let statusDot = "bg-zinc-500";
                      if (pub.status === "pending_validation") statusDot = "bg-gold";
                      else if (pub.status === "approved") statusDot = "bg-emerald";
                      return (
                        <div
                          key={pub.id}
                          draggable
                          onDragStart={(e) => onDragStart(e, pub.id)}
                          onClick={() => openPopup(pub)}
                          className={`absolute inset-x-0.5 top-0.5 bottom-0.5 p-1 rounded border cursor-pointer hover:border-gold/50 transition-all ${getPlatformColors(pub.platforms)} z-10 overflow-hidden shadow-sm`}
                        >
                          <div className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${statusDot}`} />
                          <div className="font-bold text-cream text-[10px] truncate pr-3">{pub.titre}</div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  if (loading) return <div className="text-center py-10 text-cream">Chargement de l'Agent Autonome...</div>;

  return (
    <div className="space-y-4 animate-fade-in relative">
      
      {/* TOP BAR — Titre + Métriques horizontales */}
      <div className="bg-surface/30 border border-border p-4 rounded-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
          <div>
            <h2 className="text-lg font-heading text-cream flex items-center gap-2">
              🧠 Agent Stratège <span className="text-xs text-cream-muted font-normal">(Autonome)</span>
            </h2>
            <p className="text-[11px] text-cream-muted mt-0.5">
              L'IA analyse, planifie et publie. Sélectionnez une catégorie pour orienter la génération.
            </p>
          </div>
          <span className="text-[10px] text-cream-muted italic shrink-0">Analyse &amp; Génération par Mistral-Large</span>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {metrics.error ? (
            <div className="col-span-2 bg-midnight border border-red-500/30 p-3 rounded">
              <div className="text-xs text-red-400 uppercase">Données Réelles (API)</div>
              <div className="text-sm font-bold text-red-500 mt-1">{metrics.error}</div>
            </div>
          ) : (
            <>
              <div className="bg-midnight border border-border p-3 rounded">
                <div className="text-[10px] text-cream-muted uppercase">Vues (Réelles)</div>
                <div className="text-xl font-bold text-gold">{loadingMetrics ? "..." : metrics.views}</div>
              </div>
              <div className="bg-midnight border border-border p-3 rounded">
                <div className="text-[10px] text-cream-muted uppercase">Tendance</div>
                <div className={`text-xl font-bold ${metrics.engagementTrend === 'up' ? 'text-emerald' : 'text-red-400'}`}>
                  {loadingMetrics ? "..." : (metrics.engagementTrend === 'up' ? '↗ Hausse' : '↘ Baisse')}
                </div>
              </div>
            </>
          )}
          {metrics.topPost && !metrics.error && (
            <div className="bg-emerald/10 border border-emerald/30 p-3 rounded">
              <span className="text-emerald font-bold uppercase block text-[10px] mb-1">↑ Top Post</span>
              <p className="text-cream text-[11px] italic line-clamp-2">"{metrics.topPost}"</p>
            </div>
          )}
          {metrics.flopPost && !metrics.error && (
            <div className="bg-red-500/10 border border-red-500/30 p-3 rounded">
              <span className="text-red-400 font-bold uppercase block text-[10px] mb-1">↓ Flop Post</span>
              <p className="text-cream text-[11px] italic line-clamp-2">"{metrics.flopPost}"</p>
            </div>
          )}
        </div>

        {/* IA Analysis */}
        {metrics.analysis && !metrics.error && (
          <div className="bg-midnight p-3 rounded border border-border mt-3">
            <span className="text-gold font-bold text-[10px] uppercase block mb-1">🧠 Déduction de l'Agent</span>
            <p className="text-cream-muted leading-relaxed text-xs">{metrics.analysis}</p>
          </div>
        )}
      </div>

      {/* MAIN LAYOUT: Sidebar + Calendar */}
      <div className="flex flex-col lg:flex-row gap-4">
        
        {/* SIDEBAR — Contrôles */}
        <div className="lg:w-64 shrink-0 space-y-4">
          {/* Catégorie */}
          <div className="bg-surface/30 border border-border p-4 rounded-sm">
            <div className="text-[10px] text-cream-muted uppercase tracking-wider mb-2 font-bold">Catégorie cible</div>
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-midnight text-cream border border-border rounded p-2 text-xs outline-none focus:border-gold/50"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Réseau (filtre) */}
          {!lockedPlatform && (
            <div className="bg-surface/30 border border-border p-4 rounded-sm">
              <div className="text-[10px] text-cream-muted uppercase tracking-wider mb-2 font-bold">Réseau</div>
              <select 
                value={filterPlatform} 
                onChange={(e) => setFilterPlatform(e.target.value)}
                className="w-full bg-midnight text-cream border border-border rounded p-2 text-xs outline-none focus:border-gold/50"
              >
                {platformFilterOptions.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
              </select>
            </div>
          )}

          {/* Réseaux pour la génération */}
          {!lockedPlatform && (
            <div className="bg-surface/30 border border-border p-4 rounded-sm">
              <div className="text-[10px] text-cream-muted uppercase tracking-wider mb-2 font-bold">Générer pour</div>
              <div className="flex flex-wrap gap-2">
                {availablePlatforms.map(p => {
                  const isSelected = selectedPlatforms.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => togglePlatform(p.id)}
                      className={`px-2 py-1 text-[10px] rounded border transition-all ${
                        isSelected
                          ? 'bg-gold/20 border-gold/50 text-gold font-bold'
                          : 'border-border text-cream-muted hover:border-gold/30'
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Button onClick={handleGenerateBatch} variant="primary" className="w-full py-3 px-4 text-sm shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              {generatingBatch ? "Réflexion..." : "⚡ Générer la Stratégie"}
            </Button>
            
            {(!lockedPlatform || lockedPlatform === "linkedin_perso" || lockedPlatform === "linkedin_page") && (
              <a href="/api/admin/social/linkedin/auth" className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#0A66C2] text-white text-xs font-bold rounded hover:bg-[#004182] transition shadow-md">
                🔗 Connecter LinkedIn
              </a>
            )}

            {(!lockedPlatform || lockedPlatform === "facebook") && (
              <a href="/api/admin/social/facebook/auth" className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#1877F2] text-white text-xs font-bold rounded hover:bg-[#166FE5] transition shadow-md mt-2">
                🔗 Connecter Facebook
              </a>
            )}
          </div>

          {/* Légende */}
          <div className="bg-surface/30 border border-border p-3 rounded-sm">
            <div className="text-[10px] text-cream-muted uppercase tracking-wider mb-2 font-bold">Légende</div>
            <div className="space-y-1.5 text-[10px] text-cream-muted">
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-[#0A66C2] rounded"></div> LinkedIn (Mounir)</span>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-sky-600 rounded"></div> LinkedIn (Page BLF)</span>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-zinc-400 rounded"></div> X</span>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded"></div> Instagram</span>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-cyan-500 border border-pink-500 rounded"></div> TikTok</span>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-blue-600 rounded"></div> Facebook</span>
              <div className="border-t border-border my-2"></div>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-gold rounded"></div> En validation</span>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 bg-emerald rounded"></div> Approuvé</span>
            </div>
          </div>
        </div>

        {/* CALENDAR — Zone principale */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <div className="flex gap-2 bg-surface p-1 rounded-sm border border-border">
              <button 
                onClick={() => {
                  setViewMode('day');
                  setStartDate(new Date());
                }}
                className={`px-3 py-1 text-xs rounded-sm transition ${viewMode === 'day' ? 'bg-gold/20 text-gold' : 'text-cream-muted hover:text-cream'}`}
              >
                Jour
              </button>
              <button 
                onClick={() => setViewMode('week')}
                className={`px-3 py-1 text-xs rounded-sm transition ${viewMode === 'week' ? 'bg-gold/20 text-gold' : 'text-cream-muted hover:text-cream'}`}
              >
                Semaine
              </button>
              <button 
                onClick={() => {
                  setViewMode('month');
                  const d = new Date(startDate);
                  setStartDate(d);
                }}
                className={`px-3 py-1 text-xs rounded-sm transition ${viewMode === 'month' ? 'bg-gold/20 text-gold' : 'text-cream-muted hover:text-cream'}`}
              >
                Mois
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
                ←
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
                →
              </Button>
            </div>
          </div>

          {viewMode === 'month' ? (
            <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
              {getDaysArray().map(date => renderMonthCell(date))}
            </div>
          ) : (
            renderTimeGrid()
          )}
        </div>
      </div>

      {/* POPUP MODAL */}
      {selectedPub && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedPub(null)}
        >
          <div 
            className="bg-midnight border border-gold/30 rounded-md w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
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
                  
                  {selectedPub.status !== "approved" && selectedPub.status !== "published" && (
                    <Button onClick={() => updateStatus(selectedPub.id, "approved")} variant="ghost" className="text-sm border-emerald/50 text-emerald hover:bg-emerald/10">✅ Approuver pour plus tard</Button>
                  )}
                  {selectedPub.status === "approved" && (
                    <Button onClick={() => updateStatus(selectedPub.id, "pending_validation")} variant="ghost" className="text-sm border-gold/50 text-gold hover:bg-gold/10">⏳ Mettre en attente</Button>
                  )}
                  
                  {selectedPub.status !== "published" && (
                    <Button onClick={() => publishNow(selectedPub.id, selectedPub.content, selectedPub.platforms)} variant="ghost" className="text-sm border-[#0A66C2]/50 text-[#0A66C2] hover:bg-[#0A66C2]/10 font-bold">🚀 Publier Maintenant</Button>
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
