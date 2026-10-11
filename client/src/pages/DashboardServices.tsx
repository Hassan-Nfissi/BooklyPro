import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { ServiceItem } from '../types';
import { Plus, Clock, Edit2 } from 'lucide-react';

export const DashboardServices: React.FC = () => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceMad, setPriceMad] = useState('150');
  const [durationMinutes, setDurationMinutes] = useState('45');
  const [bufferMinutes, setBufferMinutes] = useState('15');

  const fetchServices = async () => {
    try {
      const res = await api.get('/owner/services');
      setServices(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openCreate = () => {
    setEditingService(null);
    setName('');
    setDescription('');
    setPriceMad('150');
    setDurationMinutes('45');
    setBufferMinutes('15');
    setShowModal(true);
  };

  const openEdit = (s: ServiceItem) => {
    setEditingService(s);
    setName(s.name);
    setDescription(s.description || '');
    setPriceMad(s.priceMad.toString());
    setDurationMinutes(s.durationMinutes.toString());
    setBufferMinutes(s.bufferMinutes.toString());
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        description,
        priceMad: parseFloat(priceMad),
        durationMinutes: parseInt(durationMinutes, 10),
        bufferMinutes: parseInt(bufferMinutes, 10),
      };

      if (editingService) {
        await api.put(`/owner/services/${editingService.id}`, payload);
      } else {
        await api.post('/owner/services', payload);
      }

      setShowModal(false);
      fetchServices();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erreur lors de l’enregistrement');
    }
  };

  const toggleStatus = async (id: string) => {
    try {
      await api.patch(`/owner/services/${id}/status`);
      fetchServices();
    } catch (err) {
      alert('Erreur lors du changement de statut');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Services & Tarifs</h1>
          <p className="text-sm text-slate-500 mt-1">Configurez les prestations que vos clients peuvent réserver en ligne</p>
        </div>

        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 bg-teal-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-teal-700 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter un service</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400">Chargement des prestations...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div key={s.id} className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-slate-900 text-base">{s.name}</h3>
                  <button
                    onClick={() => toggleStatus(s.id)}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full cursor-pointer ${
                      s.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {s.active ? 'Actif' : 'Désactivé'}
                  </button>
                </div>

                <p className="text-xs text-slate-500 mb-4 line-clamp-2">{s.description || 'Aucune description'}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-lg font-extrabold text-teal-700">{s.priceMad} MAD</span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{s.durationMinutes} min (+{s.bufferMinutes}m pause)</span>
                  </div>
                </div>

                <button
                  onClick={() => openEdit(s)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="font-bold text-slate-900 text-lg mb-4">
              {editingService ? 'Modifier le service' : 'Ajouter un nouveau service'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nom du service</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex. Coupe & Brushing"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Détails du soin..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Prix (MAD)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={priceMad}
                    onChange={(e) => setPriceMad(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Durée (min)</label>
                  <input
                    type="number"
                    required
                    min="5"
                    step="5"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pause (min)</label>
                  <input
                    type="number"
                    min="0"
                    step="5"
                    value={bufferMinutes}
                    onChange={(e) => setBufferMinutes(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-500 font-bold text-sm hover:text-slate-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 text-white font-bold text-sm rounded-xl hover:bg-teal-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
