"use client";

import { useState, useEffect } from "react";
import { FaTiktok, FaMagic, FaCopy, FaVideo, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

export default function TikTokStudio() {
  const [publications, setPublications] = useState<any[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [script, setScript] = useState<any>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/publications")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Filtre uniquement les articles avec du contenu
          setPublications(data.publications.filter((p: any) => p.content && p.content.length > 50));
        }
      });
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

  return (
    <div className="relative py-32 bg-midnight min-h-screen">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_30%_0%,var(--color-midnight-light)_0%,var(--color-midnight)_70%)] pointer-events-none" />

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* En-tête */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-transparent rounded-2xl flex items-center justify-center border border-gold/30">
            <FaTiktok className="w-8 h-8 text-gold" />
          </div>
          <div>
            <h1 className="text-3xl font-serif text-sand-light font-bold">TikTok Studio (Faceless)</h1>
            <p className="text-sand/70 mt-2">Générez des scripts viraux et des requêtes d'images IA à partir de vos articles.</p>
          </div>
        </div>

        {/* Sélection */}
        <div className="bg-midnight-light/50 border border-gold/10 p-6 rounded-2xl mb-8 backdrop-blur-sm">
          <label className="block text-sm font-medium text-sand mb-2">1. Sélectionnez l'article source</label>
          <div className="flex gap-4">
            <select 
              className="flex-1 bg-midnight border border-gold/30 rounded-xl px-4 py-3 text-sand focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none"
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
              className="bg-gold text-midnight px-8 py-3 rounded-xl font-bold hover:bg-gold-light transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="bg-gradient-to-r from-red-900/20 to-midnight-light/50 border border-red-500/30 p-6 rounded-2xl relative group">
              <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
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
            <div className="bg-midnight-light/50 border border-gold/20 p-6 rounded-2xl">
              <h3 className="text-gold font-bold mb-4 flex items-center gap-2">
                📖 Phase 2 : LE DÉVELOPPEMENT (3-45 Secondes)
              </h3>
              
              <div className="space-y-6">
                {script.bodyParts.map((part: any, index: number) => (
                  <div key={index} className="grid md:grid-cols-2 gap-6 relative group border-b border-white/5 pb-6 last:border-0 last:pb-0">
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
            <div className="bg-gradient-to-r from-blue-900/20 to-midnight-light/50 border border-blue-500/30 p-6 rounded-2xl relative group">
              <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
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
            <div className="bg-midnight-light/30 border border-white/5 p-4 rounded-xl flex items-center justify-between">
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

          </motion.div>
        )}
      </div>
    </div>
  );
}
