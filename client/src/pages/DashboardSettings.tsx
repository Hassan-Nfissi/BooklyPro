import React, { useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Settings, Save } from 'lucide-react';

export const DashboardSettings: React.FC = () => {
  const { business, refreshUser } = useAuth();

  const [name, setName] = useState(business?.name || '');
  const [slug, setSlug] = useState(business?.slug || '');
  const [category, setCategory] = useState(business?.category || 'hair_salon');
  const [city, setCity] = useState(business?.city || 'Casablanca');
  const [address, setAddress] = useState(business?.address || '');
  const [phone, setPhone] = useState(business?.phone || '');
  const [description, setDescription] = useState(business?.description || '');
  const [advanceNoticeHours, setAdvanceNoticeHours] = useState(business?.advanceNoticeHours?.toString() || '2');
  const [bookingHorizonDays, setBookingHorizonDays] = useState(business?.bookingHorizonDays?.toString() || '30');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/owner/business', {
        name,
        slug,
        category,
        city,
        address,
        phone,
        description,
        advanceNoticeHours: parseInt(advanceNoticeHours, 10),
        bookingHorizonDays: parseInt(bookingHorizonDays, 10),
      });
      alert('Paramètres enregistrés avec succès !');
      refreshUser();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Paramètres de l'entreprise</h1>
        <p className="text-sm text-slate-500 mt-1">Gérez vos coordonnées, adresse, politique d'annulation et règles de réservation</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nom de l'établissement</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Lien personnalisé (Slug)</label>
              <div className="flex items-center">
                <span className="text-xs text-slate-400 bg-slate-50 px-3 py-2 border border-r-0 border-slate-200 rounded-l-xl">/book/</span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-r-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Ville</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Téléphone de contact</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+212 5..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Adresse complète</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="ex. 12 Boulevard Hassan II"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Règles de réservation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Délai minimum avant réservation (heures)</label>
                <input
                  type="number"
                  min="0"
                  value={advanceNoticeHours}
                  onChange={(e) => setAdvanceNoticeHours(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">Exemple : 2 heures avant pour éviter les réservations de dernière minute.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Horizon maximum de réservation (jours)</label>
                <input
                  type="number"
                  min="1"
                  value={bookingHorizonDays}
                  onChange={(e) => setBookingHorizonDays(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">Exemple : 30 jours dans le futur.</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Enregistrer les paramètres</span>
          </button>
        </form>
      </div>
    </div>
  );
};
