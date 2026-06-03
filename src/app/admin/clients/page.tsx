"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiPlus, FiUser, FiCalendar, FiDollarSign, FiEdit2 } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ClientsAdminPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [profil, setProfil] = useState("Femme");
  const [duree, setDuree] = useState("30 Jours");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch("/api/admin/coaching-clients");
      if (res.ok) {
        const data = await res.json();
        setClients(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/coaching-clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, profil, duree_programme: duree }),
      });
      if (res.ok) {
        setShowAddForm(false);
        setNom("");
        setEmail("");
        fetchClients();
      } else {
        alert("Erreur lors de la création du client.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-serif text-gray-800 dark:text-cream">Dossiers Clients</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Gérez vos accompagnements sur-mesure</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gold-500 hover:bg-gold-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-gold-500/25"
        >
          <FiPlus />
          Nouveau Client
        </button>
      </div>

      {showAddForm && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-800 p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-xl"
        >
          <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-cream">Créer un nouveau dossier</h2>
          <form onSubmit={handleAddClient} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nom complet</label>
              <input required type="text" value={nom} onChange={(e) => setNom(e.target.value)} className="w-full bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email (pour l'envoi du lien secret)</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Profil</label>
              <select value={profil} onChange={(e) => setProfil(e.target.value)} className="w-full bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none">
                <option value="Femme">Femme</option>
                <option value="Homme">Homme</option>
                <option value="Famille">Famille</option>
                <option value="Groupe">Groupe</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Durée du Programme</label>
              <select value={duree} onChange={(e) => setDuree(e.target.value)} className="w-full bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-gray-800 dark:text-white focus:ring-2 focus:ring-gold-500 outline-none">
                <option value="30 Jours">30 Jours</option>
                <option value="3 Mois">3 Mois</option>
                <option value="12 Mois">12 Mois (Très avancé)</option>
              </select>
            </div>
            <div className="md:col-span-2 flex justify-end gap-4 mt-4">
              <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white">Annuler</button>
              <button type="submit" className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-gold-500/25">Créer le dossier</button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Liste des Clients */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Chargement des dossiers...</div>
        ) : clients.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-50 dark:bg-dark-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUser className="text-2xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-cream mb-2">Aucun dossier client</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Commencez par créer votre premier accompagnement.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-dark-900/50 text-left border-b border-gray-100 dark:border-white/10">
                  <th className="p-6 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Client</th>
                  <th className="p-6 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Programme</th>
                  <th className="p-6 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Paiement</th>
                  <th className="p-6 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Lien Secret</th>
                  <th className="p-6 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 font-bold">
                          {client.nom.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-cream">{client.nom} {client.prenom}</p>
                          <p className="text-sm text-gray-500">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center w-max px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          {client.profil}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <FiCalendar className="text-xs" /> {client.duree_programme}
                        </span>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                        client.statut_paiement === 'En attente' 
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                          : client.statut_paiement === 'Payé'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                      }`}>
                        <FiDollarSign /> {client.statut_paiement}
                      </span>
                    </td>
                    <td className="p-6">
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(`${window.location.origin}/espace/${client.token_acces}`);
                          alert('Lien secret copié dans le presse-papier !');
                        }}
                        className="text-sm text-gold-500 hover:text-gold-600 underline underline-offset-4"
                      >
                        Copier le lien d'accès
                      </button>
                    </td>
                    <td className="p-6 text-right">
                      <Link href={`/admin/clients/${client.id}`} className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                        <FiEdit2 />
                        Éditer Programme (Glisser-Déposer)
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
