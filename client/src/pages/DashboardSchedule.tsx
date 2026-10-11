import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { WorkingHourItem, TimeOffItem } from '../types';
import { Clock, Plus, Trash2, Calendar } from 'lucide-react';

const WEEKDAYS = [
  { day: 1, label: 'Lundi' },
  { day: 2, label: 'Mardi' },
  { day: 3, label: 'Mercredi' },
  { day: 4, label: 'Jeudi' },
  { day: 5, label: 'Vendredi' },
  { day: 6, label: 'Samedi' },
  { day: 7, label: 'Dimanche' },
];

export const DashboardSchedule: React.FC = () => {
  const [hours, setHours] = useState<WorkingHourItem[]>([]);
  const [timeOff, setTimeOff] = useState<TimeOffItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [startsAt, setStartsAt] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const [reason, setReason] = useState('');
  const [showTimeOffModal, setShowTimeOffModal] = useState(false);

  const fetchData = async () => {
    try {
      const [whRes, toRes] = await Promise.all([
        api.get('/owner/working-hours'),
        api.get('/owner/time-off')
      ]);
      setHours(whRes.data);
      setTimeOff(toRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleHourChange = (weekday: number, field: string, value: any) => {
    setHours((prev) =>
      prev.map((h) => (h.weekday === weekday ? { ...h, [field]: value } : h))
    );
  };

  const saveHours = async () => {
    try {
      await api.put('/owner/working-hours', { hours });
      alert('Horaires enregistrés avec succès !');
    } catch (err) {
      alert('Erreur lors de la sauvegarde des horaires');
    }
  };

  const addTimeOff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/owner/time-off', { startsAt, endsAt, reason });
      setShowTimeOffModal(false);
      setStartsAt('');
      setEndsAt('');
      setReason('');
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Erreur lors de l’ajout du congé');
    }
  };

  const deleteTimeOff = async (id: string) => {
    if (!confirm('Supprimer cette période de fermeture ?')) return;
    try {
      await api.delete(`/owner/time-off/${id}`);
      fetchData();
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Horaires & Congés</h1>
        <p className="text-sm text-slate-500 mt-1">Configurez vos plages d'ouverture hebdomadaires et vos congés exceptionnels</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-teal-600" />
          <span>Horaires d'ouverture hebdomadaires</span>
        </h2>

        <div className="space-y-3">
          {WEEKDAYS.map(({ day, label }) => {
            const h = hours.find((x) => x.weekday === day) || {
              weekday: day,
              startTime: '09:00',
              endTime: '19:00',
              closed: false,
            };

            return (
              <div key={day} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 gap-3">
                <span className="font-bold text-sm text-slate-800 w-28">{label}</span>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={h.closed}
                      onChange={(e) => handleHourChange(day, 'closed', e.target.checked)}
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span>Fermé</span>
                  </label>

                  {!h.closed && (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={h.startTime}
                        onChange={(e) => handleHourChange(day, 'startTime', e.target.value)}
                        className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                      />
                      <span className="text-xs text-slate-400">à</span>
                      <input
                        type="time"
                        value={h.endTime}
                        onChange={(e) => handleHourChange(day, 'endTime', e.target.value)}
                        className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold"
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={saveHours}
          className="mt-6 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all"
        >
          Enregistrer les horaires
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-teal-600" />
            <span>Fermetures exceptionnelles & Jours fériés</span>
          </h2>
          <button
            onClick={() => setShowTimeOffModal(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-teal-50 text-teal-700 hover:bg-teal-100 px-3 py-2 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter une fermeture</span>
          </button>
        </div>

        {timeOff.length === 0 ? (
          <p className="text-xs text-slate-400 py-4">Aucune période de fermeture programmée.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {timeOff.map((to) => (
              <div key={to.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-sm text-slate-800">{to.reason || 'Fermeture exceptionnelle'}</p>
                  <p className="text-xs text-slate-400">
                    Du {new Date(to.startsAt).toLocaleDateString('fr-FR')} au {new Date(to.endsAt).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <button
                  onClick={() => deleteTimeOff(to.id)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showTimeOffModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="font-bold text-slate-900 text-lg mb-4">Ajouter une période de fermeture</h3>
            <form onSubmit={addTimeOff} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Motif</label>
                <input
                  type="text"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="ex. Fête de l'Aïd, Travaux..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Début (Date & Heure)</label>
                <input
                  type="datetime-local"
                  required
                  value={startsAt}
                  onChange={(e) => setStartsAt(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Fin (Date & Heure)</label>
                <input
                  type="datetime-local"
                  required
                  value={endsAt}
                  onChange={(e) => setEndsAt(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowTimeOffModal(false)}
                  className="px-4 py-2 text-slate-500 font-bold text-sm"
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
