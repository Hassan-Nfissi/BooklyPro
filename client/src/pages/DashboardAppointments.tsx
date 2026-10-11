import React, { useEffect, useState } from 'react';
import api from '../api/client';
import { AppointmentItem } from '../types';
import { CalendarCheck, Check, X, Phone, Mail, Filter } from 'lucide-react';

export const DashboardAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const url = statusFilter === 'all' ? '/owner/appointments' : `/owner/appointments?status=${statusFilter}`;
      const res = await api.get(url);
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await api.patch(`/owner/appointments/${id}/status?status=${newStatus}`);
      fetchAppointments();
    } catch (err) {
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Gestion des Rendez-vous</h1>
          <p className="text-sm text-slate-500 mt-1">Consultez et mettez à jour le statut des réservations clients</p>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-bold py-2 px-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="CONFIRMED">Confirmés</option>
            <option value="COMPLETED">Honorés / Terminés</option>
            <option value="CANCELLED">Annulés</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400">Chargement des rendez-vous...</div>
      ) : appointments.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center">
          <CalendarCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-800 text-base">Aucun rendez-vous trouvé</h3>
          <p className="text-xs text-slate-400 mt-1">Les réservations passées sur votre page publique s'afficheront ici.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
          <div className="divide-y divide-slate-100">
            {appointments.map((app) => (
              <div key={app.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 text-teal-800 flex flex-col items-center justify-center flex-shrink-0 font-bold">
                    <span className="text-[10px] uppercase text-teal-600">
                      {new Date(app.startsAt).toLocaleDateString('fr-FR', { weekday: 'short' })}
                    </span>
                    <span className="text-base leading-none">
                      {new Date(app.startsAt).getDate()}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(app.startsAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-base">{app.customerName}</h3>
                      <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                        {app.bookingReference}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5">
                      <span className="font-semibold text-slate-700">{app.serviceName} ({app.durationMinutes} min)</span>
                      <span>•</span>
                      <span className="font-bold text-teal-700">{app.priceMad} MAD</span>
                      <span>•</span>
                      <span>Collaborateur : <strong className="text-slate-700">{app.staffName}</strong></span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                      {app.customerPhone && (
                        <div className="flex items-center gap-1 text-slate-600">
                          <Phone className="w-3.5 h-3.5 text-teal-600" />
                          <span>{app.customerPhone}</span>
                        </div>
                      )}
                      {app.customerEmail && (
                        <div className="flex items-center gap-1 text-slate-600">
                          <Mail className="w-3.5 h-3.5 text-teal-600" />
                          <span>{app.customerEmail}</span>
                        </div>
                      )}
                      {app.customerNote && (
                        <span className="italic text-slate-500">Note : "{app.customerNote}"</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <span
                    className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                      app.status === 'CONFIRMED'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : app.status === 'COMPLETED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {app.status === 'CONFIRMED' ? 'Confirmé' : app.status === 'COMPLETED' ? 'Terminé' : 'Annulé'}
                  </span>

                  {app.status === 'CONFIRMED' && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateStatus(app.id, 'COMPLETED')}
                        title="Marquer comme honoré"
                        className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => updateStatus(app.id, 'CANCELLED')}
                        title="Annuler le rendez-vous"
                        className="p-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
