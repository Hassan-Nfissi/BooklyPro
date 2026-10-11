import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import { DashboardSummary, AppointmentItem } from '../types';
import {
  CalendarCheck,
  Clock,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [todayAppointments, setTodayAppointments] = useState<AppointmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sumRes, appRes] = await Promise.all([
          api.get('/owner/dashboard/summary'),
          api.get('/owner/appointments')
        ]);
        setSummary(sumRes.data);
        setTodayAppointments(appRes.data.slice(0, 5));
      } catch (err) {
        console.error('Error fetching dashboard summary:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !summary) {
    return <div className="p-8 text-center text-slate-500">Chargement du tableau de bord...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Bonjour, {summary.businessName} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Voici l'activité de vos réservations et rendez-vous
          </p>
        </div>

        <a
          href={summary.publicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-teal-700 border border-teal-200 px-4 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:bg-teal-50 transition-colors"
        >
          <span>Page client (/book/{summary.slug})</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Aujourd'hui</span>
            <p className="text-2xl font-extrabold text-slate-900">{summary.todayAppointments}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Confirmés</span>
            <p className="text-2xl font-extrabold text-slate-900">{summary.confirmedCount}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Honorés / Terminés</span>
            <p className="text-2xl font-extrabold text-slate-900">{summary.completedCount}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Annulés</span>
            <p className="text-2xl font-extrabold text-slate-900">{summary.cancelledCount}</p>
          </div>
        </div>
      </div>

      {!summary.isPublished && (
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white p-6 rounded-3xl shadow-lg shadow-teal-500/20">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
            <h2 className="text-lg font-bold">Votre page de réservation n'est pas encore publiée</h2>
          </div>
          <p className="text-teal-50 text-sm max-w-xl">
            Vérifiez vos services, ajoutez votre équipe et publiez pour commencer à accepter des réservations en ligne dès aujourd'hui.
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              to="/dashboard/branding"
              className="bg-white text-teal-800 px-4 py-2 rounded-xl font-bold text-sm shadow hover:bg-slate-50 transition-all inline-flex items-center gap-1.5"
            >
              <span>Publier ma page</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <h2 className="text-lg font-bold text-slate-900">Derniers Rendez-vous</h2>
          <Link
            to="/dashboard/appointments"
            className="text-xs font-bold text-teal-600 hover:text-teal-700 inline-flex items-center gap-1"
          >
            <span>Voir tout le calendrier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {todayAppointments.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-sm">
            Aucun rendez-vous enregistré pour le moment.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {todayAppointments.map((app) => (
              <div key={app.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-bold text-slate-700 text-xs">
                    {new Date(app.startsAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{app.customerName}</h3>
                    <p className="text-xs text-slate-500">
                      {app.serviceName} • {app.priceMad} MAD • Avec {app.staffName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-mono font-medium">{app.bookingReference}</span>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      app.status === 'CONFIRMED'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : app.status === 'COMPLETED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {app.status === 'CONFIRMED' ? 'Confirmé' : app.status === 'COMPLETED' ? 'Terminé' : 'Annulé'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
