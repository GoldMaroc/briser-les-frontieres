"use client";

import { useEffect, useState } from "react";
import TopBar from "@/components/ui/TopBar";
import Header from "@/components/layout/Header";

export default function AdminDraftsPage() {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingContent, setEditingContent] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (isAuthenticated) {
      fetchDrafts();
    }
  }, [isAuthenticated]);

  const fetchDrafts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/drafts");
      const data = await res.json();
      if (data.drafts) {
        setDrafts(data.drafts);
        const editingObj: { [key: string]: string } = {};
        data.drafts.forEach((d: any) => {
          editingObj[d.id] = d.content_html;
        });
        setEditingContent(editingObj);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "comes2026") { // Hardcoded simple password for MVP, to change in production
      setIsAuthenticated(true);
    } else {
      alert("Mot de passe incorrect");
    }
  };

  const handleAction = async (draftId: string, action: "approve" | "reject") => {
    if (!confirm(`Êtes-vous sûr de vouloir ${action === 'approve' ? 'APPROUVER ET ENVOYER' : 'REJETER'} ce brouillon ?`)) return;
    
    try {
      const res = await fetch("/api/admin/drafts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          draftId,
          action,
          modifiedContent: editingContent[draftId]
        })
      });
      const data = await res.json();
      if (data.success) {
        alert(action === "approve" ? "Email envoyé avec succès !" : "Brouillon rejeté.");
        fetchDrafts();
      } else {
        alert("Erreur: " + data.error);
      }
    } catch (e) {
      alert("Erreur technique");
    }
  };

  const handleContentChange = (id: string, newContent: string) => {
    setEditingContent(prev => ({ ...prev, [id]: newContent }));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f0ede8] font-sans">
      <TopBar />
      <Header />
      
      <main className="pt-32 pb-20 px-4">
        <div className="w-full mx-auto sm:px-6 lg:px-8">
          <h1 className="text-2xl tracking-[4px] uppercase text-[#d4a853] mb-8 font-light">
            [ Système de Validation IA ]
          </h1>

          {!isAuthenticated ? (
            <div className="border border-white/10 bg-[#0a0a0a] p-8 max-w-md">
              <p className="mb-4 text-sm text-[#a0aec0]">Authentification requise pour accéder aux brouillons générés par l'Ingénierie Comportementale (IA).</p>
              <form onSubmit={handleAuth} className="flex flex-col gap-4">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#111] border border-white/20 p-3 text-white focus:border-[#d4a853] outline-none"
                  placeholder="Mot de passe"
                />
                <button type="submit" className="bg-[#d4a853] text-black font-bold uppercase tracking-widest p-3 hover:bg-[#b08b45] transition-colors">
                  Accéder
                </button>
              </form>
            </div>
          ) : (
            <div>
              {loading ? (
                <p className="text-[#a0aec0]">Recherche de brouillons en attente...</p>
              ) : drafts.length === 0 ? (
                <div className="border border-white/10 bg-[#0a0a0a] p-8 text-center text-[#a0aec0]">
                  Aucun brouillon en attente de validation. Le système est à jour.
                </div>
              ) : (
                <div className="space-y-8">
                  {drafts.map((draft) => (
                    <div key={draft.id} className="border border-[#d4a853]/30 bg-[#0a0a0a] p-6 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-[#d4a853]"></div>
                      
                      <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                        <div>
                          <span className="inline-block px-2 py-1 bg-[#d4a853]/20 text-[#d4a853] text-[10px] uppercase tracking-wider mb-2 border border-[#d4a853]/30">
                            {draft.type === 'newsletter' ? 'Diffusion Massive' : 'Réponse Individuelle'}
                          </span>
                          <h2 className="text-xl font-bold">{draft.subject}</h2>
                          <p className="text-xs text-[#a0aec0] mt-1">Destinataire: {draft.recipient_email}</p>
                          <p className="text-xs text-[#a0aec0]">Créé le: {new Date(draft.created_at).toLocaleString('fr-FR')}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-xs uppercase tracking-widest text-[#a0aec0] mb-2">Contenu HTML (Modifiable) :</label>
                        <textarea 
                          value={editingContent[draft.id] || ""}
                          onChange={(e) => handleContentChange(draft.id, e.target.value)}
                          className="w-full h-64 bg-[#111] border border-white/20 p-4 text-sm font-mono text-[#a0aec0] focus:border-[#d4a853] focus:text-white outline-none"
                        />
                      </div>

                      <div className="mb-6 p-4 border border-white/10 bg-[#050505]">
                        <label className="block text-xs uppercase tracking-widest text-[#a0aec0] mb-2">Aperçu du rendu :</label>
                        <div dangerouslySetInnerHTML={{ __html: editingContent[draft.id] || "" }} className="prose prose-invert max-w-none text-sm"></div>
                      </div>

                      <div className="flex gap-4">
                        <button 
                          onClick={() => handleAction(draft.id, 'approve')}
                          className="flex-1 bg-[#d4a853] text-black font-bold uppercase tracking-widest p-3 hover:bg-[#b08b45] transition-colors"
                        >
                          Approuver & Envoyer
                        </button>
                        <button 
                          onClick={() => handleAction(draft.id, 'reject')}
                          className="px-6 border border-red-500/50 text-red-500 font-bold uppercase tracking-widest hover:bg-red-500/10 transition-colors"
                        >
                          Rejeter
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
